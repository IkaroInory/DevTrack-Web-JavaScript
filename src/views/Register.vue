<template>
    <div class="register-container">
        <div class="register-box">
            <div class="register-title">注册</div>

            <el-form
                ref="registerFormRef"
                label-position="right"
                :model="registerForm"
                :rules="rules"
                class="register-form"
                label-width="80px"
            >
                <el-form-item prop="userName" label="用户名">
                    <el-input v-model="registerForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="passWord" label="密码">
                    <el-input v-model="registerForm.password" type="password" show-password></el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword" label="确认密码">
                    <el-input v-model="registerForm.confirmPassword" type="password" show-password></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
                    <el-input v-model="registerForm.email"></el-input>
                </el-form-item>
                <el-form-item prop="verificationCode" label="验证码">
                    <el-input v-model="registerForm.verificationCode">
                        <template #append>
                            <el-button class="get-vcode-btn" type="primary" @click="getCode" v-show="show">获取验证码
                            </el-button>
                            <el-button v-show="!show" class="get-vcode-btn" type="primary">{{ count }}s</el-button>
                            <!--                            <span v-show="!show">{{ count }}s</span>-->
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="phone" label="电话">
                    <el-input v-model="registerForm.phone"></el-input>
                </el-form-item>

                <el-row justify="center">
                    <el-form-item class="btn-register" label-width="0">
                        <el-button type="primary" @click="submitRegister('registerFormRef')">注册</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import PortList from "@/api/PortList";

    export default {
        name: "register",
        data() {
            //校验用户名
            const checkUserName = (rule, value, callback) => {
                const regex = new RegExp("\\w{6,20}")
                if (!regex.test(value)) {
                    callback(new Error('用户名应由字母，数字和_组成，长度为6~20')) // /w{6,20}
                } else {
                    callback()
                }
            }
            //校验密码
            const checkPassword = (rule, value, callback) => {
                const regex = new RegExp("^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*,._])[0-9a-zA-Z!@#$%^&*,._]{8,16}$")
                if (!regex.test(value)) {
                    callback(new Error('密码应包含数字、字母、特殊符号，且长度为8~12'))
                } else {
                    callback()
                }
            }
            //校验确认密码
            const checkConfirmPassword = (rule, value, callback) => {
                if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致'))
                } else {
                    callback()
                }
            }
            return {
                //注册表单数据
                registerForm: {
                    username: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    phone: '',
                    verificationCode: '',
                    verificationCodeRecordUUID: ''        //验证码返回id
                },
                //注册表单校验规则
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {validator: checkUserName, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {validator: checkPassword, trigger: 'blur'}
                    ],
                    confirmPassword: [
                        {required: true, message: '请再次输入密码', trigger: 'blur'},
                        {validator: checkConfirmPassword, trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入电话', trigger: 'blur'},
                        {len: 11, message: '请输入合法的电话号码', trigger: 'blur'}
                    ],
                    verificationCode: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                },
                show: true,         //控制验证码获取按钮
                count: '',          //验证码获取倒计时
                timer: null,        //计时器
            }
        },
        methods: {
            //提交注册
            submitRegister() {
                const newJSONData = JSON.parse(JSON.stringify(this.$data.registerForm));
                delete newJSONData.confirmPassword;
                this.$refs.registerFormRef.validate((valid) => {
                    if (valid) {
                        axios
                            .get(PortList.url + PortList.accounts.url + PortList.accounts.signUp, {params: newJSONData})
                            .then((res) => {
                                if (res.data.statusCode === 100) {
                                    alert("注册成功")
                                    this.$router.push("/login")
                                } else if (res.data.statusCode === 201) {
                                    alert("用户已存在")
                                } else if (res.data.statusCode === 301) {
                                    alert("验证码错误")
                                } else if (res.data.statusCode === 302) {
                                    alert("验证码已超时")
                                } else if (res.data.statusCode === 303) {
                                    alert("没有验证码记录")
                                } else if (res.data.statusCode === 901) {
                                    alert("生成uuid时发生碰撞")
                                } else {
                                    alert("未知错误")
                                }
                            })
                    } else {
                        alert('请填写正确的表单数据')
                        console.log(valid)
                    }
                })
            },
            //发送验证码
            getCode() {
                //验证码发送倒计时
                if (!this.timer) {
                    this.count = 60
                    this.show = false
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= 60) {
                            this.count--
                        } else {
                            this.show = true
                            clearInterval(this.timer)
                            this.timer = null
                        }
                    }, 1000)
                }
                //发送验证码邮件
                axios
                    .get(PortList.url + PortList.email, {params: {email: this.$data.registerForm.email, tasktype: 1}})
                    .then((resp) => {
                        this.$data.registerForm.verificationCodeRecordUUID = resp.data.resultData
                    })
            }
        }
    }
</script>

<style scoped>
    .get-vcode-btn {
        background-color: var(--el-button-bg-color) !important;
        color: white !important;
    }

    .get-vcode-btn:hover {
        background-color: var(--el-button-hover-bg-color) !important;
    }

    .get-vcode-btn:active {
        background-color: var(--el-button-active-bg-color) !important;
    }

    .register-container {
        left: 0;
        top: 0;

        width: 100%;

        position: absolute;

        background-color: #2b4b6b;
        height: 100vh;
        top: 0;
        left: 0;
        width: 100%;
        position: absolute;
    }

    .register-box {
        width: 450px;
        height: 450px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 3px;
        background-color: #fff;
    }

    .register-title {
        margin: 20px 0;
        font-size: 25px;
    }

    .register-form {
        position: absolute;
        bottom: 5px;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
</style>

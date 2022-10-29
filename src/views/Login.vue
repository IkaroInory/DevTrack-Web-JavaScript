<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-title">登录</div>

            <!--登录表单-->
            <el-form class="login-form" ref="loginFormRef" :model="loginForm" :rules="rules" status-icon>
                <!--用户名及密码-->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" placeholder="密码" type="password" show-password></el-input>
                </el-form-item>

                <!--登录和注册按键-->
                <el-row justify="center">
                    <el-form-item class="btn-login">
                        <el-button type="primary" @click="submitForm('loginFormRef')">登录</el-button>
                    </el-form-item>
                </el-row>
                <el-row justify="end">
                    <el-form-item class="btn-register">
                        <el-link :underline="false" type="primary" @click="jumpRegister">注册</el-link>
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
        name: "Login",
        data() {
            //用户名校验
            const checkUserName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'))
                } else {
                    const regex = new RegExp("\\w{6,20}")
                    if (!regex.test(value)) {
                        callback(new Error('用户名应由字母，数字和_组成，长度为6~20')) // /w{6,20}
                    } else {
                        callback()
                    }
                }
            }
            //密码校验
            const checkPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'))
                } else {
                    const regex = new RegExp("^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*,._])[0-9a-zA-Z!@#$%^&*,._]{8,12}$")
                    if (!regex.test(value)) {
                        callback(new Error('密码应包含数字、字母、特殊符号，且长度为8~12'))
                    } else {
                        callback()
                    }
                }
            }
            return {
                //登录表单数据
                loginForm: {
                    userName: '',
                    password: ''
                },
                //登录表单校验规则
                rules: {
                    userName: [{validator: checkUserName, trigger: ['blur']}],
                    password: [{validator: checkPassword, trigger: ['blur']}]
                }
            }
        },
        methods: {
            //登录提交按钮
            submitForm() {
                this.$refs.loginFormRef.validate((valid) => {
                    if (valid) {
                        axios
                            .get(PortList.url + PortList.accounts.url + PortList.accounts.login, {params: this.$data.loginForm})
                            .then((res) => {
                                if (res.data.statusCode === 100) {
                                    alert('登录成功')
                                    this.$router.push('/')
                                    //存储用户数据到浏览器本地
                                    let p = res.data.resultData
                                    localStorage.setItem("account", JSON.stringify(p))
                                } else if (res.data.statusCode === 202) {
                                    alert('没有该用户')
                                } else if (res.data.statusCode === 203) {
                                    alert('密码不正确')
                                }
                            })
                    } else {
                        alert("请填写正确的表单数据")
                    }
                })

            },
            //注册跳转按钮
            jumpRegister() {
                this.$router.replace({name: 'register'});
            }
        }
    }
</script>

<style scoped>
    .login-container {
        left: 0;
        top: 0;
        width: 100%;
        position: absolute;
        background-color: #2b4b6b;
        height: 100vh;
    }

    .login-box {
        width: 450px;
        height: 285px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 3px;
    }

    .login-title {
        margin: 20px 0;
        font-size: 25px;
    }

    .login-form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
</style>

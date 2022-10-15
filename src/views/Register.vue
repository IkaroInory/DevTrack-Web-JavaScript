<template>
    <div class="register-container">
        <div class="register-box">
            <div class="register-title">注册</div>

            <el-form
                label-position="right"
                :model="registerForm"
                ref="registerFormRef"
                :rules="rules"
                class="register-form"
                label-width="70px"
            >
                <el-form-item prop="userName" label="用户名">
                    <el-input v-model="registerForm.userName"></el-input>
                </el-form-item>
                <el-form-item prop="passWord" label="密码">
                    <el-input v-model="registerForm.passWord" type="password"></el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword" label="确认密码">
                    <el-input v-model="registerForm.confirmPassword" type="password"></el-input>
                </el-form-item>

                <el-row justify="center">
                    <el-form-item class="btn-register" label-width="0">
                        <el-button type="primary" @click="submitRegister('registerForm')">注册</el-button>
                        <el-button type="primary" @click="submitRegister123">注册</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "register",
        data() {
            const checkUserName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'))
                } else {
                    if (isNaN(value)) {
                        callback(new Error('请输入正确的用户名，用户名由数字组成！'))
                    } else {
                        callback()
                    }
                }
            }
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
            const checkConfirmPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'))
                } else {
                    if (value !== this.registerForm.passWord) {
                        callback(new Error('两次输入密码不一致'))
                    } else {
                        callback()
                    }
                }
            }
            return {
                registerForm: {
                    userName: '',
                    passWord: '',
                    confirmPassword: ''
                },
                rules: {
                    userName: [
                        {validator: checkUserName, trigger: ['blur']}
                    ],
                    passWord: [
                        {validator: checkPassword, trigger: ['blur']}
                    ],
                    confirmPassword: [
                        {validator: checkConfirmPassword, trigger: ['blur']}
                    ]
                }
            }
        },
        methods: {
            submitRegister() {
                this.$router.push('123');
            },
            submitRegister123() {
                this.$router.push({name: "login"});
                // this.$router.replace('123');
            }
        }
    }
</script>

<style scoped>
    .register-container {
        left: 0;
        top: 0;

        width: 100%;

        position: absolute;

        background-color: #2b4b6b;
        height: 100vh;
    }

    .register-box {
        width: 450px;
        height: 285px;
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

<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-title">登录</div>

            <!--登录表单-->
            <el-form
                ref="loginFormRef"
                :model="loginForm"
                :rules="rules"
                class="login-form"
                status-icon
            >
                <!--用户名及密码-->
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" placeholder="密码" type="password"></el-input>
                </el-form-item>
                <!--登录和注册按键-->
                <el-row justify="center">
                    <el-form-item class="btn-login">
                        <el-button type="primary" @click="submitForm('loginFormRef')">登录</el-button>
                    </el-form-item>
                </el-row>
                <el-row justify="end">
                    <el-form-item class="btn-register">
                        <el-link type="primary" :underline="false" @click="jumpRegister">注册</el-link>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Login",
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
            return {
                loginForm: {
                    userName: '',
                    password: ''
                },
                rules: {
                    userName: [{validator: checkUserName, trigger: ['blur']}],
                    password: [{validator: checkPassword, trigger: ['blur']}]
                }
            }
        },
        methods: {
            submitForm() {
                axios.get('', {params: this.$data.loginForm}).then((res) => {
                    console.log('ok')
                })
            },
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

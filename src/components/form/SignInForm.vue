<template>
    <el-form :model="signInForm" :rules="signInFormRules" ref="signInFormRef" status-icon>
        <el-form-item prop="username">
            <el-input type="text" placeholder="用户名" v-model="signInForm.username"/>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="signInForm.password" show-password/>
        </el-form-item>

        <el-form-item>
            <el-button class="form-button" type="primary" @click="submitSignInForm" :loading="requestingService">登录</el-button>
        </el-form-item>

        <el-form-item style="justify-content: space-between">
            <router-link class="el-link el-link--primary" to="/forgetPassword">忘记密码</router-link>
            <router-link class="el-link el-link--primary" :to="{name: 'register'}">注册账号</router-link>
        </el-form-item>
    </el-form>
</template>

<script>
    import axios from "axios";
    import router from "@/router";
    import portList from "@/api/PortList";
    import statusCode from "@/api/StatusCode";
    import Environment from "@/api/Environment";

    export default {
        name: "SignInForm",
        mounted() {
            Environment.setTitle("登录");
        },
        data() {
            return {
                requestingService: false,
                rememberAccount: false,
                signInForm: {
                    username: "" || localStorage.getItem("signInFormUsername"),
                    password: ""
                },
                signInFormRules: {
                    username: [{required: true, message: "请输入用户名。", trigger: "blur"}],
                    password: [{required: true, message: "请输入密码。", trigger: "blur"}]
                }
            }
        },
        methods: {
            submitSignInForm() {
                this.$refs.signInFormRef.validate((valid) => {
                    if (valid) {
                        this.$data.requestingService = true;
                        axios.get(
                            portList.url + portList.accounts.url + portList.accounts.login,
                            {params: this.$data.signInForm, timeout: 3000}
                        ).then(res => {
                            if (res.data.statusCode === statusCode.success) {
                                this.$message({
                                    showClose: true,
                                    message: "欢迎 " + res.data.resultData.nickname + " ！",
                                    type: "success",
                                    duration: 3000
                                });
                                if (this.$data.rememberAccount === true)
                                    localStorage.setItem("signInFormUsername", this.$data.signInForm.username);
                                router.push('/');
                                sessionStorage.setItem("account", JSON.stringify(res.data.resultData));
                            }
                            if (res.data.statusCode === statusCode.userNotExists) {
                                this.$message({
                                    showClose: true,
                                    message: "用户不存在！",
                                    type: "error",
                                    duration: 3000
                                });
                            }
                            if (res.data.statusCode === statusCode.passwordError) {
                                this.$message({
                                    showClose: true,
                                    message: "密码错误！",
                                    type: "error",
                                    duration: 3000
                                });
                            }
                            this.$data.requestingService = false;
                        }).catch(error => {
                            this.$message({
                                showClose: true,
                                message: "请求超时！",
                                type: "error",
                                duration: 3000
                            });
                            this.$data.requestingService = false;
                        });
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .form-button {
        width: 100%;
    }
</style>

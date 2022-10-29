<template>
    <div>
        <el-card class="login-container">
            <h3>登录DevTrack</h3>

            <SignInForm/>
        </el-card>
    </div>
</template>

<script>
    import SignInForm from "@/components/form/SignInForm";

    export default {
        name: "SignIn",
        components: {SignInForm}
    }
</script>

<style scoped>
    .login-container {
        width: 400px;
        margin: 180px auto;
        padding: 20px 30px 0;
    }
</style>
<template>
    <div id="global-container"></div>
    <router-view/>
</template>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    a {
        text-decoration: none;
        color: #409eff;
    }

    #global-container {
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        position: absolute;
    }
    body {
        margin:0;      /*去除白边*/
    }
</style>

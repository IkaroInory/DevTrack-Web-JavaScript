<template>
    <el-container class="main-container">
        <!--        侧边栏菜单-->
        <el-aside class="main-aside-nav" width="75px">
            <!--            侧边栏顶部区域菜单-->
            <el-menu
                active-text-color="#409Eff"
                background-color="#545c64"
                class="aside-menu-top"
                default-active="router.path"
                text-color="#fff"
                :router="true"
            >
                <el-menu-item :index="item.pathname" v-for="item in menuList" :key="item.id">
                    <el-icon>
                        <component :is="item.iconList"></component>
                    </el-icon>
                    <span>{{item.name}}</span>
                </el-menu-item>
            </el-menu>
            <!--            侧边栏底部区域菜单-->
            <el-menu
                active-text-color="#409Eff"
                background-color="#545c64"
                class="aside-menu-bottom"
                text-color="#fff"
            >
                <el-menu-item index="1">
                    <el-popover :visible="visible" placement="top" :width="160">
                        <p>Are you sure to delete this?</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="small" text @click="visible = false">cancel</el-button>
                            <el-button size="small" type="primary" @click="visible = false"
                            >confirm</el-button
                            >
                        </div>
                        <template #reference>
                            <el-button @click="visible = true">Delete</el-button>
                        </template>
                    </el-popover>
                    <el-icon>
                        <Operation/>
                    </el-icon>
                </el-menu-item>
                <el-menu-item index="2">
                    <el-icon>
                        <QuestionFilled/>
                    </el-icon>
                </el-menu-item>
                <el-menu-item index="3">
                    <el-avatar
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    />
                </el-menu-item>
            </el-menu>
        </el-aside>
        <!--        主体-->
        <el-main class="main-box">
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                menuList: [
                    {name: "工作台", pathname: "/workbench", iconList: "Menu", id: 1},
                    {name: "项目", pathname: "/project", iconList: "Files", id: 2},
                    {name: "搜索", pathname: "/search", iconList: "Search", id: 4},
                    {name: "消息", pathname: "/message", iconList: "ChatLineRound", id: 5},
                ],
            }
        }
    }
</script>

<style scoped>
    .main-aside-nav {
        height: 100vh;
        background-color: #545c64;
    }

    .el-menu {
        border-right: none;
    }

    .el-menu-item {
        flex-direction: column;
        line-height: 2;
        justify-content: center;
    }

    .main-aside-nav {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .aside-menu-top {
        margin-top: 10px;
    }

    .aside-menu-bottom {
        margin-bottom: 10px;
    }

    .aside-menu-top .el-menu-item {
        height: 65px;
    }

    .aside-menu-bottom .el-menu-item {
        height: 50px;
    }
</style>
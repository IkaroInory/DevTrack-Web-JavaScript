import * as Icons from "@element-plus/icons-vue";

export default (app) => {
    for (let i in Icons) {
        app.component(i, Icons[i]);
    }
};

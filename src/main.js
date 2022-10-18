import {createApp} from "vue";
import App from "@/App";
import router from "@/router";
import store from "@/store";

import I18nInstance from "@/plugins/I18n";
import ElementPlusInstance from "@/plugins/ElementPlus";
import ElementPlusIconsInstance from "@/plugins/ElementPlusIcons"
import axios from "@/plugins/Axios";

const app = createApp(App);

I18nInstance(app);
ElementPlusInstance(app);
ElementPlusIconsInstance(app);

app.use(store);
app.use(router);
app.mount('#app');

app.config.globalProperties.$axios = axios;

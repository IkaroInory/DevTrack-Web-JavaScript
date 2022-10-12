import {createI18n} from "vue-i18n/dist/vue-i18n.cjs";

import zh_cn from "@/lang/zh_cn";

const langList = {zh_cn};
const i18n = createI18n({
    locale: 'zh_cn',
    message: langList
});

export default (app) => {
    app.use(i18n);
};

import ElementPlus from 'element-plus';

import 'element-plus/dist/index.css';

import zh_cn from 'element-plus/es/locale/lang/zh-cn';

export default (app) => {
    app.use(ElementPlus, {locale: zh_cn});
};

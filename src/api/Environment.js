/**
 * 环境API封装类
 *
 * @author Guanyu Hu <ikaroinory233@gmail.com>
 */
class Environment {
    /**
     * 应用名称
     * @type {string}
     */
    static #applicationName = "DevTrack";

    /**
     * 后缀名，用于设置页面标题
     * @type {string}
     */
    static #suffix = "DevTrack";

    /**
     * 设置地区，用于更改显示语言。
     * @param {Object} _this Vue对象
     * @param {string} locale 地区编号，如中国大陆为zh_cn
     * @return {boolean} 状态，true表示更改地区成功
     *
     * @author Guanyu Hu <ikaroinory233@gmail.com>
     */
    static setLocale(_this, locale) {
        if (!(locale in _this.$i18n.message))
            return false;

        _this.$i18n.locale = locale;
        return true;
    }

    /**
     * 设置网页标题。
     * @param {string?} prefix 标题前缀
     * @param {string?} suffix 标题后缀，默认为Environment.#suffix
     * @param {string?} separator 标题分隔符，默认为短横线(-)
     * @return {string}
     *
     * @author Guanyu Hu <ikaroinory233@gmail.com>
     */
    static setTitle(prefix, suffix, separator) {
        if (prefix)
            if (suffix)
                if (separator)
                    document.title = prefix + " " + separator + " " + suffix;
                else
                    document.title = prefix + " - " + suffix;
            else
                document.title = prefix + " - " + this.#suffix;
        else
            document.title = this.#applicationName;
    }
}

export default Environment;

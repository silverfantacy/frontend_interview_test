import {
    Form,
    Field,
    ErrorMessage,
    defineRule,
    configure,
} from 'vee-validate';

// 引入 Vee Validate 多國語系功能
import { localize, setLocale } from '@vee-validate/i18n';

// 引入 Vee Validate 繁體中文語系檔
import * as zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

// 定義繁體中文語系
const zhTWLocale = {
    messages: {
        ...zhTW.messages,
    },
};

// 加入 Vee Validate 繁體中文語系檔
// *將當前 Vee Validate 語系設定為繁體中文
configure({
    generateMessage: localize({ zh_TW: zhTWLocale }), // 載入繁體中文語系
    validateOnInput: true, // 指欄位輸入內容時，會立即進行驗證（即邊寫邊判斷）
});

// *設定預設語系
setLocale('zh_TW');

// 將 Vee Validate 的元件作為 Vue 的全域元件註冊
export default {
    install(Vue: any) {
        Vue.component('VForm', Form);
        Vue.component('VField', Field);
        Vue.component('ErrorMessage', ErrorMessage);
    },
};

import {
    Form,
    Field,
    ErrorMessage,
    defineRule,
    configure,
    // extend,
    // ValidationRule,
} from 'vee-validate';

// 引入 Vee Validate 全部驗證規則
import * as AllRules from '@vee-validate/rules';

// 引入 Vee Validate 多國語系功能
import { localize, setLocale } from '@vee-validate/i18n';

// 引入 Vee Validate 繁體中文語系檔
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

// 定義繁體中文語系
const zhTWLocale = {
    messages: {
        ...zhTW.messages,
    },
    names: {
        ...zhTW.names,
    },
    fields: {
        ...zhTW.fields,
    },
};

// Vee Validate 表單驗證語法開始
// 定義規則（加入全部規則）
Object.keys(AllRules).forEach((rule) => {
    if (rule !== 'default') {
        defineRule(rule, AllRules[rule]);
    }
});

// 定義密碼規則
defineRule('password', (value) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(value) ? true : '密碼 至少8碼且英數混合';
});

// 定義確認密碼規則
defineRule('confirmed', (value, [target], ctx) => {
    if (value === ctx?.form[target]) {
        return true;
    }
    return '與密碼不符';
});
// 加入 Vee Validate 繁體中文語系檔
// *將當前 Vee Validate 語系設定為繁體中文
configure({
    generateMessage: localize({ zh_TW: zhTWLocale }), // 載入繁體中文語系
    validateOnInput: true, // 指欄位輸入內容時，會立即進行驗證（即邊寫邊判斷）
});

// *設定預設語系
setLocale('zh_TW');
// Vee Validate 表單驗證語法結束

// 將 Vee Validate 的元件作為 Vue 的全域元件註冊
export default {
    install(Vue: any) {
        Vue.component('VForm', Form);
        Vue.component('VField', Field);
        Vue.component('ErrorMessage', ErrorMessage);
    },
};

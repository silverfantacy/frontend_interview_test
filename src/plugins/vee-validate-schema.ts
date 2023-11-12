import * as yup from 'yup';

const adSchema = yup.object({
  title: yup.string().required('廣告標題為必填'),
  status: yup.boolean().required('廣告狀態為必填'),
  url: yup.string().url('請輸入有效的URL'),
});

export { adSchema }
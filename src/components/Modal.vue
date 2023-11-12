<script setup lang="ts">
import { reactive, ref, inject, watch } from 'vue'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { genFileId, ElMessageBox } from 'element-plus'
import { Search, Plus } from '@element-plus/icons-vue'
import { useGlobalStore } from '../stores/index'
import { storeToRefs } from "pinia";
import * as yup from "yup";

const dialogVisible: any = inject('dialogVisible')

const formTitle = ref('')
const adForm = ref(null)
const formData = reactive({
  id: null,
  title: '',
  status: true,
  url: '',
  img: '',
})
const upload = ref<UploadInstance>()
const fileList = ref<UploadProps['fileList']>([])
const dialogImageUrl = ref('')

const schema = yup.object({
  title: yup.string().required('廣告標題為必填'),
  status: yup.boolean().required('廣告狀態為必填'),
  url: yup.string().url('請輸入有效的URL'),
});


const globalStore = useGlobalStore();
const { filters, adData, selectedAdData } = storeToRefs(globalStore);
const { setSelectedAdData: setSelectedAdData, clearSelectedAdData: clearSelectedAdData, createAdData: createAdData, updateAdData: updateAdData, getAds: getAds } = globalStore

// modal 開關
watch(dialogVisible, (newValue) => {
  if (newValue) {
    if (selectedAdData.value.id) {
      formTitle.value = '編輯'
      // Object.assign(formData, selectedAdData.value)
      setTimeout(() => {
        adForm.value?.setValues({
          title: selectedAdData.value.title,
          status: selectedAdData.value.status,
          url: selectedAdData.value.url
        })
      }, 500);

      if (selectedAdData.value.img) {
        fileList.value = [
          {
            name: selectedAdData.value.img,
            url: selectedAdData.value.img
          }
        ]
      }
    } else {
      formTitle.value = '新增'
    }
  } else {
    clearSelectedAdData()
    adForm.value.resetForm()
    upload.value?.clearFiles()
    Object.assign(formData, {
      id: null,
      title: '',
      status: true,
      url: '',
      img: '',
    })
  }
})

const previewDialogVisible = ref(false)

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

import { blobUrlToBase64 } from '../plugins/blobUrlToBase64.ts'
const handleFormSubmit = async (values: any, actions: any) => {
  let data = {
    id: null,
    title: values.title,
    status: values.status,
    url: values.url,
    img: values.img?.url
  }

  if (selectedAdData.value.id) {
    data.id = selectedAdData.value.id
    if (fileList.value[0]) {
      data.img = await blobUrlToBase64(fileList.value[0].url)
    }
    await updateAdData(selectedAdData.value.id, data)
  } else {
    await createAdData(data)
  }

  actions.resetForm()
  dialogVisible.value = false
}


</script>
<template>
  <el-dialog v-model="dialogVisible" :title="`${formTitle}資訊`" width="70%" center>
    <v-form as="el-form" label-position="top" require-asterisk-position="right" :inline="true" id="ad-form" ref="adForm"
      :validation-schema="schema" @submit="handleFormSubmit">

      <v-field name="title" v-slot="{ value, field, errorMessage }">
        <el-form-item :error="errorMessage" label="廣告標題" required>
          <el-input placeholder="請輸入廣告標題" v-bind="field" :validate-event="false" :model-value="value" />
        </el-form-item>
      </v-field>

      <v-field name="status" v-slot="{ value, field, errorMessage }">
        <el-form-item :error="errorMessage" label="廣告狀態" required>
          <el-select :model-value="value" placeholder="請選擇廣告狀態" v-bind="field" :validate-event="false">
            <el-option label="開啟" :value="true" />
            <el-option label="關閉" :value="false" />
          </el-select>
        </el-form-item>
      </v-field>

      <v-field name="url" v-slot="{ value, field, errorMessage }">
        <el-form-item :error="errorMessage" label="廣告連結" class="w-full">
          <el-input type="url" placeholder="請輸入廣告連結" v-bind="field" :validate-event="false" :model-value="value" />
        </el-form-item>
      </v-field>

      <v-field name="img" v-slot="{ value, field, errorMessage }">
        <el-form-item :error="errorMessage" label="廣告圖片">
          <el-upload ref="upload" v-model:file-list="fileList" action="#" list-type="picture-card" :auto-upload="false"
            :limit="1" v-bind="field" accept="image/*" :validate-event="false" :model-value="value"
            :on-exceed="handleExceed" :on-preview="handlePictureCardPreview">
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
          <el-dialog v-model="previewDialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
      </v-field>

      <div class="w-full dialog-footer flex">
        <el-button native-type="submit" type="success" class="ml-auto">
          儲存
        </el-button>
        <el-button @click="dialogVisible = false" type="info">取消</el-button>
      </div>
    </v-form>
  </el-dialog>
</template>
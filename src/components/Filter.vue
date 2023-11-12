<script setup lang="ts">
import { reactive, ref, provide } from 'vue'
import { useGlobalStore } from "../stores/index";
import { storeToRefs } from "pinia";
import { Search, Plus } from '@element-plus/icons-vue'
import Modal from "./Modal.vue";

const openState = ref(true)

const dialogVisible = ref(false)
provide('dialogVisible', dialogVisible)


const globalStore = useGlobalStore();
const { adData, filters } = storeToRefs(globalStore);

const handleFormSubmit = () => {
  // 看狀況要不要做搜尋
}
</script>
<template>
  <div id="filter">
    <el-card class="box-card" :body-class="openState ? '' : 'p-0'">
      <template #header>
        <div class="card-header flex justify-between items-center">
          <span class="text-white">查詢條件</span>
          <el-button @click="openState = !openState" class="button hover:!bg-primary focus  :!bg-primary" text>
            <i class="fa-solid fa-chevron-down text-white" :class="openState ? 'rotate-180' : ''"></i>
          </el-button>
        </div>
      </template>
      <div v-if="openState">
        <v-form as="el-form" id="filter-form" ref="form" v-slot="{ errors }" @submit="handleFormSubmit">

          <v-field name="title" v-slot="{ value, field, errorMessage }">
            <el-form-item :error="errorMessage" label="標題">
              <el-input placeholder="請輸入標題" v-bind="field" :validate-event="false" v-model="filters.title" />
            </el-form-item>
          </v-field>

          <div class="text-right">
            <el-button native-type="submit" type="primary" :icon="Search">查詢</el-button>
            <el-button @click="dialogVisible = true" type="success" :icon="Plus">
              新增
            </el-button>
          </div>
        </v-form>
      </div>
    </el-card>
  </div>

  <Modal />
</template>

<style>
#filter .el-card__header {
  background-color: #409EFF;
}

#filter .el-card__header b {
  background-color: #409EFF;
}
</style>
<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch, inject, provide } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useGlobalStore } from '../stores';
import { storeToRefs } from 'pinia';
import Modal from './Modal.vue';

interface Item {
  id: number
  title: string
  status: boolean
  url: string
  img: string
}
const globalStore = useGlobalStore();
const { adData, filters } = storeToRefs(globalStore);

const tableData = computed(() => {
  let data = adData.value.filter((item) => {
    if (item.title.indexOf(filters.value.title) !== -1) {
      return item
    }
  })

  return data
})

const showData = computed(() => {
  return tableData.value.slice((page.value - 1) * filters.value.limit, page.value * filters.value.limit)
})

const page = ref(1)

const dialogVisible = ref(false)
provide('dialogVisible', dialogVisible)

const { setSelectedAdData: setSelectedAdData, deleteAdData: deleteAdData } = globalStore

const handleEdit = (index: number, row: Item) => {
  setSelectedAdData({ ...row })
  dialogVisible.value = true
}
const handleDelete = (index: number, row: Item) => {
  deleteAdData(row.id)
}
</script>
<template>
  <div class="p-4 bg-white">
    <el-table :data="showData" class="w-full">
      <el-table-column prop="img" label="圖片" width="150">
        <template #default="scope">
          <el-image v-if="scope.row.img" :src="scope.row.img" fit="scale-down" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="標題" width="">
        <template #default="scope">
          <a :href="scope.row.url">{{ scope.row.title }}</a><br>
          <el-tag :type="scope.row.status ? 'success' : 'danger'">{{ scope.row.status ? '已啟用' : '未啟用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="功能" width="120">
        <template #default="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)" type="primary" :icon="Edit" circle />
          <el-button @click="handleDelete(scope.$index, scope.row)" type="danger" :icon="Delete" circle />
        </template>
      </el-table-column>
    </el-table>

    <div class="flex">
      <el-pagination v-model:current-page="page" :page-size="filters.limit" :hide-on-single-page="true"
        :total="tableData.length" layout="prev, pager, next" class="ml-auto" />
    </div>

    <Modal />
  </div>
</template>
<script setup lang="ts">
import Filter from "./components/Filter.vue";
import Table from "./components/Table.vue";
</script>

<template>
  <div class="common-layout bg-slate-100 min-h-screen">
    <el-container>
      <el-main>
        <el-row :gutter="10">
          <el-col :sm="24" :md="16" :lg="18" class="mx-auto">

            <Filter />

            <Table class="mt-10"/>

          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped></style>

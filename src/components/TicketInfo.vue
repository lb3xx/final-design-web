<template>
    <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column prop="code" label="序号" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
    </el-table>
</template>

<script setup>
import { ref} from 'vue'

const tableData = ref([])




</script>



<style></style>
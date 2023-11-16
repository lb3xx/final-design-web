<script setup>
import { ref } from 'vue'
import { uploadlist } from '@/api'
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = ref({
  name: '',
  starttime: '',
  endtime: '',
  playtime: '',
  tickets: [
    {
      price: 0,
      count: 0
    }
  ]
})

const submitTicket = async () => {
  let ticket = {}
  form.value.tickets.forEach((item, index) => {
    ticket[`price_${index + 1}`] = item.price
    ticket[`count_${index + 1}`] = item.count
  })
  const { data: res } = await uploadlist({
    performance: {
      name: form.value.name,
      starttime: form.value.starttime,
      endtime: form.value.endtime,
      playtime: form.value.playtime
    },
    ticketInfo: ticket
  })
  console.log('上传票务', res)
  dialogFormVisible.value = false
}

const addTicketType = () => {
  form.value.tickets.push({
    price: 0,
    count: 0
  })
}
</script>

<template>
  <h1>主办方模块</h1>
  <div class="header">
    <h2>上传演出信息：</h2>
    <el-button type="primary" @click="dialogFormVisible = true">新增票务信息</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>

  <el-pagination background layout="prev, pager, next" :total="1000" />

  <el-dialog v-model="dialogFormVisible" title="票务信息">
    <el-form :model="form">
      <el-form-item label="演唱会名字" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="开始购票时间" :label-width="formLabelWidth">
        <el-date-picker v-model="form.starttime" type="datetime" placeholder="请选择开始购票时间" size="default" />
      </el-form-item>
      <el-form-item label="结束购票时间" :label-width="formLabelWidth">
        <el-date-picker v-model="form.endtime" type="datetime" placeholder="请选择结束购票时间" size="default" />
      </el-form-item>
      <el-form-item label="演出开始时间" :label-width="formLabelWidth">
        <el-date-picker v-model="form.playtime" type="datetime" placeholder="请选择演出开始时间" size="default" />
      </el-form-item>
      <el-form-item :label="`票务类型${index + 1}`" :label-width="formLabelWidth" v-for="(item, index) in form.tickets" :key="index"> 价格：<el-input-number v-model="item.price" :min="1" /> 数量：<el-input-number v-model="item.count" :min="1" /> </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addTicketType">新增票务类型</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitTicket">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  .el-button {
    margin-left: 10px;
  }
}
.el-input-number {
  margin: 0 10px;
}
.el-pagination {
  margin-top: 15px;
}
</style>

<template>
  <h1>主办方模块</h1>
  <div class="header">
    <h2>演出信息：</h2>
    <el-button type="primary" @click="dialogFormVisible = true">新增演出</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%" stripe>
    <el-table-column prop="code" label="序号" />
    <el-table-column prop="name" label="演出名称" />
    <el-table-column prop="starttime" label="开票时间" />
    <el-table-column prop="endtime" label="结束购票时间" />
    <el-table-column prop="playtime" label="演出时间" />
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button size="mini" @click="editItemPerformance(row)" type="warning">编辑演出信息</el-button>
        <br> <br>
        <el-button size="mini" @click="editItemTicket(row); dialogEditTicketVisible = true;"
          type="warning">编辑票价信息</el-button>
        <br> <br>
        <el-button size="mini" @click="deletPerformance(row)" type="danger">取消演出</el-button>
      </template>
    </el-table-column>

  </el-table>

  <!--  <el-pagination background layout="prev, pager, next" :total="1000" />-->

  <!-- 新上传 -->
  <el-dialog v-model="dialogFormVisible" title="票务信息">
    <el-form :model="form" :rules="formRules">
      <el-form-item label="演唱会名字" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" style="width: 300px" />
      </el-form-item>
      <el-form-item label="开始购票时间" :label-width="formLabelWidth" prop="starttime">
        <el-date-picker v-model="form.starttime" type="datetime" placeholder="请选择开始购票时间" size="default" />
      </el-form-item>
      <el-form-item label="结束购票时间" :label-width="formLabelWidth" prop="endtime">
        <el-date-picker v-model="form.endtime" type="datetime" placeholder="请选择结束购票时间" size="default" />
      </el-form-item>
      <el-form-item label="演出开始时间" :label-width="formLabelWidth" prop="playtime">
        <el-date-picker v-model="form.playtime" type="datetime" placeholder="请选择演出开始时间" size="default" />
      </el-form-item>
      <el-form-item :label="`票务类型${index + 1}`" :label-width="formLabelWidth" v-for="(item, index) in form.tickets"
        :key="index">
        价格：<el-input-number v-model="item.price" :min="1" />
        数量：<el-input-number v-model="item.count" :min="1" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="subTicketType">减少票价类型</el-button>
        <el-button @click="addTicketType">新增票价类型</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitTicket">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 更新演出信息 -->
  <el-dialog v-model="dialogEditPerformanceVisible" title="编辑演出信息">
    <el-form :model="EditPerformance" :rules="formRules">
      <el-form-item label="演唱会名字" :label-width="formLabelWidth" prop="name">
        <el-input v-model="EditPerformance.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="开始购票时间" :label-width="formLabelWidth" prop="starttime">
        <el-date-picker v-model="EditPerformance.starttime" type="datetime" placeholder="请选择开始购票时间" size="default" />
      </el-form-item>
      <el-form-item label="结束购票时间" :label-width="formLabelWidth" prop="endtime">
        <el-date-picker v-model="EditPerformance.endtime" type="datetime" placeholder="请选择结束购票时间" size="default" />
      </el-form-item>
      <el-form-item label="演出开始时间" :label-width="formLabelWidth" prop="playtime">
        <el-date-picker v-model="EditPerformance.playtime" type="datetime" placeholder="请选择演出开始时间" size="default" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogEditPerformanceVisible = false">取消</el-button>
        <el-button type="primary" @click="updatePerformance">修改</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- <更新票价信息> -->
  <el-dialog v-model="dialogEditTicketVisible" title="编辑票价信息">
    <el-form v-model="EditTicket">
      <el-form-item label="票务类型1" :label-width="formLabelWidth" v-if="ticket.price_1 !== 0">
        价格：<el-input-number v-model="ticket.price_1" :min="1" />
        数量：<el-input-number v-model="ticket.count_1" :min="1" />
      </el-form-item>
      <el-form-item label="票务类型2" :label-width="formLabelWidth" v-if="ticket.price_2 !== 0">
        价格：<el-input-number v-model="ticket.price_1" :min="1" />
        数量：<el-input-number v-model="ticket.count_1" :min="1" />
      </el-form-item>
      <el-form-item label="票务类型3" :label-width="formLabelWidth" v-if="ticket.price_3 !== 0">
        价格：<el-input-number v-model="ticket.price_1" :min="1" />
        数量：<el-input-number v-model="ticket.count_1" :min="1" />
      </el-form-item>
      <el-form-item label="票务类型4" :label-width="formLabelWidth" v-if="ticket.price_4 !== 0">
        价格：<el-input-number v-model="ticket.price_1" :min="1" />
        数量：<el-input-number v-model="ticket.count_1" :min="1" />
      </el-form-item>
      <el-form-item label="票务类型5" :label-width="formLabelWidth" v-if="ticket.price_5 !== 0">
        价格：<el-input-number v-model="ticket.price_1" :min="1" />
        数量：<el-input-number v-model="ticket.count_1" :min="1" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="subTicket">减少票价类型</el-button>
        <el-button @click="addTicket">新增票价类型</el-button>
        <el-button @click="dialogEditTicketVisible = false">取消</el-button>
        <el-button type="primary" @click="updateTicket">修改</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 删除 -->
  <el-dialog v-model="dialogDeleteVisible" class="dialogDelete" title="请确保您已知悉正在进行的操作！">
    <template #footer>
      <span class="dialog-footer">

        <el-button @click="dialogDeleteVisible = false">取消</el-button>
        <el-button type="danger" @click="confirmDeletPerformance">确认取消！</el-button>
      </span>
    </template>
  </el-dialog>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue'
import { uploadlist, showlist, updatePerformanceList, deletePer, showTicket } from '@/api'
import { getTimeStamp } from '@/utils/method'

import { ElMessage } from "element-plus";

const tableData = ref([])
const dialogFormVisible = ref(false)
const dialogEditPerformanceVisible = ref(false)
const dialogDeleteVisible = ref(false)
const dialogEditTicketVisible = ref(false)
const EditPerformance = ref({});
const formLabelWidth = '140px'

let ticketTypeCount = ref(0)
let codeToDelete = ref(null)
let ticket = ref({

})

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

const EditTicket = ref({
  tickets: [

  ]
})

const resetForm = () => {
  form.value = {
    name: '',
    starttime: '',
    endtime: '',
    playtime: '',
    tickets: [{ price: 0, count: 0 }],
  };
};



const submitTicket = async () => {
  let ticket = {}
  form.value.tickets.forEach((item, index) => {
    ticket[`price_${index + 1}`] = item.price
    ticket[`count_${index + 1}`] = item.count
  })

  const { data: res } = await uploadlist({
    performance: {
      name: form.value.name,
      starttime: getTimeStamp(form.value.starttime),
      endtime: getTimeStamp(form.value.endtime),
      playtime: getTimeStamp(form.value.playtime)
    },
    ticketInfo: ticket
  })
  if (res.code === 1) {
    ElMessage({
      message: '上传成功!',
      type: 'success'
    })
    getList()
  }
  // resetForm();
  dialogFormVisible.value = false
}

const updatePerformance = async () => {

  // 验证表单数据
  // await EditPerformanceFormRef.validate();

  // 准备提交给后端的数据
  const updatedPerformance = {
    code: EditPerformance.value.code,
    name: EditPerformance.value.name,
    starttime: getTimeStamp(EditPerformance.value.starttime),
    endtime: getTimeStamp(EditPerformance.value.endtime),
    playtime: getTimeStamp(EditPerformance.value.playtime)
    // 其他需要更新的字段
  };

  // 调用后端接口更新演出信息
  const { data: res } = await updatePerformanceList(updatedPerformance); // 假设id是从row中获取的

  if (res.code === 1) {
    ElMessage({
      message: '更新成功!',
      type: 'success',
    });
    dialogEditPerformanceVisible.value = false; // 关闭编辑对话框
    getList(); // 刷新列表
  }

}

const addTicketType = () => {
  if (form.value.tickets.length < 5) {
    form.value.tickets.push({
      price: 0,
      count: 0
    });
  } else {
    ElMessage({
      message: '最多可设置5种票价',
      type: 'warning',
    })
  }

}

const addTicket = () => {
  if (EditTicket.value.tickets.length < 5) {
    EditTicket.value.tickets.push({
      price: 0,
      count: 0
    });
  } else {
    ElMessage({
      message: '最多可设置5种票价',
      type: 'warning',
    })
  }

}

const subTicketType = () => {
  if (form.value.tickets.length > 1) {
    form.value.tickets.pop();
  } else {
    ElMessage({
      message: '最少需设置1种票价',
      type: 'warning',
    })
  }
}

const subTicket = () => {
  if (EditTicket.value.tickets.length > ticketTypeCount.value) {
    EditTicket.value.tickets.pop();
  } else {
    ElMessage({
      message: '最少需设置' + ticketTypeCount.value + '种票价',
      type: 'warning',
    })
  }
}

const getList = async () => {
  const { data: res } = await showlist()
  if (res.code === 1) {
    tableData.value = res.object
  }
}

const formRules = {
  name: [
    { required: true, message: '演唱会名字不能为空', trigger: 'blur' },
  ],
  starttime: [
    { required: true, message: '开始购票时间不能为空', trigger: 'change' },
  ],
  endtime: [
    { required: true, message: '结束购票时间不能为空', trigger: 'change' },
  ],
  playtime: [
    { required: true, message: '演出开始时间不能为空', trigger: 'change' },
  ],
};

const editItemPerformance = async (row) => {
  EditPerformance.value = { ...row }; // 将当前行数据赋值给编辑表单模型
  dialogEditPerformanceVisible.value = true; // 显示编辑对话框
  console.log(EditPerformance.value.starttime.length);

};

const deletPerformance = async (row) => {

  dialogDeleteVisible.value = true;
  codeToDelete.value = row.code;

}


const confirmDeletPerformance = async () => {
  const { data: res } = await deletePer({ code: codeToDelete.value })
  if (res.code === 1) {
    ElMessage({
      message: '已完成删除！',
      type: 'warning',
    })
  }
  getList();
  dialogDeleteVisible.value = false;
}

const editItemTicket = async (row) => {
  const { data: res } = await showTicket({ code: row.code })
  if (res.code === 1) {
    console.log(res);
    ticket.value = res.object
    let num = 0
    for (const key in res.object) {
      if (key.indexOf('price') !== -1) {
        if(res.object[key]!==0){

          num++
        }
      }
    }
    ticketTypeCount.value = num
  }
}




onMounted(() => {
  getList()
})

watch(dialogFormVisible, (newVal) => {
  if (newVal === false) {
    resetForm();
  }
});
</script>


<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;

  .el-button {
    margin-left: 10px;
  }
}

.el-input-number {
  margin: 0 10px;
  // height: 30px;
}

/*.el-input-number__increase,
.el-input-number__decrease {
  height: 30px;
  /* 将高度设置为您希望的值，此处示例为 24px */
// line-height: 30px;
/* 保持按钮内文字与按钮高度一致，避免垂直居中问题 */
//}

.el-pagination {
  margin-top: 15px;
}

// .dialogDelete .el-dialog__title {
//   color: red !important;
// }</style>

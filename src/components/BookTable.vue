<template>
  <h1>购票模块</h1>
  <div>
    当前时间：{{ currentTime }}
  </div>
  <div>搜索：
    <el-input placeholder="请输入关键字" class="keywordInput" v-model="keywordData">
      <template #append>
        <el-button :icon="Search" @click="serachKeyword" />
      </template>
    </el-input>
  </div>
  <el-table :data="tableData" style="width: 100%" stripe>
    <el-table-column prop="code" label="序号" />
    <el-table-column prop="name" label="演出名称" />
    <el-table-column prop="starttime" label="购票开始时间" />
    <el-table-column prop="endtime" label="购票结束时间" />
    <el-table-column prop="playtime" label="演出时间" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" @click="showDetail(scope.row)"
          :disabled="currentTime < scope.row.starttime">查看详情</el-button>
      </template>
    </el-table-column>
  </el-table>


  <el-dialog v-model="dialogVisible" title="请选择票价类型">
    <div class="ticketBox" v-if="ticketDetail.price_1 != 0">
      <span class="ticketPrice">票价：{{ ticketDetail.price_1
        }}</span>剩余量：<!--el-button size="small" type="primary" @click="bookOne(ticketDetail.price_1,1)">-->{{
          ticketDetail.count_1 }}<!--</el-button>-->
      <el-radio :label="1" v-model="selectedTicketIndex" @change="updateSelectedPrice"></el-radio>
    </div>
    <div class="ticketBox" v-if="ticketDetail.price_2 != 0">
      <span class="ticketPrice">票价：{{ ticketDetail.price_2
        }}</span>剩余量：<!--<el-button size="small" type="primary" @click="bookOne(ticketDetail.price_2,2)">-->{{
          ticketDetail.count_2 }}<!--</el-button>-->
      <el-radio :label="2" v-model="selectedTicketIndex" @change="updateSelectedPrice"></el-radio>
    </div>
    <div class="ticketBox" v-if="ticketDetail.price_3 != 0">
      <span class="ticketPrice">票价：{{ ticketDetail.price_3
        }}</span>剩余量：<!--<el-button size="small" type="primary" @click="bookOne(ticketDetail.price_3,3)">-->{{
          ticketDetail.count_3 }}<!--</el-button>-->
      <el-radio :label="3" v-model="selectedTicketIndex" @change="updateSelectedPrice"></el-radio>
    </div>
    <div class="ticketBox" v-if="ticketDetail.price_4 != 0">
      <span class="ticketPrice">票价：{{ ticketDetail.price_4
        }}</span>剩余量：<!--<el-button size="small" type="primary" @click="bookOne(ticketDetail.price_4,4)">-->{{
          ticketDetail.count_4 }}<!--</el-button>-->
      <el-radio :label="4" v-model="selectedTicketIndex" @change="updateSelectedPrice"></el-radio>
    </div>
    <div class="ticketBox" v-if="ticketDetail.price_5 != 0">
      <span class="ticketPrice">票价：{{ ticketDetail.price_5
        }}</span>剩余量：<!--<el-button size="small" type="primary" @click="bookOne(ticketDetail.price_5,5)">-->{{
          ticketDetail.count_5 }}<!--</el-button>-->
      <el-radio :label="5" v-model="selectedTicketIndex" @change="updateSelectedPrice"></el-radio>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitBooking">预定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { showlist, showTicket, book, search } from '@/api'
import { ElMessage } from "element-plus";

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const tableData = ref([])
const dialogVisible = ref(false)
const selectedTicketIndex = ref(null)
const selectedTicketPrice = ref(null)
const keywordData = ref('')

let currentTime = ref('');

const getList = async () => {
  const { data: res } = await showlist()
  if (res.code === 1) {
    tableData.value = res.object
  }
}

const ticketDetail = ref({})
const showDetail = async (row) => {
  const { data: res } = await showTicket({ code: row.code })
  if (res.code === 1) {
    ticketDetail.value = res.object
    dialogVisible.value = true
  }
}

const updateSelectedPrice = () => {
  selectedTicketPrice.value = ticketDetail.value[`price_${selectedTicketIndex.value}`];
}

const submitBooking = async () => {
  if (selectedTicketIndex.value !== null && selectedTicketPrice.value !== null) {
    await bookOne(selectedTicketPrice.value, selectedTicketIndex.value);
    dialogVisible.value = false;
  } else {
    alert('请先选择票价类型');
  }
}

const bookOne = async (ticketPrice, type) => {
  const { data: res } = await book({
    code: Number(ticketDetail.value.code),
    idNumber: userInfo.value.idNumber,
    ticketPrice,
    type
  })
  if (res.code === 1) {
    dialogVisible.value = false
    ElMessage({
      message: '购票成功!',
      type: 'success'
    })
  } else {
    ElMessage({
      message: '购买失败!重复购票！',
      type: 'error'
    })
  }
}

function formatDate(date) {
  const padZero = (num) => num.toString().padStart(2, '0');
  return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;
}

const serachKeyword = async () => {

  const { data: res } = await search({
    keyword: keywordData.value,
    type: "null",
  })
  if (res.code === 1) {
    tableData.value = res.object
    console.log(keywordData.value)
  }
}


onMounted(() => {
  getList()

  const updateTime = () => {
    currentTime.value = formatDate(new Date());
  };

  // 开始计时
  updateTime();
  setInterval(updateTime, 1000);

})
</script>

<style scoped lang="scss">
.ticketBox {
  font-size: 18px;
  margin-bottom: 15px;
}

.ticketPrice {
  margin-right: 25px;

  .el-button {
    font-size: 18px;
  }
}

.keywordInput {
  width: 200px;
  /* 示例：设定输入框宽度 */
  margin-left: 10px;
  /* 如果需要调整与前文的距离 */
}
</style>

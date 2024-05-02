<template>
  <h1>检票模块</h1>
  <!-- <el-input-number v-model="num" :min="1" :max="10" @change="handleChange" /> -->
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="code" label="code" />
    <el-table-column prop="name" label="name" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" @click="showCheckDetail(scope.row)">检票</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogVisible" title="正在进行检票" :before-close="clearCheckBox">
    <el-input v-model="idInput" :disabled="isInputDisabled" placeholder="请输入身份证信息" />
    <br /><br />
    <video ref="videoElement" autoplay></video>
    <template #footer>

      <span class="dialog-footer">
        <el-button @click="clearCheckBox;dialogVisible=false">取消</el-button>
        <el-button type="info" @click="resetCheck">重新检票</el-button><!--要把输入框、按钮、计数器重置-->
        <el-button type="primary" @click="checkTicket">检查票据</el-button>
        <el-button type="primary" :disabled="faceButtonDisable" @click="startCamAndSendFrames(10)">人脸识别</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { showCheckList, check } from "@/api";
import { ElMessage } from "element-plus";

const stream = ref(null);
const tableData = ref([])
const dialogVisible = ref(false)
const idInput = ref('')
const curCheckCode = ref('')
const faceButtonDisable = ref(true)
const sendFrameInterval = ref(null)
const videoElement = ref(null) // 移动到顶层，避免重复声明
const isInputDisabled = ref(false);
const backendResponse = reactive({ code: null });
let lastSentValue = ''
let cameraTimeoutId;


const showCheckDetail = (row) => {
  curCheckCode.value = row.code
  dialogVisible.value = true
}

const onInputChange = (event) => {
  console.log(event.target);
  idInput.value = event.target.value;
  if (lastSentValue && inputValue.value !== lastSentValue) {
    faceButtonDisable.value = true;
  }
};

const checkTicket = async () => {
  const { data: res } = await check({
    code: curCheckCode.value,
    idNumber: idInput.value
  })
  if (res.code === 1) {
    ElMessage({
      message: '请继续完成人脸识别!',
      type: 'success'
    })
    lastSentValue = idInput.value;
    faceButtonDisable.value = false;
    isInputDisabled.value = true;
    //修改逻辑
    //clearCheckBox()
    //getList()//好像没有必要get一次

  } else {
    ElMessage({
      message: '检票失败!未找到该场次对应票！',
      type: 'error'
    })
  }
}

const clearCheckBox = () => {
  idInput.value = ''
}

const getList = async () => {
  const { data: res } = await showCheckList()
  if (res.code === 1) {
    tableData.value = res.object
  }
}

const resetCheck = () => {
  clearCheckBox();
  clearCameraTimeout();
  faceButtonDisable.value = true;
  isInputDisabled.value = false;
  clearInterval(sendFrameInterval);
  stopCamera();

}

async function startCamera() {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
    stream.value = mediaStream;
    videoElement.value.srcObject = mediaStream; // 确保videoElement已经准备好了
  } catch (error) {
    console.error('无法获取摄像头：', error);
  }
}

function stopCamera() {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop());
    stream.value = null;
  }
}

async function sendFrame() {
  if (!videoElement.value || !stream.value) return;

  const canvas = document.createElement('canvas');
  canvas.width = videoElement.value.videoWidth;
  canvas.height = videoElement.value.videoHeight;
  const context = canvas.getContext('2d');
  context.drawImage(videoElement.value, 0, 0, canvas.width, canvas.height);

  canvas.toBlob(async (blob) => {
    const formData = new FormData();
    formData.append('imageFile', blob, 'image.jpg');
    formData.append('idNumber', idInput.value);
    formData.append('code', curCheckCode.value);

    try {
      const response = await fetch('/api/facerec', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json(); // 更改为json()以获取后端的结构化数据
      backendResponse.code = data.code; // 假设后端响应包含一个code字段
      console.log(data);

      if (backendResponse.code === 1) { // 根据code值做决策
        clearInterval(sendFrameInterval); // 停止周期性调用
        stopCamera();
        ElMessage({
          message: '人脸识别成功！请迅速通过闸机!',
          type: 'success'
        })
        clearCheckBox();
        clearCameraTimeout();
        faceButtonDisable.value = true;
        isInputDisabled.value = false;
        // router.push('/main'); // 跳转至其他页面
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, 'image/jpeg');
}


function clearCameraTimeout() {
  clearTimeout(cameraTimeoutId);
}

async function startCamAndSendFrames(timeoutDuration) {
  clearInterval(sendFrameInterval);
  stopCamera();
  await startCamera();
  cameraTimeoutId = setTimeout(() => {
    clearInterval(sendFrameInterval);
    stopCamera();
    ElMessage({
      message: '人脸识别超时，请重新尝试!',
      type: 'warning'
    });
  }, timeoutDuration * 1000);

  sendFrameInterval.value = setInterval(sendFrame, 1000);
}





onMounted(() => {
  getList();
  videoElement.value = document.querySelector('#video-element');
})
</script>

<style scoped lang="scss"></style>

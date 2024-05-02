<template>
  <div class="el-header">
    <br /><br />
    <h1>人脸数据采集</h1>
  </div>
  <div class="el-body">
    <br /><br />
    <video ref="videoElement" autoplay></video>
  </div>
  <div class="el-footer">
    <br /><br />
    <br /><br />
    <br /><br />
    <el-button round @click="startCamAndSendFrames">开始采集</el-button>
    <!-- <button @click="sendFrame">采集</button>
    <button @click="stopCamera">停止摄像头</button> -->
  </div>


</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from "@/store/user";
import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted, ref, toRefs, reactive} from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const { idNumber } = toRefs(userStore.userInfo);

const stream = ref(null);
const videoElement = ref(null); // 移动到顶层，避免重复声明
const isSendingFrames = ref(false); // 控制周期性发送
const backendResponse = reactive({ code: null }); // 存储后端响应

let sendFrameInterval = ref(null);


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
    formData.append('idNumber', idNumber.value);

    try {
      const response = await fetch('/api/facecol', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json(); // 更改为json()以获取后端的结构化数据
      backendResponse.code = data.code; // 假设后端响应包含一个code字段
      console.log(data);

      if (backendResponse.code === 1) { // 根据code值做决策
        clearInterval(sendFrameInterval); // 停止周期性调用
        stopCamera();
        router.push('/main'); // 跳转至其他页面
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, 'image/jpeg');
}


async function startCamAndSendFrames() {
  startCamera().then(() => {
    sendFrameInterval = setInterval(sendFrame, 1000); // 每秒调用一次sendFrame
  });
}

async function showFaceCapturePrompt() {
  // 使用ElMessageBox显示对话框
  const confirmResult = await ElMessageBox.confirm(
    '即将进行人脸采集，请确保正对摄像头并保持光线充足。',
    '人脸采集提示',
    {
      confirmButtonText: '开始采集',
      cancelButtonText: '不是现在',
      type: 'info',
    }
  );

  if (confirmResult === 'confirm') {
    startCamAndSendFrames();
  } else if (confirmResult === 'cancel') {
    // 用户点击“取消”后的逻辑，如果需要
    ElMessage('用户取消了人脸采集.');
  }
}

onMounted(() => {
  // 初始化videoElement的DOM引用
  showFaceCapturePrompt();
});
</script>



<!-- <script>
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const userStore = useUserStore()
    const { userInfo } = storeToRefs(userStore)
  },
  data() {
    return {
      stream: null,
    };
  },
  // mounted() {
  //   this.startCamera();
  //   const intervalId = setInterval(() => {
  //     this.sendFrame();
  //   }, 1000);//1秒一次
  //
  //   // 如果需要在组件销毁时清除定时器，防止内存泄漏，可在beforeDestroy或destroyed钩子中添加如下代码：
  //   this.$once('hook:beforeDestroy', () => {
  //     clearInterval(intervalId);
  //     console.log('Periodic task timer cleared.');
  //   });
  // },
  // destroyed() {
  //   this.$once('hook:beforeDestroy', () => {
  //     clearInterval(intervalId);
  //     console.log('Periodic task timer cleared.');
  //   });
  // },
  methods: {
    startCamera() {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          this.stream = stream;
          this.$refs.videoElement.srcObject = stream;
        })
        .catch((error) => {
          console.error('无法获取摄像头：', error);
        });
    },
    stopCamera() {
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
        this.stream = null;
      }
    },
    sendFrame() {
      const videoElement = this.$refs.videoElement;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append('imageFile', blob, 'image.jpg');
        formData.append('idNumber',userInfo.value.idNumber);

        fetch('/api/facecol', {
          method: 'POST',
          body: formData
        })
          .then((response) => response.text())
          .then((data) => {
            console.log(data); // 处理后端的响应
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }, 'image/jpeg');
    },
  },
};
</script> -->
<style scoped>
.el-header {
  text-align: center;
}

.el-body {
  text-align: center;
}

.el-footer {
  text-align: center;
}
</style>
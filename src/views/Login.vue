<template>
  <div class="login-page">
    <el-dialog v-model="dialogVisible" :title="curType == '1' ? '用户登录' : '用户注册'" width="30%" :show-close="false"
      :before-close="() => { }" class="formdialog">
      <el-input v-if="curType == '1'" v-model="user.account" size="large" placeholder="请输入账号" />
      <el-input v-if="curType == '1'" v-model="user.pwd" size="large" type="password" placeholder="请输入密码"
        show-password />
      <el-input v-if="curType == '2'" v-model="regist.idNumber" size="large" placeholder="请输入身份证号码" />
      <el-input v-if="curType == '2'" v-model="regist.username" size="large" placeholder="请输入用户名" />
      <el-input v-if="curType == '2'" v-model="regist.phoneNumber" size="large" placeholder="请输入电话号码" />
      <el-input v-if="curType == '2'" v-model="regist.password" size="large" type="password" placeholder="请输入密码"
        show-password />
      <template #footer>
        <span class="dialog-footer">
          <el-button v-if="curType == '1'" @click="curType = '2'">注册</el-button>
          <el-button v-if="curType == '1'" type="primary" @click="handleLogin">登录</el-button>
          <el-button v-if="curType == '2'" @click="curType = '1'">已有账号</el-button>
          <el-button v-if="curType == '2'" type="primary" @click="handleRegister">注册</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from "@/store/user";
import { storeToRefs } from 'pinia'
import { login, register } from '@/api'
const router = useRouter()
const dialogVisible = ref(false)
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

// 操作类型，1登陆，2注册
const curType = ref('1')

const user = ref({
  account: '',
  pwd: ''
})

const regist = ref({
  username: '',
  idNumber: '',
  phoneNumber: '',
  password: '',
})
const registerUser = async () => {
  const { data: res } = await register(regist.value)
  if (res.code == 1) {
    ElMessage({
      message: '注册成功!请登录系统',
      type: 'success'
    })

  } else {
    ElMessage({
      message: '注册失败，此用户已存在，请直接登陆！',
      type: 'warning'
    })
  }
  curType.value = '1'

}
const loginUser = async () => {
  const { data: res } = await login({
    phoneNumber: user.value.account,
    password: user.value.pwd
  })
  if (res.code == 1) {
    localStorage.setItem('token', res.object.token)
    ElMessage({
      message: '登录成功!',
      type: 'success'
    })
    userStore.setUser(res.object)
    userInfo.value = res.object
    console.log(userStore.userInfo)
    dialogVisible.value = false

    if (res.object.facecollect != "1") {
      router.push('/face')
    } else {
      router.push('/main')//路由
    }
  } else {
    ElMessage.error('账号或者密码错误!')
  }
}

const throttle = (fn, time = 500) => {
  let timer = null
  return function () {
    if (timer) {
      return
    }
    fn()
    timer = setTimeout(() => {
      timer = null
    }, time)
  }
}
const handleRegister = throttle(registerUser, 2000)
const handleLogin = throttle(loginUser, 2000)

onMounted(() => {
  dialogVisible.value = true
})
</script>

<style lang="scss" scoped>
.el-input {
  margin-bottom: 20px;
}

.login-page {
  height: 100vh;
  background: url('@/assets/background.png') no-repeat center / cover;
  // background-color:
}

// .formdialog .el-dialog__header {
//   text-align: center;
// }
</style>

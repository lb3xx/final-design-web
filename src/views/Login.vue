<template>
  <div>
    <el-dialog v-model="dialogVisible" title="用户登录" width="30%" :show-close="false" :before-close="() => {}">
      <el-input v-model="user.account" size="large" placeholder="请输入账号" />
      <el-input v-model="user.pwd" size="large" type="password" placeholder="请输入密码" show-password />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleRegister">注册</el-button>
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
const dialogVisible = ref(false)
const user = ref({
  account: '',
  pwd: ''
})
const register = () => {
  ElMessage({
    message: `账号 : admin  密码 : 123456`,
    type: 'warning'
  })
}
const login = () => {
  if (user.value.account === 'admin' && user.value.pwd === '123456') {
    ElMessage({
      message: '登录成功!',
      type: 'success'
    })
    dialogVisible.value = false
    router.push('/main')
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
const handleRegister = throttle(register, 2000)
const handleLogin = throttle(login, 2000)

onMounted(() => {
  dialogVisible.value = true
})
</script>

<style lang="scss" scoped>
.el-input {
  margin-bottom: 20px;
}
</style>

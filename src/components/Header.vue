<template>
  <div class="header">
    <h1>欢迎来到基于springboot的购票核销强实名认证系统</h1>
    <h2>欢迎您，<el-popover placement="top-start" trigger="hover">
        <template #reference>
          <el-button class="m-2" type="success">{{ userInfo.username }}</el-button>
        </template>
        <div>
          <!-- <el-button @click="dialogUserInfoVisable = true">修改密码</el-button> -->
          <!-- <br><br> -->
          <el-button type="danger" @click="logout">退出系统</el-button>
        </div>
      </el-popover></h2>
  </div>

  <el-dialog v-model="dialogUserInfoVisable">

  </el-dialog>

</template>

<script setup>
import router from "@/router";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus"
import { ref } from "vue";


const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const dialogUserInfoVisable = ref(false);


const logout = async () => {
  await router.push("/");
  userStore.setUser(null);
  userInfo.value = null;
  localStorage.removeItem('token');
  ElMessage({
    message: '已退出！',
    type: 'success',
  })
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 30px;
  width: 100%;
  height: 100px;
  background-color: skyblue;
}
</style>

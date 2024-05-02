<template>
  <div class="left">
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2" text-color="#fff" @open="handleOpen" @close="handleClose">
      <el-menu-item index="master" @click="router.push({ path: '/main/master' })" v-if="userType == 2">
        <el-icon><icon-menu /></el-icon>
        <span>演出信息</span>
      </el-menu-item>
      <el-menu-item index="book" @click="router.push({ path: '/main/book' })" v-if="userType == 1">
        <el-icon><icon-menu /></el-icon>
        <span>购票</span>
      </el-menu-item>
      <el-menu-item index="check" @click="router.push({ path: '/main/check' })" v-if="userType == 2">
        <el-icon><document /></el-icon>
        <span>检票</span>
      </el-menu-item>
      <el-menu-item index="userinfo" @click="router.push({ path: '/main/userinfo' })" v-if="userType == 1">
        <el-icon><icon-menu /></el-icon>
        <span>个人信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from "@/store/user";
import { toRefs } from 'vue';

const userStore = useUserStore();
const { type } = toRefs(userStore.userInfo);
const router = useRouter()

const userType = type.value;
const handleOpen = () => {}
</script>

<style lang="scss" scoped>
.left {
  height: 100%;
  background-color: #545c64;
}
</style>

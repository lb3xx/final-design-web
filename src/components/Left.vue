<template>
  <div class="left">
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2" text-color="#fff" @open="handleOpen" @close="handleClose">
      <el-menu-item index="master" @click="router.push({ path: '/main/master' })">
        <el-icon><icon-menu /></el-icon>
        <span>主办方</span>
      </el-menu-item>
      <el-menu-item index="book" @click="router.push({ path: '/main/book' })">
        <el-icon><icon-menu /></el-icon>
        <span>购票</span>
      </el-menu-item>
      <el-menu-item index="check" @click="router.push({ path: '/main/check' })">
        <el-icon><document /></el-icon>
        <span>检票</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const handleOpen = () => {}
</script>

<style lang="scss" scoped>
.left {
  height: 100%;
  background-color: #545c64;
}
</style>

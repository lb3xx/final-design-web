<template>
  <div class="left">
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2" text-color="#fff" @open="handleOpen" @close="handleClose">
      <el-menu-item index="1">
        <el-icon><icon-menu /></el-icon>
        <span>主办方</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>购票</span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><document /></el-icon>
        <span>检票</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
const handleOpen = () => {
  console.log('open')
}
</script>

<style lang="scss" scoped>
.left {
  height: 100%;
  background-color: #545c64;
}
</style>

<template>
  <Header></Header>
  <div class="container">
    <Left></Left>
    <Right></Right>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Header from '@/components/Header.vue'
import Left from '@/components/Left.vue'
import Right from '@/components/Right.vue'



onMounted(async () => {

})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  height: calc(100% - 100px);
}
</style>

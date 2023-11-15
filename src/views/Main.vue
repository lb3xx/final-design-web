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
import { login, register, uploadlist, showlist, showTicket, book } from '@/api'

onMounted(async () => {
  const res1 = login()
  const res2 = register({
    password: '12345',
    phoneNumber: '13111112222',
    idNumber: '340826198809199876'
  })
  const res3 = uploadlist()
  const res4 = showlist()
  const res5 = showTicket()
  console.log(res1)
  console.log(res2)
  console.log(res3)
  console.log(res4)
  console.log(res5)
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  height: calc(100% - 100px);
}
</style>

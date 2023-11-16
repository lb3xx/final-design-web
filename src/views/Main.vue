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
import { login, register, uploadlist, showlist, showTicket, book ,showCheckList,check} from '@/api'



onMounted(async () => {
  // 登陆
  // const {data: res} = await login({
  //   phoneNumber:'13111112222',
  //   password: '12345'
  // })
  // if(res.code == 1){
  //   localStorage.setItem('token',res.object.token)
  // }

  //   注册
  // const res2 = register({
  //   username:'test4',
  //   password: '12345',
  //   phoneNumber: '13111112222',
  //   idNumber: '340826198809199876'
  // })

  //上传演出信息
  // const res3 = uploadlist({
  //   performance:{
  //     name:'1115test',
  //     starttime:'2023-11-16 08:30:00',
  //     endtime:'2023-11-16 09:30:00',
  //     playtime:'2023-11-16 10:30:00'
  //   },
  //
  //   ticketInfo:{
  //     price_1:50,
  //     count_1:100,
  //     price_2:70,
  //     count_2:200
  //   }
  // })

  //查看当前演出信息
  // const res4 = showlist()

  // 查看某特定演出的票价信息，要带token
  // const res5 = showTicket({
  //   code:6
  // })

  //购票
  // const res6 = book({
  //   code:6,
  //   ticketPrice:50,
  //   ticketType:1,
  //   idNumber:340826198809199876
  // })

  //选择需要进行检票的场次，消息模型中有数组对象
  // const res7 = showCheckList()

  //检票，code来自res7中后端回的演出代码code，idNumber前端输入
  // const res8 = check({
  //   code:6,
  //   idNumber:'340826198809199900'
  // })
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  height: calc(100% - 100px);
}
</style>

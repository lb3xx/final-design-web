import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    // 定义数据(state)
    const userInfo = ref({})

    const setUser = (newUserInfo) => {
        userInfo.value = newUserInfo
    }
    // 以对象形式return
    return {
        userInfo,
        setUser
    }
})

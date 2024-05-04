<template>
    <h1>个人信息</h1>
    <el-container>
        <el-main>
            <span>
                姓名：{{ name }}
            </span>
            <br> <br>
            <span>
                电话：{{ phone }}<el-button class="phoneButton" @click="dialogPhoneVisible = true"> 修改电话号码</el-button>
            </span>
            <br><br>
            <span>
                密码：<el-button @click="dialogPasswordVisible = true">修改密码</el-button>
            </span>
        </el-main>
        <el-footer>
            <el-button type="danger" @click="dialogAccountVisible = true">我要销户！</el-button>
        </el-footer>
    </el-container>


    <el-dialog v-model="dialogPhoneVisible" title="修改电话号码">
        身份证号码：<el-input placeholder="请输入身份证信息以供验证"></el-input>
        电话号码：<el-input placeholder="请输入变更后的电话号码"></el-input>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogPhoneVisible = false">取消</el-button>
                <el-button type="primary">提交</el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogPasswordVisible" title="修改密码">
        旧密码：<el-input placeholder="请输入旧密码"></el-input>
        新密码：<el-input placeholder="请输入新密码"></el-input>
        确认密码：<el-input placeholder="请再一次输入新密码"></el-input>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogPasswordVisible = false">取消</el-button>
                <el-button type="primary">提交</el-button>
            </span>
        </template>
    </el-dialog>

    
    <el-dialog v-model="dialogAccountVisible" title="请确保知悉你正在进行的操作！">
    身份证号码：<el-input placeholder="请输入身份证信息以供验证"></el-input>
    <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogAccountVisible = false">取消</el-button>
                <el-button type="danger">确认销户</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
let dialogPhoneVisible = ref(false);
let dialogPasswordVisible = ref(false);
let dialogAccountVisible = ref(false);
let name = userInfo.value.username;
let phone = userInfo.value.phoneNumber;

// const delUser = async()=>{
//     const {data:res} = await 
// }

onMounted(async () => {
    console.log("=======================")
    console.log(userInfo.value.username);


})

watchEffect(() => {
    console.log("userInfo.value changed:", userInfo.value);
});
</script>

<style>
.phoneButton {
    margin-left: 10px;
}
</style>
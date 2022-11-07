<template>
  <span>666</span>
  <el-button type="primary" @click="getUserCount">点击</el-button>
  <el-input v-model="num"></el-input>
</template>

<script lang="ts" setup>
import axios from "axios";
import {ApiList, BASEURL} from "@/common";
import {ElMessage} from "element-plus";
import {ref} from "vue";
const num = ref();
function getUserCount() {
  axios.post(BASEURL + ApiList.userCountUrl)
      .then((result: ResponseBody) => {
        console.log(result.data.data);
        num.value = result.data.data;
      })
      .catch(() => {
        ElMessage.error("找不到服务捏~");
      })
}
</script>

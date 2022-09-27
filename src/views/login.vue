<template>
  <div id="main">
    <el-container>
      <el-main>

        <el-row justify="center">
          <el-card style="width: 400px;">
            <el-row justify="center">
              <el-space direction="vertical">
                <span>账号</span><el-input v-model="name"></el-input>
                <span>密码</span><el-input v-model="password"></el-input>
              </el-space>
            </el-row>

            <el-row justify="center">
              <el-button @click="login()">
                登录
              </el-button>
            </el-row>

          </el-card>
        </el-row>



      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import axios from "axios";
import {BASEURL,ApiList} from "@/common";
import {ElMessage} from "element-plus";
import qs from "qs";

const name = ref<string>("");
const password = ref<string>("");


function login() {
  const loginInfo =JSON.stringify({'name':name.value,'password':password.value});
  console.log(loginInfo);
  axios.post(BASEURL+ApiList.LoginUrl,qs.stringify(loginInfo))
      .then((result: ResponseBody) => {
        console.log(result);
        if(result.code == 1) {
          ElMessage.success(result.message);
        } else {
          ElMessage.error(result.message);
        }

      })
      .catch(() => {
        ElMessage.error("找不到服务捏~");
      })

}
</script>

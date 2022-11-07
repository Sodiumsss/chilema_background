<template>
  <div id="main">
    <el-container>
      <el-main>

        <el-row justify="center">
          <el-card style="width: 400px;">
            <el-row justify="center">
              <el-space direction="vertical">
                <span>账号</span><el-input v-model="name"></el-input>
                <span>密码</span><el-input v-model="password" type="password"></el-input>
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
import router from "@/router";

const name = ref<string>("");
const password = ref<string>("");


function login() {
  const loginInfo =JSON.stringify({'username':name.value,'password':password.value});
  axios.post(BASEURL+ApiList.LoginUrl,qs.stringify({'loginInfo':loginInfo}))
      .then((result: ResponseBody) => {
        //console.log(result);
        if(result.data.code == 1) {
          ElMessage.success(result.data.message);
          router.push("/count");
        } else {
          ElMessage.error(result.data.message);
        }

      })
      .catch(() => {
        ElMessage.error("找不到服务捏~");
      })

}
</script>

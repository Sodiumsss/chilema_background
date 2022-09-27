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
              <el-button>
                登录
              </el-button></el-row>

          </el-card>
        </el-row>



      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import {ref} from "vue";

const name = ref<string>("");
const password = ref<string>("");

</script>

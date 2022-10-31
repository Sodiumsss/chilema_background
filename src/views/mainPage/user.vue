<template>
  <el-button type="danger">批量删除</el-button>
  <el-button type="primary">新增用户</el-button>
  <el-input class="search-area" v-model="search" placeholder="输入用户名进行搜索" />
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column prop="username" label="用户名" width="180" />
    <el-table-column prop="password" label="密码" width="180" />
    <el-table-column prop="schoolId" label="学号" width="180" />
    <el-table-column prop="birthYear" label="生日" width="180" />
    <el-table-column prop="nickname" label="昵称" width="180" />
    <el-table-column label="修改" align="center">
            <template #default="scope">
                <el-button type="primary" @click="handleEdit(scope.row.id, scope.row)">编辑</el-button>
                <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref, computed } from 'vue';
import {BASEURL,ApiList} from "@/common";
import {ElMessage} from "element-plus";
interface user {
  username: string,
  password: string,
  schoolId: number,
  birthYear: number,
  nickname: string,
}

const search = ref();
const user_data = ref<user[]>([]);
axios.post(BASEURL+ApiList.UserListUrl)
      .then((result: ResponseBody) => {
          user_data.value = result.data.data;
          console.log(user_data);
      })
      .catch(() => {
        ElMessage.error("找不到服务捏~");
      })
const filterTableData = computed(() =>
    user_data.value.filter(
        (data) =>
            !search.value ||
            data.username.toLowerCase().includes(search.value.toLowerCase())
    )
)
</script>

<style scoped>
.search-area{
  width: 14rem;
  margin-left: 1rem;
}
</style>
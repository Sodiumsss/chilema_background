<template>
  <el-button type="danger" @click="mul_deleteUserDialogVisible=true">批量删除</el-button>
  <!-- <el-button type="primary" @click="addUserDialogVisible = true">新增用户</el-button> -->
  <el-input class="search-area" v-model="search" placeholder="输入用户名进行搜索" />
  <el-table :data="filterTableData" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column prop="username" label="用户名" width="180" />
    <el-table-column prop="password" label="密码" width="180" />
    <el-table-column prop="schoolId" label="学号" width="180" />
    <el-table-column prop="sex" label="性别" width="180">
      <template #default="scope">
        <span v-if="scope.row.sex == 1">男</span>
        <span v-else>女</span>
      </template>
    </el-table-column>
    <el-table-column prop="birthYear" label="生日" width="180" />
    <el-table-column prop="nickname" label="昵称" width="180" />
    <el-table-column prop="credit" label="积分" width="180" />
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button type="primary" @click="handleEdit(scope.row.id, scope.row)">编辑</el-button>
        <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 编辑用户对话框 -->
  <el-dialog v-model="editUserDialogVisible" title="修改用户信息" width="40%" align-center>
    <el-form :model="editForm" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="editForm.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="editForm.password" />
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="editForm.schoolId" />
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="editForm.sex" />
      </el-form-item>
      <el-form-item label="生日">
        <el-input v-model="editForm.birthYear" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="editForm.nickname" />
      </el-form-item>
      <el-form-item label="积分">
        <el-input v-model="editForm.credit" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editUserDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editUserInfo">提交</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 删除对话框 -->
  <el-dialog v-model="deleteUserDialogVisible" title="删除用户" width="25%" align-center>
    确认要删除吗？？？
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteUserDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="deleteUserInfo">确认删除</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 批量删除对话框 -->
  <el-dialog v-model="mul_deleteUserDialogVisible" title="删除用户" width="25%" align-center>
    确认要删除吗？？？
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="mul_deleteUserDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="mulDelete">确认删除</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref, computed, reactive } from 'vue';
import { BASEURL, ApiList } from "@/common";
import { ElMessage } from "element-plus";

interface user {
  id: number,
  username: string,
  password: string,
  schoolId: number,
  birthYear: number,
  nickname: string,
  credit: number,
  sex: number,
  hollow: boolean,
}

const editForm = reactive({
  username: '',
  password: '',
  schoolId: '',
  birthYear: '',
  nickname: '',
  credit: 0,
  sex: 0,
  hollow: false,
})



const search = ref();
const user_data = ref<user[]>([]);


function getUserList() {
axios.post(BASEURL + ApiList.UserListUrl)
  .then((result: ResponseBody) => {
    user_data.value = result.data.data;
    console.log(result.data.data);
  })
  .catch(() => {
    ElMessage.error("找不到服务捏~");
  })
  
}
getUserList();

const filterTableData = computed(() =>
  user_data.value.filter(
    (data) =>
      !search.value ||
      data.username.toLowerCase().includes(search.value.toLowerCase())
  )
)
// 编辑用户
const editUserDialogVisible = ref(false);
const edit_id = ref(-1);
function handleEdit(id, item) {
  edit_id.value = id;
  editForm.username = item.username;
  editForm.password = item.password;
  editForm.schoolId = item.schoolId;
  editForm.birthYear = item.birthYear;
  editForm.nickname = item.nickname;
  editForm.credit = item.credit;
  editForm.hollow = item.hollow;
  editForm.sex = item.sex;
  editUserDialogVisible.value = true;
}
function editUserInfo() {
  const userInfo = JSON.stringify({
    'id': edit_id.value,
    'username': editForm.username,
    'password': editForm.password,
    'schoolId': editForm.schoolId,
    'birthYear': editForm.birthYear,
    'nickname': editForm.nickname,
    'credit': editForm.credit,
    'sex': editForm.sex,
    'hollow': editForm.hollow,
    
  })
  axios.post(BASEURL + ApiList.updateUserUrl, userInfo,{headers:{'Content-Type': 'application/json'}})
    .then((result: ResponseBody) => {
      if (result.data.code == 1) {
        ElMessage.success(result.data.message);
        editUserDialogVisible.value = false;
        getUserList();
      } else {
        ElMessage.error(result.data.message);
      }
    })
    .catch(() => {
      ElMessage.error("找不到服务捏~");
    })
 
}


//删除用户
const deleteUserDialogVisible = ref(false);
const delete_id = ref(-1);
function handleDelete(id) {
  delete_id.value = id;
  console.log(delete_id);
  deleteUserDialogVisible.value = true;
}

function deleteUserInfo() {
  axios.post(BASEURL + ApiList.deleteUserUrl, delete_id.value,{headers:{'Content-Type': 'application/json'}})
  .then((result: ResponseBody) => {
      if (result.data.code == 1) {
        ElMessage.success(result.data.message);
        deleteUserDialogVisible.value = false;
        getUserList();
      } else {
        ElMessage.error(result.data.message);
      }
    })
    .catch(() => {
      ElMessage.error("找不到服务捏~");
    })
}

const mul_deleteUserDialogVisible = ref(false);
const mul_list = ref([]);
function mulDelete() {
  for(let item of mul_list.value) {
    delete_id.value = item.id;
    deleteUserInfo();
  }
  mul_deleteUserDialogVisible.value = false;
}

function handleSelectionChange(val) {
  mul_list.value = val;
}

</script>

<style scoped>
.search-area {
  width: 14rem;
  margin-left: 1rem;
}
</style>
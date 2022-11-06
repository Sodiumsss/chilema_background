<template>
  <el-button type="danger" @click="mul_deleteFoodDialogVisible=true">批量删除</el-button>
  <el-button type="primary" @click="addFoodDialogVisible=true">新增菜品</el-button>
  <el-input class="search-area" v-model="search" placeholder="输入菜品名进行搜索" />
  <el-table :data="filterTableData" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column prop="name" label="菜品名" width="120" />
    <el-table-column label="图片" width="180" align="center">
      <template #default="scope">
        <el-upload class="avatar-uploader" :action="uploadImgById(scope.row.id)" :on-success="uploadSuccessTB" :show-file-list="false" :before-upload="beforeImgUpload">
        <img v-if="scope.row.pic" :src="BASEURL+(scope.row.pic)" style="width: 100px;" />
        <el-icon v-else  class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </template>
    </el-table-column>
    <el-table-column prop="description" label="描述" width="200" />
    <el-table-column prop="supplyTime" label="供应时间" width="180" />
    <el-table-column prop="acid" label="酸度" width="80" align="center"/>
    <el-table-column prop="sweet" label="甜度" width="80" align="center"/>
    <el-table-column prop="spicy" label="辣度" width="80" align="center"/>
    <el-table-column prop="pepper" label="麻度" width="80" align="center"/>
    <el-table-column prop="oil" label="油量" width="80" align="center"/>
    <el-table-column prop="salt" label="咸度" width="80" align="center"/>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button type="primary" @click="handleEdit(scope.row.id, scope.row)">编辑</el-button>
        <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 添加对话框 -->
  <el-dialog v-model="addFoodDialogVisible" title="新增菜品" width="50%" align-center>
    <el-form :model="addForm" label-width="120px">
      <el-form-item label="菜品名">
        <el-input v-model="addForm.name" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="addForm.description" />
      </el-form-item>
      <el-form-item label="供应时间">
        <el-input v-model="addForm.supplyTime" />
      </el-form-item>
      <el-form-item label="酸度">
        <el-input v-model="addForm.acid" style="width: 80px;" />
      </el-form-item>
      <el-form-item label="甜度">
        <el-input v-model="addForm.sweet" style="width: 80px;" />
      </el-form-item>
      <el-form-item label="辣度">
        <el-input v-model="addForm.spicy" style="width: 80px;" />
      </el-form-item>
      <el-form-item label="麻度">
        <el-input v-model="addForm.pepper" style="width: 80px;" />
      </el-form-item>
      <el-form-item label="油量">
        <el-input v-model="addForm.oil" style="width: 80px;" />
      </el-form-item>
      <el-form-item label="咸度">
        <el-input v-model="addForm.salt" style="width: 80px;" />
      </el-form-item>
      <el-form-item>
        <el-upload :action="uploadImg" :on-success="uploadSuccess" :show-file-list="false" :before-upload="beforeImgUpload">
          <el-button type="primary">上传图片
            <el-icon class="el-icon--right">
              <Upload />
            </el-icon>
          </el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addFoodDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addFoodInfo">添加</el-button>
      </span>
    </template>
  </el-dialog>
<!--  删除对话框-->
  <el-dialog v-model="deleteFoodDialogVisible" title="删除用户" width="25%" align-center>
    确认要删除吗？？？
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteFoodDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="deleteFoodInfo">确认删除</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="mul_deleteFoodDialogVisible" title="删除用户" width="25%" align-center>
    确认要删除吗？？？
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="mul_deleteFoodDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="mulDelete">确认删除</el-button>
      </span>
    </template>
  </el-dialog>
<!--  编辑对话框-->
  <el-dialog v-model="editFoodDialogVisible" title="修改菜品" width="50%" align-center>
    <el-form :model="editForm" label-width="120px">
      <el-form-item label="菜品名">
        <el-input v-model="editForm.name" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="editForm.description" />
      </el-form-item>
      <el-form-item label="供应时间">
        <el-input v-model="editForm.supplyTime" />
      </el-form-item>
      <el-form-item label="酸度">
        <el-input v-model="editForm.acid" style="width: 80px;" />
      </el-form-item>
      <el-form-item label="甜度">
        <el-input v-model="editForm.sweet" style="width: 80px;" />
      </el-form-item>
      <el-form-item label="辣度">
        <el-input v-model="editForm.spicy" style="width: 80px;" />
      </el-form-item>
      <el-form-item label="麻度">
        <el-input v-model="editForm.pepper" style="width: 80px;" />
      </el-form-item>
      <el-form-item label="油量">
        <el-input v-model="editForm.oil" style="width: 80px;" />
      </el-form-item>
      <el-form-item label="咸度">
        <el-input v-model="editForm.salt" style="width: 80px;" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editFoodDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editFoodInfo">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref, computed, reactive } from 'vue';
import { BASEURL, ApiList } from "@/common";
import { ElMessage } from "element-plus";
import { Upload,Plus } from '@element-plus/icons-vue'

interface food {
  id: number,
  name: string,
  acid: number,
  sweet: number,
  spicy: number,
  pepper: number,
  oil: number,
  salt: number,
  supplyTime: string,
  pic: string,
  description: string,
}
const addFoodDialogVisible = ref(false);
const search = ref();
const food_data = ref<food[]>([]);
const imgUrl = ref();
const addForm = reactive({
  name: '',
  acid: 0,
  sweet: 0,
  spicy: 0,
  pepper: 0,
  oil: 0,
  salt: 0,
  supplyTime: '',
  pic: '',
  description: '',
})

const editForm = reactive({
  name: '',
  acid: 0,
  sweet: 0,
  spicy: 0,
  pepper: 0,
  oil: 0,
  salt: 0,
  supplyTime: '',
  pic: '',
  description: '',
})

const options = Array.from({ length: 5 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))

function getFoodList() {
  axios.post(BASEURL + ApiList.FoodListUrl)
      .then((result: ResponseBody) => {
        food_data.value = result.data.data;
      })
      .catch(() => {
        ElMessage.error("找不到服务捏~");
      })
}
getFoodList();
const filterTableData = computed(() =>
    food_data.value.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
//添加菜品
function addFoodInfo() {
  const foodInfo = JSON.stringify({
    'name': addForm.name,
    'acid': addForm.acid,
    'sweet': addForm.sweet,
    'spicy': addForm.spicy,
    'pepper': addForm.pepper,
    'oil': addForm.oil,
    'salt': addForm.salt,
    'supplyTime': addForm.supplyTime,
    'pic': imgUrl.value,
    'description': addForm.description,
  })
  axios.post(BASEURL + ApiList.addFoodUrl, foodInfo,{headers:{'Content-Type': 'application/json'}})
      .then((result: ResponseBody) => {
        if (result.data.code == 1) {
          ElMessage.success(result.data.message);
          addFoodDialogVisible.value = false;
          addForm.acid=0;
          addForm.sweet=0;
          addForm.oil=0;
          addForm.pepper=0;
          addForm.salt=0;
          addForm.spicy=0;
          addForm.name='';
          addForm.description='';
          addForm.supplyTime='';
          addForm.pic='';
          getFoodList();
        } else {
          ElMessage.error(result.data.message);
        }
      })
      .catch(() => {
        ElMessage.error("找不到服务捏~");
      })
}
//上传图片
const uploadTypes = ref(["jpg", "jpeg", "png", "gif"]);

function beforeImgUpload(file) {
  const ltCode = 2;
  const isLt2M = file.size / 1024 / 1024 < ltCode;
  const isExistFileType = uploadTypes.value.includes(file.type.replace(/image\//, ""))
  if(!isExistFileType) {
    ElMessage.error(`图片只支持 ${uploadTypes.value.join("、")} 格式!`);
  }
  if (!isLt2M) {
    ElMessage.error(`上传头像图片大小不能超过 ${ltCode}MB!`);
  }
  return isLt2M && isExistFileType;
}
const uploadSuccess = (res: any)=>{
  imgUrl.value = res.message;
}
const uploadImg =computed(()=>{
  return `${BASEURL}${ApiList.uploadFoodImgUrl}`;
})
function uploadImgById(id) {
  return `${BASEURL}${ApiList.uploadImgByIdUrl}?id=${id}`;
}
const uploadSuccessTB = (res: any)=>{
  imgUrl.value = res.message;
  getFoodList();
}
//删除菜品
const deleteFoodDialogVisible = ref(false);
const delete_id = ref(-1);
function handleDelete(id) {
  delete_id.value = id;
  console.log(delete_id);
  deleteFoodDialogVisible.value = true;
}

function deleteFoodInfo() {
  axios.post(BASEURL + ApiList.deleteFoodUrl, delete_id.value,{headers:{'Content-Type': 'application/json'}})
      .then((result: ResponseBody) => {
        if (result.data.code == 1) {
          ElMessage.success(result.data.message);
          deleteFoodDialogVisible.value = false;
          getFoodList();
        } else {
          ElMessage.error(result.data.message);
        }
      })
      .catch(() => {
        ElMessage.error("找不到服务捏~");
      })
}

const mul_deleteFoodDialogVisible = ref(false);
const mul_list = ref([]);
function mulDelete() {
  for(let item of mul_list.value) {
    delete_id.value = item.id;
    deleteFoodInfo();
  }
  mul_deleteFoodDialogVisible.value = false;
}

function handleSelectionChange(val) {
  mul_list.value = val;
}

//编辑菜品
const editFoodDialogVisible = ref(false);
const edit_id = ref(-1);
function handleEdit(id, item) {
  edit_id.value = id;
  editForm.name = item.name;
  editForm.description = item.description;
  editForm.pic = item.pic;
  editForm.acid = item.acid;
  editForm.sweet = item.sweet;
  editForm.pepper = item.pepper;
  editForm.spicy = item.spicy;
  editForm.salt = item.salt;
  editForm.oil = item.oil;
  editForm.supplyTime = item.supplyTime;
  editFoodDialogVisible.value = true;
}

function editFoodInfo() {
  const foodInfo = JSON.stringify({
    'id': edit_id.value,
    'name': editForm.name,
    'acid': editForm.acid,
    'sweet': editForm.sweet,
    'spicy': editForm.spicy,
    'pepper': editForm.pepper,
    'oil': editForm.oil,
    'salt': editForm.salt,
    'supplyTime': editForm.supplyTime,
    'pic': editForm.pic,
    'description': editForm.description,
  })
  axios.post(BASEURL + ApiList.updateFoodUrl, foodInfo,{headers:{'Content-Type': 'application/json'}})
      .then((result: ResponseBody) => {
        if (result.data.code == 1) {
          ElMessage.success(result.data.message);
          editFoodDialogVisible.value = false;
          getFoodList();
        } else {
          ElMessage.error(result.data.message);
        }
      })
      .catch(() => {
        ElMessage.error("找不到服务捏~");
      })
}
</script>

<style scoped>
.search-area {
  width: 14rem;
  margin-left: 1rem;
}
.avatar-uploader-icon {
  font-size: 16px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

</style>
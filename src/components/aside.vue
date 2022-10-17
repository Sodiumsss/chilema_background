<template>
  <el-menu default-active="/index" router>
    <el-menu-item index="/index">
      <el-icon><House /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="/user">
      <el-icon><UserFilled /></el-icon>
      <span>用户管理</span>
    </el-menu-item>
    <el-menu-item index="/food">
      <el-icon><Bowl /></el-icon>
      <span>菜品管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>

</script>
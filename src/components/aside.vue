<template>
  <el-menu default-active="/count" router>
    <el-menu-item index="/count">
      <el-icon><Histogram /></el-icon>
      <span>数据统计</span>
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
<template>
<el-container>
  <el-header><Header/></el-header>
  <el-container>
    <el-aside width="200px"><Aside/></el-aside>
    <el-main><router-view/></el-main>
  </el-container>

</el-container>
</template>

<script lang="ts" setup>
import Aside from "@/components/aside.vue";
import Header from "@/components/header.vue";
</script>

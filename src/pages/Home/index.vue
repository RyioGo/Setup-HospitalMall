<script lang="ts">
//  for node_modules api
import { defineComponent } from "vue";
import { Setup, Context } from "vue-class-setup";

//  for you api

//  for you components

@Setup
class HomeView extends Context {}

export default defineComponent({
  ...HomeView.inject(),
});
</script>

<template>
  <div>1234556</div>
</template>

<style scoped lang="less"></style>

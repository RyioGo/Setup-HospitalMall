<script lang="ts">
//  for node_modules api
import { defineComponent, onMounted } from "vue";
import { Setup, Context, PassOnTo } from "vue-class-setup";
import * as echarts from "echarts";
//  for you api

//  for you components

import lineConfig from "./line";
@Setup
class HomeView extends Context {
  @PassOnTo(onMounted)
  onMountedRun() {
    var one = echarts.init(document.getElementById("one")!);
    var two = echarts.init(document.getElementById("two")!);
    var three = echarts.init(document.getElementById("three")!);
    one.setOption(lineConfig().one);
    two.setOption(lineConfig().two);
    three.setOption(lineConfig().three);
  }
}

export default defineComponent({
  ...HomeView.inject(),
});
</script>

<template>
  <div class="page-index">
    <div class="row">
      <a-card title="本周消费统计" style="width: 100%">
        <div id="one" style="width: 100%; height: 360px"></div>
      </a-card>
      <div style="width: 12px" />
      <a-card title="本周科室预约统计" style="width: 100%">
        <div id="two" style="width: 100%; height: 360px"></div>
      </a-card>
    </div>
    <a-card title="本月会员注册统计" style="width: 100%; margin-top: 12px">
      <div id="three" style="width: 100%; height: 360px"></div>
    </a-card>
  </div>
</template>

<style scoped lang="less">
.page-index {
  padding-bottom: 12px;
  .row {
    display: flex;
    align-items: center;
  }
}
</style>

<template>
  <div id="PieChart"></div>
</template>

<script>
import * as echarts from "echarts";
import { option } from './option.js';
import data from '../../../assets/json/饼图.json'
export default {
  name: "MapBoxDemo",
  data() {
    return {
      width: 0,
      height: 0,
      option: option,
      data,
      myChart: null
    };
  },
  methods: {},
  created() {
    this.$store.watch(
      (state) => state.title,
      (newVal) => {
        // 也可以使用 $store.watch 监听值的变化
        this.option.series[0].data = this.data[newVal]
        option && this.myChart.setOption(this.option);
      }
    );
  },
  mounted() {
    let chartDom = document.getElementById('PieChart');
    this.myChart = echarts.init(document.getElementById('PieChart'));
    this.width = chartDom.getBoundingClientRect().width
    this.height = chartDom.getBoundingClientRect().height
    this.option.series[0].radius[1] = this.height / 2;
    this.option.series[0].data = this.data["total"]
    option && this.myChart.setOption(this.option);
  },
};
</script>

<style scoped></style>

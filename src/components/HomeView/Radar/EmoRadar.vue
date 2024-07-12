<template>
  <div id="emo-radar" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from "echarts";
import data from "../../../assets/json/情感数据.json";
import { useStore } from "vuex";

export default {
  name: "MapBoxDemo",
  data() {
    return {
      data,
      num: 0,
    };
  },
  setup() {
    const store = useStore();
    return { store };
  },
  methods: {
    draw(Data) {
      // console.log(Data);
      var chartDom = document.getElementById("emo-radar");
      var myChart = echarts.getInstanceByDom(chartDom);

      // 如果已有图表实例存在，则先销毁
      if (myChart) {
        echarts.dispose(myChart);
      }

      // 重新初始化和绘制新的图表
      myChart = echarts.init(chartDom);

      const lineStyle = {
        width: 1,
        opacity: 0.5,
      };
      var option = {
        // backgroundColor: "#161627",
        title: {
          text: "情感分析",
          left: "left",
          textStyle: {
            color: "#000",
          },
        },
        radar: {
          indicator: [
            { name: "喜", max: 11 },
            { name: "怒", max: 2 },
            { name: "忧", max: 7 },
            { name: "思", max: 7 },
            { name: "悲", max: 14 },
            { name: "恐", max: 2 },
            { name: "惊", max: 3 },
          ],
          shape: "circle",
          splitNumber: 5,
          axisName: {
            color: "rgb(0, 0, 0)",
          },
          splitLine: {
            lineStyle: {
              color: [
                "rgba(238, 197, 102, 0.8)",
                "rgba(238, 197, 102, 0.6)",
                "rgba(238, 197, 102, 0.4)",
                "rgba(238, 197, 102, 0.2)",
                "rgba(238, 197, 102, 1)",
              ].reverse(),
            },
          },
          splitArea: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "rgba(238, 197, 102, 0.5)",
            },
          },
        },
        series: [
          {
            name: "全国",
            type: "radar",
            lineStyle: lineStyle,
            data: Data,
            symbol: "none",
            itemStyle: {
              color: "#18888580",
            },
            areaStyle: {
              opacity: 0.1,
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
  created() {
    this.$store.watch(
      (state) => state.province,
      (newVal) => {
        this.province = newVal; // 更新存储当前值的变量
        this.draw(data[this.province])
      }
    );
  },
  mounted() {
    this.draw(data['全国'])
  },
};
</script>

<style scoped></style>
../../../assets/json/情感数据.json
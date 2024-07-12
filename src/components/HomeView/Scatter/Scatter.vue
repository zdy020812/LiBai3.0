<template>
  <div id="scatter" style="height: 100%; width: 100%"></div>
</template>

<script>
// 引入Echarts库
import * as echarts from "echarts";
import Years from "../../../assets/json/Years.json";
import Places from "../../../assets/json/Places.json";
import YearsPlacesValue from "../../../assets/json/YearsPlacesValue.json";
import { useStore } from "vuex";

export default {
  data() {
    return {
      Years,
      Places,
      YearsPlacesValue,
      province: this.$store.state.province,
    };
  },
  setup() {
    const store = useStore();
    return { store };
  },
  methods: {
    draw(Years, Places, YearsPlacesValue) {
      var chartDom = document.getElementById("scatter");
      var myChart = echarts.getInstanceByDom(chartDom);

      // 如果已有图表实例存在，则先销毁
      if (myChart) {
        echarts.dispose(myChart);
      }

      // 重新初始化和绘制新的图表
      myChart = echarts.init(chartDom);

      var option = {
        tooltip: {
          position: "top",
          formatter: function (params) {
            var year = Years[params.value[0]];
            var word = Places[params.value[1]];
            var value = params.value[2];
            return year + "年 " + word + ": " + value;
          },
        },
        dataZoom: [
          {
            type: "slider",
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 100,
            top: "92%",
          },
        ],
        grid: {
          height: "72%",
          width: "73%",
          right:"10%",
          top: "15%",
        },
        xAxis: [
          {
            type: "category",
            data: Years,
            splitArea: {
              show: true,
            },
          },
          {
            type: "value",
            show: false,
          },
        ],
        yAxis: [
          {
            type: "category",
            data: Places,
            splitArea: {
              show: true,
            },
          },
        ],
        visualMap: {
          // show: false,
          min: 0,
          max: 5,
          calculable: true,
          orient: "horizontal",
          left: "center",
          top: "4%",
        },
        series: [
          {
            name: "",
            type: "heatmap",
            data: YearsPlacesValue,
            label: {
              show: false,
            },
            itemStyle: {
              color: "#ff0000", // 设置格子的颜色
              borderWidth: 1, // 设置格子的边框宽度
              borderColor: "#ffffff", // 设置格子的边框颜色
              borderRadius: 6, // 设置格子边角的弧度
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
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
        // 也可以使用 $store.watch 监听值的变化
        // console.log("Value changed:", newVal);
        this.province = newVal; // 更新存储当前值的变量
        // console.log(Years[this.province])
        this.draw(
          Years[this.province],
          Places[this.province],
          YearsPlacesValue[this.province]
        );
      }
    );
  },
  mounted() {
    // 初始化时执行一次逻辑
    this.draw(
      Years[this.province],
      Places[this.province],
      YearsPlacesValue[this.province]
    );
  },
};
</script>

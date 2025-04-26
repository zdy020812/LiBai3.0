<template>
  <div id="test" style="height: 90%; width: 100%"></div>
  <!-- <div id="year" style="height: 10%; width: 100%; position: relative">
    <h3 style="position: absolute; right: 2%; bottom: 1%">
      {{ year === 763 ? 762 : year }}
    </h3>
  </div> -->
</template>
<script>
import * as echarts from "echarts";
// import { option } from "./option.js";
import test from "../../../assets/json/BarRace.json";
export default {
  data() {
    return {
      name: [
        "北京",
        "重庆",
        "河北",
        "山西",
        "江苏",
        "浙江",
        "安徽",
        "江西",
        "山东",
        "河南",
        "湖北",
        "湖南",
        "四川",
        "陕西",
      ],
      mychart: null,
      // myoption: option,
      mydate: test,
      // year: 714,
      update: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
  },
  methods: {
    getData() {
      for (let year = 714; year <= 762; year++) {
        for (let i = 0; i < this.name.length; i++) {
          for (let key in this.mydate[year]) {
            if (this.name[i] === key) {
              this.update[i] += this.mydate[year][key];
            }
          }
        }
      }
    },
  },
  mounted() {
    this.getData();
    console.log(this.update);
    this.myChart = echarts.init(document.getElementById("test"));

    const option = {
      xAxis: {
        max: "dataMax",
        type: "value",
        name: "诗词数量",
      },
      yAxis: {
        type: "category",
        data: this.name,
        inverse: true,
        // axisLine: { show: true },
      },
      series: [
        {
          realtimeSort: true,
          type: "bar",
          data: this.update,
          label: {
            show: true,
            position: "right",
            formatter: "{c} 首",
          },
          itemStyle: {
            color: function (params) {
              var colorList = [
                "#c23531",
                "#2f4554",
                "#61a0a8",
                "#d48265",
                "#749f83",
                "#ca8622",
                "#bda29a",
                "#6e7074",
                "#546570",
                "#c4ccd3",
                "#f05b72",
                "#ef5b9c",
                "#f47920",
                "#f9a13f",
              ];

              return colorList[params.dataIndex];
            },
          },
        },
      ],
      grid: {
        right: "8%",
        height: "85%",
        width: "75%",
        bottom: "10%",
      },
      legend: {
        show: true,
      },
      animationDuration: 0,
    };

    option && this.myChart.setOption(option);

    window.addEventListener("resize", () => {
      this.myChart.resize();
    });
  },
};
</script>

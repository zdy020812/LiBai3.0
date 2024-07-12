<template>
  <div id="test" style="height: 90%; width: 100%;"></div>
  <div id="year" style="height: 10%; width: 100%;position: relative">
    <h3 style="position: absolute;right: 2%;bottom: 1%">{{ year === 763 ? 762 : year }}</h3>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { option } from './option.js';
import test from '../../../assets/json/BarRace.json';
export default {
  data() {
    return {
      name: ['北京', '重庆', '河北', '山西', '江苏', '浙江', '安徽', '江西', '山东', '河南', '湖北', '湖南', '四川', '陕西'],
      mychart: null,
      myoption: option,
      mydate: test,
      year: 714,
      update: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById("test"));
    this.myoption.series[0].data = this.update
    this.myoption.yAxis.data = this.name
    window.addEventListener('resize', () => {
      this.myChart.resize();
    });
    let run = () => {
      this.year += 1
      if (this.year <= 762) {
        for (let i = 0; i < this.name.length; i++) {
          for (let key in this.mydate[this.year]) {
            if (this.name[i] === key) {
              this.update[i] += this.mydate[this.year][key]
            }
          }
        }
      } else {
        this.update = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.year = 714
      }
      this.myoption.series[0].data = this.update
      const data = this.update
      this.myChart.setOption({
        series: [
          {
            type: 'bar',
            data
          }
        ]
      });
    }

    setTimeout(function () {
      run();
    }, 0);
    setInterval(function () {
      run();
    }, 1000);

    option && this.myChart.setOption(this.myoption);
  },
};
</script>../../../assets/json/barbace.json
<template>
  <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
    leave-active-class="animate__fadeOut" appear>
    <div v-show="$store.state.display" id="timeLine"></div>
  </transition>
</template>

<script>
import * as echarts from 'echarts';
import { useStore } from "vuex";
import data from '../../../assets/json/时间轴.json';
import 'animate.css';


export default {
  data() {
    return {
      data,
      yAxisData: [0]
    }
  },
  methods:
  {
    graph() {
      var option = {
        tooltip: {
          formatter: arg => {
            return `${arg['name']}年<br>诗词数目:  ${arg['value']}首`;
          }
        },
        grid: {
          height: "80%",
          bottom: "15%"
        },
        dataZoom: [{
          type: 'slider',
          show: false,
          xAxisIndex: [0],
        },
        {
          type: 'inside',
          xAxisData: [0],
        },
        ],
        xAxis: {
          type: 'category',
          data: this.xAxisData,
          axisLabel: {
            textStyle: {
              fontWeight: 'bold', // 设置字体加粗
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} 首'
          },
          show: false
        },
        series: [{
          name: '诗词数目',
          type: 'line',
          smooth: true,
          endLabel: {
            show: true,
            formatter: function (params) {
              return `${params.value}首`
            }
          },
          areaStyle: {
            color: 'rgb(202,149,95)'
          },
          data: this.yAxisData,
        }]
      };
      this.chart.setOption(option)
      window.addEventListener('resize', function () {
        this.chart.resize();
      });
      this.chart.on('click', (params) => {
        // 控制台打印数据的名称
        this.store.state.timeline = params.name
      });
    }
  },
  mounted() {
    this.chart = echarts.init(document.getElementById("timeLine"))
    this.xAxisData = Object.keys(data).map(item => +item)
    this.graph()
  },

  setup() {
    const store = useStore();
    return { store };
  },
  created() {
    this.$store.watch(
      (state) => state.time,
      (newVal) => {
        let a = []
        for (let i = 0; i < this.xAxisData.length; i++) {
          if (this.xAxisData[i] <= newVal) a.push(this.data[this.xAxisData[i]])
          else break;
        }
        this.yAxisData = a;
        this.chart.setOption({
          series: [{
            data: this.yAxisData
          }],
          animation: {
            duration: 1000,  // 过渡时间，单位为毫秒
            easing: 'linear',  // 缓动效果，可选值：linear、quadraticIn、quadraticOut、quadraticInOut、cubicIn、cubicOut、cubicInOut
          }
        })
      }
    );
  },
}
</script>

<style scoped></style>
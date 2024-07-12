<template>
  <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
              leave-active-class="animate__fadeOut" appear>
    <div v-show="$store.state.display" id="test" style="height: 100%; width: 100%"></div>
  </transition>
</template>
<script>
import * as echarts from "echarts";
import { option } from "./BarChart.js";
import myTest from "../../../assets/json/BarChart.json";
import { useStore } from "vuex";

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
      myoption: option,
      zdy: myTest,
      year: 715,
      update: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById("test"));
    this.myoption.series[0].data = this.zdy["718"];
    this.myoption.yAxis.data = this.name;
    option && this.myChart.setOption(this.myoption);
    window.addEventListener('resize',  ()=> {
      this.myChart.resize();
    });
  },
  methods: {},
  setup() {
    const store = useStore();
    return { store };
  },
  created() {
    this.$store.watch(
        (state) => state.time,
        (newVal) => {
          this.update = this.zdy[newVal];
          this.myoption.series[0].data = this.update;
          const data = this.update;
          this.myChart.setOption({
            series: [
              {
                type: "bar",
                data,
              },
            ],
          });
        }
    );
    this.$store.watch(
        (state) => state.timeline,
        (newVal) => {
          this.update = this.zdy[newVal];
          this.myoption.series[0].data = this.update;
          const data = this.update;
          this.myChart.setOption({
            series: [
              {
                type: "bar",
                data,
              },
            ],
          });
        }
    );
  },
};
</script>
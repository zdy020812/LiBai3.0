<template>
  <div ref="mapContainer" className="graphmap"></div>
</template>

<script>
import * as echarts from "echarts";
import china from "../../../assets/json/EchartsMap.json";
import mapdata from "../../../assets/json/省份数据.json";
import mark from '../../../assets/json/标记数据.json';
import { useStore } from "vuex";

export default {
  name: "mapgraph",
  data() {
    return {
      option: null,
      mymark: mark,
      myChart:null
    }
  },
  setup() {
    const store = useStore();
    return { store };
  },
  components: {},
  mounted() {
    this.option = {
      title: {
        text: "李白诗词分布地区图",
        subtext: "数据来源-古诗文网",
      },
      tooltip: {
        formatter: function (params) {
          // 检查params.data.name是否存在
          if (params.data && params.data.name && typeof params.data.value !== "object") {
            // 修改返回的字符串
            return (
                "点击的地点是" +
                params.data.name +
                "，作诗数目为：" +
                params.data.value
            );
          } else if (params.data && params.data.name) {
            return params.data.name
          } else {
            return "未知地点";
          }
        },
      },
      geo: {
        center: [105.5, 32.5],
        map: "china",
        roam: true,
        width: '90%',
        height: '110%',
        emphasis: {
          itemStyle: {
            name: "内蒙古",
            areaColor: "#e8e554",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 1,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
      series: [
        {
          geoIndex: 0,
          type: "map",
          map: "china", // 引入地图数据
          data: mapdata,
        },
        {
          type: "scatter",
          coordinateSystem: "geo",
          data: null,
          symbol: "circle",
          symbolSize: 10,
        }
      ],
      visualMap: {
        left: "right",
        // bottom:"7%",
        min: 0,
        max: 143,
        inRange: {
          color: [
            "#ffe5db",
            "#ff9985",
            "#f57567",
            "#e64546",
            "#b80909",

            // "#c9c6c6",
            // "#86c5b3",
            // "#e0b37b",
            // "#A98BB3",
            // "#7a9f7e",

            // "#9edde8",
            //  "#74cce0",
            //  "#50b0ef",
            //  "#2854a1",
            //  "#0453e5",
          ],
        },
        text: ["High", "Low"],
        calculable: true,
      },
    }
    this.drawMap();
    window.addEventListener('resize',  ()=> {
      this.myChart.resize();
    });
  },
  methods: {
    drawMap() {
      this.myChart = echarts.init(this.$refs.mapContainer);
      echarts.registerMap("china", china);
      this.myChart.setOption(this.option);
      this.myChart.on("click", (params) => {
        let a=[],name="全国"
        if (params.data.name === "四川" || params.data.name === "重庆") {
          a = ["四川", "重庆"]
        } else if (params.data.name === "湖北" || params.data.name === "湖南") {
          a = ["湖北", "湖南"]
        } else if (params.data.name === "山西" || params.data.name === "陕西") {
          a = ["山西", "陕西"]
        } else if (params.data.name === "浙江" || params.data.name === "江西") {
          a = ["浙江", "江西"]
        } else if (params.data.name === "北京" || params.data.name === "河北" || params.data.name === "山东") {
          a = ["北京", "河北", "山东"]
        } else if (params.data.name === "河南") {
          a = ["河南"]
        } else if (params.data.name === "安徽") {
          a = ["安徽"]
        } else if (params.data.name === "江苏") {
          a = ["江苏"]
        }
        this.option.series[1].data = mark.filter(item => a.includes(item.name));
        if(a.length===0)
        {
          this.store.state.province="全国"
        }else{
          this.store.state.province= params.data.name
        }
        // console.log(this.store.state.province)

        this.myChart.setOption(this.option);
      });
    },
  },
};
</script>

<style scoped>
</style>

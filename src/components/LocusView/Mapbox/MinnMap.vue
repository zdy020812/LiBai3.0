<template>
  <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp"
              leave-active-class="animate__fadeOut" appear>
    <div  v-show="$store.state.display" id="minimap"></div>
  </transition>
</template>

<script>
// import * as LiBaiLife from './text100.js';
import mapboxgl from "mapbox-gl";
import store from "../../../store/index.js";
import http from "@/utils/request.js";
import * as turf from '@turf/turf';
import 'animate.css';

mapboxgl.accessToken = "pk.eyJ1Ijoid3p5YW5ndXN0IiwiYSI6ImNscjM4bDVicjA5aWIyam82am1xems1cWEifQ.5rqLhlBbFdmt1FbVJmmCWw";

export default {
  name: 'MapBoxMini',
  data() {
    return {
      num: 0,
    }
  },
  methods: {
    
  },
  mounted() {
    //在这里读取本地JSON文件
    var data3;
    http.get('/user/map').then(res => {
      data3 = res.data.data3
    })
    const map = new mapboxgl.Map({
      container: "minimap",
      // 从地图盒的核心样式中进行选择，或使用地图盒工作室制作自己的样式
      style: "mapbox://styles/wzyangust/clrm3b9lo001e01pu5gcu2gad",
      pitch: 20, // 设置倾斜程度
      center: [103.8, 35.4],
      zoom: 2,
    });
    map.on("load", async () => {
      // 向地图添加比例尺, 默认左下角
      map.addControl(new mapboxgl.ScaleControl({ maxWidth: 75, unit: "metric" }));

      // 定义源数据
      let data = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [[104.74564, 31.778572]],
            },
          },
        ],
      };
      for(let i=0;i<data3.length;i++) {
        data.features[0].geometry.coordinates.push([
          data3[i].lon,
          data3[i].lat
        ]);
      }
      map.addSource("trace", { type: "geojson", data: data });
      //这里是读取移动线条的属性
      map.addLayer({
        id: "trace",
        type: "line",
        source: "trace",
        paint: {
          "line-color": "#303030",
          "line-opacity": 0.7,
          "line-width": 2,
        },
      });
      // 动画跑图
      map.getSource("trace").setData(data);
      map.jumpTo({ center: [103.8, 35.4], zoom: 2 });
    });
  }
}
</script>

<style scoped></style>

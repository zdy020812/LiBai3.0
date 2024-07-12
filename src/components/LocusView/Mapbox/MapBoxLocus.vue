<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import store from "../../../store/index.js";
import http from "@/utils/request.js";
import * as turf from '@turf/turf';
import * as d3 from "d3";

mapboxgl.accessToken = "pk.eyJ1Ijoid3p5YW5ndXN0IiwiYSI6ImNscjM4bDVicjA5aWIyam82am1xems1cWEifQ.5rqLhlBbFdmt1FbVJmmCWw";

export default {
  name: 'MapBoxLocus',
  data() {
    return {
      num: 0,
      city: {},
      markers: [],
      scaledColors: null,
      scaledData: null,
      point: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              bearing: 0,
              name: "",
            },
            geometry: {
              type: "Point",
              coordinates: [104.732, 31.774],
            },
          },
        ],
      },
      datas: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [[104.732, 31.774]],
            },
          },
        ],
      }
    }
  },
  methods: {
    // Haversine公式算法: 根据经纬度计算距离, (lon为经度,lat为纬度)
    Haversine(lon1, lat1, lon2, lat2) {
      Number.prototype.deg2rad = function (deg) {
        return deg * (Math.PI / 180);
      };
      let dLat = (0).deg2rad(lat2 - lat1);
      let dLon = (0).deg2rad(lon2 - lon1);
      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((0).deg2rad(lat1)) *
        Math.cos((0).deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return c * 6378;
    },
    // 加载图片到mapBox
    loadImageToMapBox(map, src, imageName) {
      map.loadImage(src, (error, image) => {
        if (error) throw error;
        if (!map.hasImage(imageName)) {
          map.addImage(imageName, image);
        }
      });
      map.on('styleimagemissing', async (e) => {
        let el = new Image(100, 100);
        el.className = 'marker';
        el.src = await src;
        map.addImage(e.id, el);
      });
      return map
    },
    // 创建固定的颜色和大小比例尺
    createScale() {
      var colars = Array(20).fill().map((_, index) => index + 1);
      // 定义输入域
      var domain = [0, 7, 14];
      // 定义输出颜色范围
      var colorRange = ['red', 'purple', 'black'];
      var sizeRange = [20, 45, 70]
      // 定义线性颜色比例尺
      var colorScale = d3.scaleLinear()
        .domain(domain) // 设置输入域
        .range(colorRange) // 设置输出颜色范围
      var sizeScale = d3.scaleLinear()
        .domain(domain) // 设置输入域
        .range(sizeRange); // 设置输出域
      // 使用颜色比例尺将数据映射到颜色值
      this.scaledColors = colars.map(function (d) {
        return colorScale(d);
      });
      this.scaledData = colars.map(function (d) {
        return sizeScale(d);
      });
    },
    // 利用d3画圆
    getD3Marker(ele, r, color, text) {
      let svg = d3.select(ele).append('svg').attr('width',100).attr('height',100);
      svg.append('circle')
        .attr('cx', 50)
        .attr('cy', 50)
        .style('fill', 'none')
        .transition()
        .duration(1500)
        .attr('r', r)
        .style('fill', color);
      svg.append('text')
        .attr('x', 25)
        .attr('y', 75)
        .attr('text-anchor', 'middle')
        .attr('font-size', '16px')
        .attr('font-family', '楷体')
        .attr('font-weight', 'bold')
        .attr('fill', '#0000ff')
        .text(text);
    }
  },
  mounted() {
    this.createScale();
    //在这里读取本地JSON文件
    var mainCity;
    var data3;
    
    http.get('/user/map').then(res => {
      mainCity = res.data.mainCity;
      // Chronology = res.data.Chronology
      data3 = res.data.data3
    })
    const map = new mapboxgl.Map({
      container: "map",
      // 从地图盒的核心样式中进行选择，或使用地图盒工作室制作自己的样式
      style: "mapbox://styles/wzyangust/clrm3b9lo001e01pu5gcu2gad",
      pitch: 60, // 设置倾斜程度
      center: [104.74564, 31.778572],
      zoom: 7,
    });

    // 加载苏轼图片
    this.loadImageToMapBox(map, "src/assets/picture/figureImage/李白.png", "libai")


    // 加载地图
    map.on("load", async () => {
      // 向地图添加缩放和旋转控件, 默认为右上角
      map.addControl(new mapboxgl.NavigationControl());
      // 向地图添加比例尺, 默认左下角
      map.addControl(new mapboxgl.ScaleControl({ maxWidth: 75, unit: "metric" }));
      // 向地图添加全屏按钮,默认右上角
      map.addControl(new mapboxgl.FullscreenControl());
      // 处理数据
      for (let i = 0; i < mainCity.length; i++) {
        this.city[mainCity[i]] = {
          counts: 0,
          ishave: -1
        }
      }
      for(let i=0;i<data3.length;i++) {
        this.datas.features[0].geometry.coordinates.push([
          data3[i].lon,
          data3[i].lat
        ]);
      }
      // 初始点
      let i = 0;
      store.state.currentProgress = i;
      // 设置视口
      const coordinates = this.datas.features[0].geometry.coordinates;
      this.datas.features[0].geometry.coordinates = [coordinates[i]];
      this.point.features[0].geometry.coordinates = coordinates[i];

      map.jumpTo({ center: coordinates[i], zoom: 7.2 });
      map.setPitch(60);
      map.addSource("trace", { type: "geojson", data: this.datas });
      map.addSource("point", { type: "geojson", data: this.point });
      //这里是读取移动线条的属性
      map.addLayer({
        id: "trace",
        type: "line",
        source: "trace",
        paint: {
          "line-color": "#303030",
          "line-opacity": 0.8,
          "line-width": 8,
        },
      });
      map.addLayer({
        id: "point",
        source: "point",
        type: "symbol",
        layout: {
          // 此图标是地图框街道样式的一部分。
          // 要查看Mapbox样式中可用的所有图像，请在Mapbox Studio中打开该样式，然后单击“图像”选项卡。
          // 要在运行时向样式添加新图像，请参阅 https://docs.mapbox.com/mapbox-gl-js/example/add-image/
          "icon-image": "libai",
          "icon-size": 0.2,
          "icon-rotate": ["get", "bearing"],
          "icon-rotation-alignment": "map",
          "icon-allow-overlap": true,
          "icon-ignore-placement": true,
          "text-field": "前往{name}",
          'text-offset': [2, 2],
          // 'text-anchor':'top',
          'text-size': 14
        },
        paint: {
          "text-color": 'rgba(255,0,255,1)'
        }
      });

      store.state.isclose = false;
      store.state.currentRouter = 3;
      // 动画跑图
      const timer = setInterval(() => {
        if (store.state.isclose) {
          for (let k = 0; k < this.markers.length; k++) {
            this.markers[k].remove();
          }
          map.removeLayer("point");
          map.removeSource("point");
          map.removeLayer("trace");
          map.removeSource("trace");
          store.state.currentProgress = 0;
          window.clearInterval(timer);
        }
        else if (store.state.currentRouter != 3) {
          store.state.currentProgress = 0;
          window.clearInterval(timer);
        }
        else if (store.state.isPause) {
          if (i < coordinates.length) {
            this.datas.features[0].geometry.coordinates.push(coordinates[i]);
            map.getSource("trace").setData(this.datas);
            this.point.features[0].geometry.coordinates = coordinates[i];
            this.point.features[0].properties.name = `${data3[i].nextOldPlace}(现${data3[i].nextNowPlace})`;

            map.getSource("point").setData(this.point);
            // 达到某座城市时
            if (!data3[i].nowPlace.includes("途中")) {
              // 定位
              let points = coordinates[i];
              this.point.features[0].properties.name = `${data3[i].nextOldPlace}(现${data3[i].nextNowPlace})`;
              // 创建marker标记元素
              let el = document.createElement('div');
                // 添加d3属性
              this.getD3Marker(el, this.scaledData[this.city[data3[i].nowPlace]['counts']]/2, this.scaledColors[this.city[data3[i].nowPlace]['counts']], data3[i].nowPlace)
                // 判断是否第一次经过该城市, 更新marker标记
              if(this.city[data3[i].nowPlace]['ishave'] == -1) {
                this.city[data3[i].nowPlace]['ishave'] = this.markers.length;
                this.markers.push(new mapboxgl.Marker(el).setLngLat(points).addTo(map));
              }
              else {
                this.markers[this.city[data3[i].nowPlace]['ishave']].remove();
                this.markers.splice(this.city[data3[i].nowPlace]['ishave'],1,new mapboxgl.Marker(el).setLngLat(points).addTo(map))
              }
              this.city[data3[i].nowPlace]['counts']++;
            }
            store.state.time = data3[i].time;
            store.state.year = data3[i].year;
            if(data3[i].events != '无') {
              store.state.things = data3[i].events;
            }
            map.panTo(coordinates[i]);
            i++;
            store.state.currentProgress++;
            // 实时更新里程数
            if (i < coordinates.length && i > 10) {
              let dist = turf.distance(
                turf.point(coordinates[i]),
                turf.point(coordinates[i - 1]),
                { units: "kilometers" }
              );
              store.state.kilometer += Number(
                String(dist).replace(/^(.*\..{2}).*$/, "$1")
              );
              store.state.kilometer = Number(
                String(store.state.kilometer).replace(/^(.*\..{2}).*$/, "$1")
              );
            }
          } else {
            for (let k = 1; k < this.markers.length; k++) {
              this.markers[k].remove();
            }
            map.removeLayer("point");
            map.removeSource("point");
            window.clearInterval(timer);
          }
        }
        else {
          map.removeLayer("point");
          map.addLayer({
            id: "point",
            source: "point",
            type: "symbol",
            layout: {
              // 此图标是地图框街道样式的一部分。
              // 要查看Mapbox样式中可用的所有图像，请在Mapbox Studio中打开该样式，然后单击“图像”选项卡。
              // 要在运行时向样式添加新图像，请参阅 https://docs.mapbox.com/mapbox-gl-js/example/add-image/
              "icon-image": "libai",
              "icon-size": 0.2,
              "icon-rotate": ["get", "bearing"],
              "icon-rotation-alignment": "map",
              "icon-allow-overlap": true,
              "icon-ignore-placement": true,
              "text-field": "前往{name}",
              'text-offset': [2, 2],
              'text-size': 14
            },
            paint: {
              "text-color": 'rgba(255,0,0,1)'
            }
          });
        }
      }, 40);
    });
  }
}
</script>

<style scoped></style>

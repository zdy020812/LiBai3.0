<template>
  <div class="search-view">
    <main>
      <lb-mapbox class="mapbox"></lb-mapbox>
      <div class="bottom">
        <lb-pieChart class="pie-chart"></lb-pieChart>
        <div v-if="$store.state.isMessageDisplay" class="background">
          <div v-if="$store.getters.ackground.length != 0">
            <p v-for="(item, index) of  $store.getters.ackground" :key="index">{{ item }}</p>
          </div>
          <div v-else class="mmm" style="height:100%">背景不详</div>
        </div>
        <div v-else class="background mmm">点击右边放大镜进行搜索</div>
      </div>
      <div v-if="$store.state.isMessageDisplay" class="message">
        <strong>创作时间: <span v-if="$store.getters.search[0][1] !== '不详'">公元</span>{{ $store.getters.search[0][1] }}<span
            v-if="$store.getters.search[0][1] !== '不详'">年</span></strong>
        <br /><br />
        <strong>创作地点: {{ $store.getters.search[0][4] }}</strong>
      </div>
    </main>
    <aside>
      <lb-search></lb-search>
    </aside>
  </div>
</template>

<script>
import MapBoxSearch from '@/components/SearchView/MapBox/MapBoxSearch.vue';
import SearchAction from '@/components/SearchView/Search/SearchAction.vue';
import PieChart from '@/components/SearchView/PieChart/PieChart.vue'
import { useStore } from "vuex";

export default {
  name: 'SearchView',
  components: {
    'lb-mapbox': MapBoxSearch,
    'lb-search': SearchAction,
    'lb-pieChart': PieChart,
  },
  setup() {
    const store = useStore();
    return { store }
  },
  data: function () {
    return {
      a: 1
    }
  },
  mounted() {
    this.store.state.isMessageDisplay = false
  }
}
</script>

<style scoped>
.search-view {
  display: flex;
}

main {
  position: relative;
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.mapbox {
  top: 1%;
  left: 1%;
  right: 1%;
  height: 69%;
  width: 98%;
  opacity: 0.7;
}

.bottom {
  position: relative;
  top: 1%;
  height: 30%;
  width: 100%;
  display: flex
}

.pie-chart {
  width: 40%;
  height: 100%;
}

.background {
  height: 60%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: "楷体";
  font-size: 120%;
  padding: 1vh 1vw 1vh 1vw;
}

.mmm {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 200%;
  font-weight: 900;
}

.message {
  position: absolute;
  top: 5%;
  left: 5%;
  width: 50%;
  height: 20%;
  font-family: "楷体";
  font-size: 120%;
  font-weight: 900;
  color: #737cbd;
}

aside {
  width: 30%;
  height: 100%;
}
</style>
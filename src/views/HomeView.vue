<template>
  <div class="home-view">
    <main>
      <div>
        <wordcloud-3d class="word-cloud"></wordcloud-3d>
        <lb-map class="map"></lb-map>
      </div>
      <div style="width: 100%;height: 38%;display: flex">
        <div style="height: 100%;width: 45%;"><lb-radar></lb-radar></div>
        <div style="height: 100%;width:55%;"><lb-zhexian></lb-zhexian></div>
      </div>
    </main>
    <aside>
      <div class="scatter">
        <lb-scatter></lb-scatter>
      </div>
      <div class="histogram">
        <lb-BarRace></lb-BarRace>
      </div>
    </aside>
  </div>
</template>

<script>
import Scatter from '@/components/HomeView/Scatter/Scatter.vue';
import EchartsMap from '@/components/HomeView/EchartsMap/EchartsMap.vue';
import WordCloud3D from '@/components/HomeView/WordCloud/WordCloud3D.vue'
import EmoRadar from '@/components/HomeView/Radar/EmoRadar.vue';
import BarRace from '@/components/HomeView/BarRace/BarRace.vue';
import zheXian from "@/components/HomeView/ZheXian/zheXian.vue";


export default {
  name: 'HomeView',
  components: {
    'lb-scatter': Scatter,
    'lb-map': EchartsMap,
    'wordcloud-3d': WordCloud3D,
    'lb-radar': EmoRadar,
    'lb-BarRace': BarRace,
    'lb-zhexian': zheXian
  }
}
</script>


<style scoped>
.home-view {
  display: flex;
}

main {
  width: 70%;
  display: flex;
  flex-direction: column;
}

main> :nth-child(1) {
  height: 62%;
  display: flex;
}

.word-cloud {
  width: 45%;
}

.map {
  width: 55%;
}


aside {
  width: 30%;
  display: flex;
  flex-direction: column;
}

.scatter {
  height: 62%;
}

.histogram {
  height: 38%;
  /* background-color: purple; */
}
</style>
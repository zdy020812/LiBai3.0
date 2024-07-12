<template>
  <div class="locus-view">
    <!-- 地图 -->
    <lb-mapbox v-if="isRouterAlive" class="mapbox"></lb-mapbox>

    <div v-if="$store.state.isMessageDisplay" class="years">
      <strong>{{ $store.state.time }}年&nbsp;{{ age }}岁</strong>
      <br />
      <strong>{{ $store.state.year }}</strong>
    </div>
    <!-- 信息框 -->
    <div v-if="$store.state.isMessageDisplay" class="message" id="m1">
      <div>{{ $store.state.kilometer }} km</div>
    </div>

    <!-- 事件轮播 -->
    <div class="messageContainer">
      <div ref="messageBox" class="messageBox" v-if="$store.state.isMessageDisplay">
        <div v-for="item in eventsList" :key="item">
          <strong>{{ item.things }}</strong>
        </div>
      </div>
    </div>

    <!-- 诗词轮播 -->
    <lb-Bar style="position: absolute;top: 30%;left:3%;width: 22%;height:35%;"></lb-Bar>
    <!-- 人物 -->
    <lb-Figure v-if="$store.state.isMessageDisplay" class="figure"></lb-Figure>
    <!-- 暂停重来按钮 -->
    <div class="icon">
      <div v-if="clickFalse" id="pause" @click="pause()"><el-icon>
          <VideoPause />
        </el-icon></div>
      <div v-else id="play" @click="play()"><el-icon>
          <VideoPlay />
        </el-icon></div>
      <div id="refresh" @click="refresh()"><el-icon>
          <RefreshRight />
        </el-icon></div>
      <div id="close" @click="close()"><el-icon>
          <CircleClose />
        </el-icon></div>
      <div id="disp" @click="$store.state.display = !$store.state.display"><el-icon>
          <View />
        </el-icon></div>
    </div>
    <!-- 时间轴 -->
    <lb-Time style="width: 80%;height: 23%;position: absolute;top: 65%;display: flex;justify-content: center"></lb-Time>
    <!-- 进度条 -->
    <mini-map class="miniMap"></mini-map>
  </div>
</template>

<script>
import MapBoxMini from '@/components/LocusView/MapBox/MinnMap.vue';
import MapBoxLocus from '@/components/LocusView/MapBox/MapBoxLocus.vue';
import FigureImage from '@/components/LocusView/FigureImage/FigureImage.vue';
import TimeLine from "@/components/LocusView/TimeLine/TimeLine.vue";
import BarChart from "@/components/LocusView/BarChart/BarChart.vue";
import { useStore } from "vuex";

export default {
  name: 'CeShiView',
  components: {
    'mini-map': MapBoxMini,
    'lb-mapbox': MapBoxLocus,
    'lb-Figure': FigureImage,
    'lb-Time': TimeLine,
    'lb-Bar': BarChart
  },
  data: function () {
    return {
      currentProgress: 0,
      isRouterAlive: true,
      clickFalse: true,
      active_index: 0,
      age: 17,
      eventsList: [
        {
          time: this.store.state.time,
          year: this.store.state.year,
          things: this.store.state.things
        }
      ]
    }
  },
  methods: {
    progrossUpdate(value) {
      if (document.getElementById("current-progross")) {
        document.getElementById("current-progross").style.width = (1 + (value / 11819) * 99) + '%'
      }
      this.currentProgress = String((value / 11819) * 100).replace(/^(.*\..{2}).*$/, "$1") + '%'
    },
    ageUpdate(time) {
      this.age = (time) % 700;
    },
    eventsUpdate() {
      let events = {
        time: this.store.state.time,
        year: this.store.state.year,
        things: this.store.state.things
      }
      this.eventsList.push(events)
      this.active_index++;
      this.$refs.messageBox.style.setProperty("--m-top", this.active_index);
      if (this.active_index > this.eventsList.length - 1) {
        this.active_index = 0;
      }
    },
    refresh() {
      this.reload()
      this.store.state.currentRouter = 0
      this.store.state.isMessageDisplay = true
      this.store.state.kilometer = 0
      this.store.state.timeline = 715
    },
    pause() {
      this.store.state.isPause = false;
      this.clickFalse = false;
    },
    play() {
      this.store.state.isPause = true
      this.clickFalse = true;
      this.store.state.time = this.store.state.time
    },
    close() {
      this.store.state.isclose = true
      this.store.state.isMessageDisplay = false
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      })
    }
  },
  setup() {
    const store = useStore();
    return { store };
  },
  created() {
    // 监听进度的变化
    this.$store.watch(
      (state) => state.currentProgress,
      (newVal) => {
        // 也可以使用 $store.watch 监听值的变化
        this.currentProgress = newVal; // 更新存储当前值的变量
        this.progrossUpdate(newVal);
      }
    );
    // 监听时间变化
    this.$store.watch(
      (state) => state.time,
      (newVal) => {
        this.time = newVal;
        this.ageUpdate(newVal);
        this.eventsUpdate();
      }
    );
    this.$store.watch(
      (state) => state.timeline,
      (newVal) => {
        this.reload()
        this.store.state.currentRouter = 0
        this.store.state.isMessageDisplay = true
        this.store.state.kilometer = 0
        this.timeline = newVal;
      }
    );
  },
  mounted() {
    this.store.state.isMessageDisplay = true
  }
}
</script>

<style scoped>
.locus-view {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.mapbox {
  height: 100%;
  width: 100%;
  opacity: 0.7;
}

.message {
  position: absolute;
  font-family: "楷体";
  font-size: 3vh;
  font-weight: 900;
  color: #737cbd;
  /* color: #222222; */
  top: 20%;
  left: 5%;
  width: 16vw;
  height: 4vh;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
}

.messageContainer {
  /* background: blue; */
  left: 10vw;
  bottom: 3vh;
  width: 80vw;
  height: 7vh;
  position: absolute;
  overflow: hidden;
}

.messageBox {
  height: 7vh;
  font-family: "楷体";
  font-size: 2vh;
  font-weight: 900;
  color: #c11f2f;
  /* color: #222222; */
  margin-top: calc(-7vh * var(--m-top));
  transition: 1s
}

.messageBox div {
  height: 100%;
  width: 80vw;
}

.figure {
  /* background: yellow; */
  position: absolute;
  top: 5%;
  left: 25vw;
  width: 50vw;
  height: 10vh;
  font-family: "楷体";
  font-size: 120%;
  font-weight: 900;
  color: #4d4b4c;
  overflow: auto;
}

.icon {
  position: absolute;
  top: 5%;
  right: 4%;
  height: 10vh;
  width: 15vw;
  display: flex;
  font-size: 6vh;
  justify-content: center;
}

.years {
  position: absolute;
  font-family: "楷体";
  font-size: 3vh;
  font-weight: 900;
  color: #737cbd;
  /* color: #222222; */
  top: 10%;
  left: 5%;
  width: 16vw;
  height: 7vh;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
}

.miniMap {
  position: absolute;
  top: 30%;
  right: 3vw;
  bottom: 30%;
  width: 25vw;
  height: 40%;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
}</style>
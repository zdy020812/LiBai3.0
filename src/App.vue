<template>
  <div class="main">
    <header>
      <nav>
        <input type="radio" name="tab" id="home" checked />
        <input type="radio" name="tab" id="comment" />
        <input type="radio" name="tab" id="envelope" />
        <input type="radio" name="tab" id="user" />
        <label for="home" class="home" @click="gotoRouter('Home')"><span>Home</span></label>
        <label for="comment" class="comment" @click="gotoRouter('搜索')"><span>搜索</span></label>
        <label for="envelope" class="envelope" @click="gotoRouter('轨迹')"><span>轨迹</span></label>
        <label for="user" class="user" @click="gotoRouter('人物星图')"><span>人物星图</span></label>
        <div class="tab"></div>
      </nav>
      <div class="home-title">李白诗词可视化</div>
      <div class="home-time">
        <el-icon style="margin-right: 2%">
          <Calendar />
        </el-icon>
        <strong>当前时间:</strong>&nbsp;&nbsp;{{ nowTime }}
      </div>
    </header>
    <router-view class="router"></router-view>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "App",
  data() {
    return {
      views: [
        { id: 1, name: "Home", type: "success" },
        { id: 2, name: "搜索", type: "" },
        { id: 3, name: "轨迹", type: "" },
        { id: 4, name: "人物星图", type: "" },
      ],
      nowTime: new Date().toLocaleString(),
    };
  },
  created() {
    this.getCurrentDate();
  },
  beforeUnmount() {
    if (this.nowTime) {
      clearInterval(this.getTimesInterval);
    }
  },
  setup() {
    const store = useStore();
    return { store };
  },
  methods: {
    getCurrentDate() {
      setInterval(this.getTimesInterval, 1000);
    },
    getTimesInterval: function () {
      let date = new Date().toLocaleString();
      this.nowTime = date;
    },
    gotoRouter(routerName) {
      this.$router.push({ name: routerName });
      for (let i = 0; i < this.views.length; i++) {
        if (this.views[i].name === routerName) {
          this.views[i].type = "success";
          this.store.state.currentRouter = i + 1;
        } else this.views[i].type = "";
      }
    },
  },
  mounted() {
    this.gotoRouter("Home");
  },
};
</script>

<style scoped>
.home-title {
  width: 34%;
  text-align: center;
}

.home-time {
  width: 32%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main {
  height: 100%;
  width: 100%;
  position: absolute;
  background: url(./assets/picture/app/背景色.jpg);
  display: flex;
  flex-direction: column;
  /* min-width: 1600px; */
}

header {
  margin: 1% 2% 1% 2%;
  display: flex;
  justify-content: space-between;
  height: 6vh;
  line-height: 6vh;
  font-size: 2vh;
  /* 盒子阴影 */
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
}

header nav {
  display: flex;
  position: relative;
  margin-left: 2%;
  text-align: center;
  width: 30%;
}

header nav label {
  flex: 1;
  width: 100%;
  position: relative;
  z-index: 1;
  cursor: pointer;
}

header nav label:hover {
  /* border-radius: 50px; */
  color: #803a23;
  /* background: #c9f9fd; */
}

header nav label span {
  position: relative;
  z-index: -1;
}

header nav input {
  display: none;
}

header nav .tab {
  position: absolute;
  height: 100%;
  width: 25%;
  /* 渐变背景 自左向右 */
  /* background: linear-gradient(to right, #e8f230, #7fd523); */
  background: url(./assets/picture/app/滑块背景.png) no-repeat center center/100% 100%;
  border-radius: 50px;
  /* 添加动画过渡 贝塞尔曲线 */
  transition: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

header nav #home:checked~label.home span,
header nav #comment:checked~label.comment span,
header nav #envelope:checked~label.envelope span,
header nav #user:checked~label.user span,
header nav #ceshi:checked~label.ceshi span {
  /* color: #33e6f7; */
  color: #803a23;
  transition: 0.6s;
}

header nav #home:checked~.tab {
  left: 0%;
}

header nav #comment:checked~.tab {
  left: 25%;
}

header nav #envelope:checked~.tab {
  left: 50%;
}

header nav #user:checked~.tab {
  left: 75%;
}

/* header nav #ceshi:checked ~ .tab {
  left: 80%;
} */

header> :nth-child(2) {
  text-align: center;
  font-family: 楷体;
  font-size: 3vh;
  line-height: 6vh;
}

header> :nth-child(3) {
  width: 24%;
  text-align: center;
  font-size: 2vh;
  line-height: 6vh;
}

.router {
  margin: 0% 2%;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
  height: 88%;
  width: 96%;
}
</style>

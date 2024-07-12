<template>
  <div class="search-com">
    <header>
      <input type="text" placeholder="请输入搜索内容" @keyup="searchAction()" v-model="inputValue" />
      <div id="my_search_icon" @click="search()">
        <el-icon>
          <Search />
        </el-icon>
      </div>
      <div v-show="inputValue.length != 0" id="delete_icon" @click="clear()">
        <el-icon>
          <Close />
        </el-icon>
      </div>
    </header>
    <main>
      <div v-if="searchResult.length > 0" id="search_content">
        <div v-for="(item, index) of searchResult" :key="index">
          <div v-if="valueLength">
            <div id="content_head">
              <div id="content_head_title">
                <h3>{{ $store.state.title }}</h3>
              </div>
              <div v-if="searchResult[0]['translation'].length !== 0" id="content_head_img">
                <div><img v-if="yi" @click="yi = false" src="../../../assets/picture/search/yi.png" width="25" height="25"
                    alt="译文">
                  <img v-else-if="!yi" @click="yi = true" src="../../../assets/picture/search/yi1.png" width="25"
                    height="25" alt="译文">
                </div>
                <div v-if="searchResult[0]['annotate'].length !== 0"><img v-if="zhu" @click="zhu = false"
                    src="../../../assets/picture/search/zhu.png" width="25" height="25" alt="注释">
                  <img v-else-if="!zhu" @click="zhu = true" src="../../../assets/picture/search/zhu1.png" width="25"
                    height="25" alt="注释">
                </div>
                <div v-if="searchResult[0]['appreciation'].length !== 0"> <img v-if="shang" @click="shang = false"
                    src="../../../assets/picture/search/shang.png" width="25" height="25" alt="赏析">
                  <img v-else-if="!shang" @click="shang = true" src="../../../assets/picture/search/shang1.png" width="25"
                    height="25" alt="赏析">
                </div>
              </div>
            </div>
            <div id="content_bottom">
              <div v-if="yi && zhu">
                <p v-for="(item, index) of  $store.getters.paragraphs" :key="index">{{ item }}</p>
              </div>
              <div v-else-if="!yi && zhu">
                <p v-for="(item, index) of  $store.getters.mergedArray1" :key="index">
                <div v-if="(index + 1) % 2 === 0" style="color:green">{{ item }}</div>
                <div v-else>{{ item }}</div>
                </p>
              </div>
              <div v-else-if="yi && !zhu">
                <p v-for="(item, index) of $store.getters.mergedArray2" :key="index">
                <div v-if="(index + 1) % 2 === 0 && item !== ''" style="color:brown">{{ item }}</div>
                <div v-else>{{ item }}</div>
                </p>
              </div>
              <div v-else>
                <p v-for="(item, index) of $store.getters.mergedArray3" :key="index">
                <div v-if="(index + 1) % 3 === 2" style="color:green">{{ item }}</div>
                <div v-else-if="(index + 1) % 3 === 0 && item !== ''" style="color:brown">{{ item }}</div>
                <div v-else>{{ item }}</div>
                </p>
              </div>

              <div v-if="!shang && bei">
                <br>
                <hr>
                <br>
                <h3>赏析</h3>
                <br>
                <p v-for="(item, index) of  $store.getters.appreciation" :key="index">{{ item }}</p>
              </div>
              <div v-else-if="shang && !bei">
                <br>
                <hr>
                <br>
                <h3>创作背景</h3>
                <br>
                <p v-for="(item, index) of  $store.getters.ackground" :key="index">{{ item }}</p>
              </div>
              <div v-else-if="!shang && !bei">
                <br>
                <hr>
                <br>
                <h3>赏析</h3>
                <br>
                <p v-for="(item, index) of  $store.getters.appreciation" :key="index">{{ item }}</p>
                <br>
                <hr>
                <br>
                <h3>创作背景</h3>
                <br>
                <p v-for="(item, index) of  $store.getters.ackground" :key="index">{{ item }}</p>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="mysearch_title" @click="titleSearch(index)">
              <el-icon size="20">
                <Search />
              </el-icon>
              <p>{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else id="search-content-empty-result">搜索结果为空</div>
    </main>
  </div>
</template>

<script>
import courseData from "@/assets/json/李白赏析最终版本.json";
import searchData from "@/assets/json/诗词交互数据.json";
import { useStore } from "vuex";
export default {
  data: function () {
    return {
      searchResult: [],
      courseData,
      inputValue: "",
      valueLength: false,
      yi: true,
      zhu: true,
      shang: true,
      bei: true,
    };
  },
  setup() {
    const store = useStore();
    return { store };
  },
  methods: {
    // 字符匹配算法
    stringMatch() {
      const regExp = new RegExp(this.inputValue, "gi");
      this.searchResult = this.courseData.filter((item) => {
        return (
          item.title.match(regExp) ||
          item.paragraphs.some((p) => p.match(regExp))
        );
      });
    },
    searchAction() {
      this.stringMatch();
      if (this.inputValue.length === 0) {
        this.valueLength = false;
        this.store.state.title = this.courseData[0].title;
        this.store.state.isMessageDisplay = false;
      }
    },
    //搜索栏搜索点击事件
    search() {
      if (this.searchResult.length === 1) {
        this.valueLength = true;
        this.store.state.title = this.searchResult[0].title;
        this.store.state.time = searchData[this.searchResult[0].title].time;
        this.store.state.place = searchData[this.searchResult[0].title].place;
        this.store.state.经纬度 = searchData[this.searchResult[0].title].经纬度;
        this.store.state.isMessageDisplay = true;
      }
    },
    //搜索栏内容删除事件
    clear() {
      this.inputValue = "";
      this.valueLength = false;
      this.yi = true;
      this.zhu = true;
      this.shang = true;
      this.bei = true;
      this.store.state.title = "total";
      this.store.state.isMessageDisplay = false;
      this.stringMatch();
    },
    //内容栏标题点击事件
    titleSearch(index) {
      this.inputValue = this.searchResult[index].title;
      this.stringMatch();
    },
  },
  mounted() {
    this.stringMatch();
  },
  computed: {},
  watch: {
    title(newVal, oldVal) {
      // console.log(this.searchResult)
    },
  },
};
</script>
<style lang="less" scoped>
.search-com {
  display: flex;
  flex-direction: column;
  height: 100%;

  img,
  .mysearch_title,
  #my_search_icon,
  #delete_icon {
    cursor: pointer;
  }


}

header {
  position: relative;
  height: 10%;
  width: 100%;
  display: flex;
  align-items: center;

  input {
    padding-left: 9%;
    padding-right: 12%;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 20px;
    width: 58%;
    height: 60%;
  }

  #my_search_icon,
  #delete_icon {
    position: absolute;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #my_search_icon {
    left: 2%;
  }

  #delete_icon {
    right: 24%;
  }
}

main {
  height: 90%;

  #search_content {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    #content_head {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 10%;

      #content_head_title {
        width: 70%;
        padding-top: 2%;
      }

      #content_head_img {
        display: flex;
        justify-content: space-between;
        width: 30%;
      }
    }

    #content_bottom {
      margin-top: 2%;
      height: 88%;

      p {
        margin-bottom: 2%;
      }
    }

    .mysearch_title {
      display: flex;
      width: 100%;
      padding-top: 1.5%;
      padding-bottom: 1.5%;
      border: 1px solid black;
      align-items: center;
    }

    .mysearch_title:hover {
      background-color: rgba(211, 211, 211, 0.8);
    }
  }

  #search-content-empty-result {
    text-align: center;
    font-size: 16px;
    color: #999;
    margin-top: 20px;
  }
}
</style>
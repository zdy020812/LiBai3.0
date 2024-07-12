<template>
  <div id="imageContainer"></div>
</template>

<script>
import * as d3 from 'd3';
import data from "../../../assets/json/李白年谱.json";
import { useStore } from "vuex";

export default {
  data() {
    return {
      data,
      time: null,
      allIndividuals: [],
    };
  },
  setup() {
    const store = useStore();
    return { store };
  },
  methods: {
    getAllIndividuals() {
      const individuals = new Set();
      Object.values(this.data).forEach(year => {
        if (year["人物"]) {
          Object.keys(year["人物"]).forEach(individual => {
            individuals.add(individual);
          });
        }
      });
      this.allIndividuals = [...individuals];
    },
    draw(time) {
      const imageContainer = document.getElementById("imageContainer");
      imageContainer.innerHTML = "";

      this.allIndividuals.forEach((person) => {
        const imageDiv = document.createElement("div");
        imageDiv.classList.add("person");

        const svg = d3.select(imageDiv).append("svg")
          .attr("width", 60)
          .attr("height", 60);

        const circle = svg.append("g")
          .attr("transform", "translate(29,29)");

        // 创建60个刻度
        [...Array(60).keys()].forEach(i => {
          circle.append("line")
            .attr("x1", 0)
            .attr("y1", 25)
            .attr("x2", 0)
            .attr("y2", 20)
            .attr("transform", `rotate(${(i * 6)})`)
            .style("stroke", "gray")
            .style("stroke-width", 1);
        });

        const image = document.createElement("img");
        // image.src = "/src/assets/picture/figureImage/" + person + ".jpg";
        //  image.src = `../../../assets/picture/figureImage/${person}.jpg`
        image.src = `/picture/figureImage/${person}.jpg`
        image.alt = person;
        image.style.borderRadius = "50%";
        image.style.width = "40px";
        image.style.height = "40px";
        image.style.position = "absolute";
        image.style.top = "9px";
        image.style.left = "9px";

        const name = document.createElement("p");
        name.textContent = person;

        image.onload = () => {
          imageDiv.appendChild(image);
          imageDiv.appendChild(name);
          imageContainer.appendChild(imageDiv);
        };

        image.onerror = function () {
          // 图像加载失败时不执行任何操作
        };

        // 突出显示特定时间的刻度
        if (this.data[time] && this.data[time]["人物"] && this.data[time]["人物"][person]) {
          const highlightIndex = time - 701;
          circle.select(`line:nth-child(${highlightIndex})`)
            .style("stroke", "red")
            .style("stroke-width", 3);
        }
      });
    },
  },
  created() {
    this.getAllIndividuals();
    this.$store.watch(
      (state) => state.time,
      (newVal) => {
        this.time = newVal;
        this.draw(this.time);
      }
    );
  },
  mounted() {
    this.draw(this.time);
  },
};



</script>

<style>
#imageContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  /* background-image: url('../../../assets/picture/figureImage/'); */
}

.person {
  position: relative;
  width: 60px;
  height: 80px;
  margin: 20px;
}

.person img {
  border-radius: 25%;
  width: 80px;
  height: 80px;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
}

.person p {
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 0px;
  left: -10px;
  font-size: 14px;
}
</style>

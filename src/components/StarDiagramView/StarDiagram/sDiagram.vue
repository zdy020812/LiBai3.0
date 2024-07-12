<template>
  <div class="tang-container" id="tang-container"></div>
</template>

<script>
import * as d3 from "d3";
import { onMounted } from "vue";

export default {
  data() { },
  setup() { },
  methods: {
    draw() {
      let promptBox, body, width, height;
      const nodeRadius = 6;
      width = document.getElementById("tang-container").offsetWidth;
      height = document.getElementById("tang-container").offsetHeight;
      const container = document.getElementById("tang-container");
      container.innerHTML = ""; // 清空容器中的内容

      promptBox = d3.select("#tooltip");
      body = d3.select(".tang-container");

      const svg = body
        .append("svg")
        .attr("width", width)
        .attr("height", height);
      function drag(simulation) {
        function dragStart(e, d) {
          // console.log(e.active);
          simulation.alphaTarget(0.8).restart();
          d.fx = d.x;
          d.fy = d.y;
        }
        function dragging(e, d) {
          d.fx = e.x;
          d.fy = e.y;
        }
        function dragEnd(e, d) {
          simulation.alphaTarget(0).restart();
          d.fx = null;
          d.fy = null;
        }
        return d3
          .drag()
          .on("start", dragStart)
          .on("drag", dragging)
          .on("end", dragEnd);
      }
      function ticked(links, nodesChart) {
        // console.log('ticked');
        links
          .attr("x1", function (d) {
            return d.source.x;
            // console.log('line',d)
          })
          .attr("y1", function (d) {
            return d.source.y;
          })
          .attr("x2", function (d) {
            return d.target.x;
          })
          .attr("y2", function (d) {
            return d.target.y;
          });
        nodesChart.attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        });
      }

      d3.json("dataAll.json").then((data) => {
        // console.log(data);
        const nodes = data.nodes;
        const links = data.edges;
        // console.log(nodes.length);

        const simulation = d3
          .forceSimulation(nodes)
          .force(
            "link",
            d3.forceLink(links).id((d) => d.name)
          )
          .force("charge", d3.forceManyBody().strength(-(width * 0.3)))
          //   .force("collide", d3.forceCollide(nodeRadius))
          .force("center", d3.forceCenter(width / 2, height / 2))
          .force(
            "radial",
            d3.forceRadial(height / 4, width / 2, height / 2).strength(0.4)
          )
          .force("x", d3.forceX(width / 2).strength(0.01))
          .force("y", d3.forceY(height / 2).strength(0.2))
          .on("tick", () => ticked(edges, nodesChart));

        const line = svg
          .append("g")
          .selectAll()
          .data(links)
          .enter()
          .append("g");
        const edges = line
          .append("line")
          .attr("stroke", "#ccc")
          .attr("stroke-width", 1);

        const nodesChart = svg
          .append("g")
          .selectAll()
          .data(nodes)
          .join("g")
          .attr("transform", function (d, i) {
            return "translate(" + d.x + "," + d.y + ")";
          });

        nodesChart
          .append("circle")
          .attr("r", function (d) {
            // 保存原始半径到数据中
            d.originalRadius = 12 + (d.citation / 10) * (width / 300);
            return d.originalRadius;
          })
          .attr("fill", function (d) {
            return `rgba(0, 136, 136,${d.citation / 10 + 0.5})`;
          });

        nodesChart
          .append("text")
          .attr("x", 0)
          .attr("y", 0)
          .attr("dy", 2)
          .attr("font-size", 13)
          .text(function (d) {
            if (d.citation >= 2) {
              return d.name;
            } else {
              return "";
            }
          })
          .attr("fill", "#000")
          .attr("text-anchor", "middle");

        nodesChart
          .on("mouseover", function (event, d) {
            // console.log(d);
            d3.select(this)
              .append("text")
              .attr("class", "node-label")
              .attr("x", 0)
              .attr("y", 0)
              .attr("dy", 2)
              .attr("font-size", 13)
              .text(d.name)
              .attr("fill", "#000")
              .attr("text-anchor", "middle");

            d3.select(this)
              .select("circle")
              .transition()
              .duration(200)
              .attr("r", (d) => d.originalRadius * 1.3);
          })

          .on("mouseout", function (event, d) {
            d3.select(this).select(".node-label").remove();

            // 恢复原始半径
            d3.select(this)
              .select("circle")
              .transition()
              .duration(200)
              .attr("r", (d) => d.originalRadius);
          });

        nodesChart.call(drag(simulation));
      });
    },
    handleResize() {
      // 在这里处理屏幕大小变化的逻辑
      this.draw();
    },
  },
  created() { },
  mounted() {
    // 监听窗口大小变化
    window.addEventListener("resize", this.handleResize);
    // 初始化调用一次
    this.handleResize();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style>
#tang-container {
  width: 100%;
  height: 100%;
}
</style>

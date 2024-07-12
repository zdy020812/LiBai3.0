<template>
    <div id="changshi" style="width: 100%;height: 100%"></div>
</template>
  
<script>
import * as echarts from 'echarts';
import data from '../../../assets/json/折线图.json';


export default {
    data() {
        return {
            arr: data,
            // time: 0,
            // count: 0
        }
    },
    methods:
    {
        graph() {
            var chart = echarts.init(document.getElementById("changshi"))
            var option = {
                animationDuration: 10000,
                tooltip: {
                    // triggerOn: 'click',
                    formatter: arg => {
                        // console.log("数据发生变化")
                        //
                        // // return `时间:${arg['name']}年<br>诗词数目:  ${arg['value']}首`;
                        // this.count = arg['value']
                        // if(arg['value']==0)  this.time="total";
                        // else this.time = arg['name'].toString();
                        // // this.count=arg['value']
                        // Bus.emit('share', [this.time, this.count])
                        return `<div style="">${arg['name']}<br>诗词数目:  ${arg['value']}首</div>`;
                    }
                },
              grid:{
                // width:"80%"
              },
                toolbox: {
                    show: true,
                    orient: 'horizontal',
                    feature: {
                        dataZoom: {
                            show: true,
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar'],
                        },
                        savaAsImage: {
                            type: 'png',
                            name: '李白诗词数量',
                        },
                        myRefresh: {
                            show: true,
                            title: '刷新',
                            icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                            onclick: function () {
                                chart.clear()
                                chart.setOption(option, true)
                            }
                        },
                    },
                },
                dataZoom: [{
                    type: 'slider',
                    show: true,
                    xAxisIndex: [0],
                },
                {
                    type: 'inside',
                    xAxisData: [0],
                },
                ],
                xAxis: {
                    type: 'category',
                    data: this.xAxisData,
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} 首'
                    },
                    show: false
                },
                series: [{
                    name: '诗词数目',
                    type: 'line',
                    markPoint: {
                        data: [{
                            type: 'max',
                            name: '最大值'
                        },
                        {
                            type: 'min',
                            name: '最小值'
                        }
                        ]
                    },
                    markLine: {
                        data: [{
                            type: 'average',
                            name: '平均值'
                        }]
                    },
                    smooth: true,
                    endLabel: {
                        show: true,
                        formatter: function (params) {
                            return `${params.value}首`
                        }
                    },
                    areaStyle: {
                        color: 'green'
                    },
                    data: this.yAxisData,
                }]
            };
            chart.setOption(option)
        }
    },
    computed: {
        xAxisData() {
            let xAxisData = new Array(62)
            for (let i = 1; i < this.arr.length; i++) {
                xAxisData[i - 1] = this.arr[i][0]
            }
            return xAxisData
        },
        yAxisData() {
            let yAxisData = new Array(62)
            for (let i = 1; i < this.arr.length; i++) {
                yAxisData[i - 1] = this.arr[i][1]
            }
            return yAxisData
        }
    },
    mounted() {
        this.graph()
    }
}
</script>
  
<style scoped>
/* #changshi {
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
} */
</style>
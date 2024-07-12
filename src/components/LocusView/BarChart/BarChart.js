import * as echarts from "echarts";

export const option = {
    xAxis: {
        max: 'dataMax',
        axisLabel: {
            textStyle: {
                fontWeight: 'bold', // 设置字体加粗
            }
        }
    },
    yAxis: {
        type: 'category',
        data: null,
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 5, // only the largest 3 bars will be displayed
        axisLabel: {
            textStyle: {
                fontWeight: 'bold', // 设置字体加粗
            }
        }
    },
    series: [
        {
            realtimeSort: true,
            // name: 'X',
            type: 'bar',
            data: null,
            label: {
                show: true,
                position: 'right',
                valueAnimation: true
            },
            itemStyle: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 0,  // 渐变色起点和终点位置
                    [
                      {offset: 0, color: '#faf6d7'},    // 渐变色起点颜色
                      {offset: 1, color: '#b66c2c'}     // 渐变色终点颜色
                    ]
                  )
                // color: '#b66c2c',
                // color: function (params) {
                //     var colorList = [
                //         '#c23531', '#2f4554', '#61a0a8', '#d48265', '#749f83',
                //         '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3',
                //         '#f05b72', '#ef5b9c', '#f47920', '#f9a13f'
                //     ];
                //
                //     return colorList[params.dataIndex];
                // }
            }
        }
    ],
    grid: {
        left:"13%",
        height: "85%",
        width: "75%",
        bottom: "10%",
    },
    legend: {
        show: true
    },
    animationDuration: 0,
    animationDurationUpdate: 1000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
};
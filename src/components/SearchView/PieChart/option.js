export const option={
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {d}%'
    },
    series: [
        {
            name: 'Area Mode',
            type: 'pie',
            radius: [5,null],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 5
            },
            data: null
        }
    ]
};
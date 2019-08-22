const tooltipBase = {
    trigger: 'axis',
    axisPointer: {
        type: 'cross',
        label: {
            show: false
        },
        lineStyle: {
            opacity: 0
        },
        crossStyle: {
            opacity: 0
        }
    },
    confine: true,
    backgroundColor: 'rgba(255,255,255,0.7)',
    textStyle: {
        color: 'rgba(0,0,0,0.65)',
        fontSize: 12
    },
    extraCssText: 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);'
};

const visitEchartOption = {
    tooltip: {
        ...tooltipBase,
        formatter: function(params) {
            let result = '';
            const dotHtml = '<span style="margin-right:5px;border-radius:100%;width:6px;height:6px;background:#975fe4;"></span>';
            params.forEach(function(item) {
                result += dotHtml + item.axisValue + '<div style="margin-left:20px;">' + item.data[1] + '</div>';
            });
            return '<div style="display:flex;align-items:center;">' + result + '</div>';
        }
    },
    grid: {
        left: -20,
        right: -20,
        bottom: 10,
        top: 10
    },
    xAxis: [
        {
            type: 'category',
            show: false
        }
    ],
    yAxis: [
        {
            show: false
        }
    ],
    dataset: {
        source: []
    },
    series: [
        {
            type: 'line',
            smooth: true, //这个是把线变成曲线
            symbol: 'circle',
            symbolSize: 2,
            itemStyle: {
                normal: {
                    color: 'rgba(151, 95, 228, 0)' //拐点颜色
                },
                emphasis: {
                    color: '#975fe4',
                    borderColor: '#fff',
                    borderWidth: 2
                }
            },
            areaStyle: {
                color: '#975fe4'
            }
        }
    ]
};

const payEchartOption = {
    color: ['#3aa1ff'],
    tooltip: {
        ...tooltipBase,
        formatter: function(params) {
            let result = '';
            const dotHtml = '<span style="margin-right:5px;border-radius:100%;width:6px;height:6px;background:#3aa1ff;"></span>';
            params.forEach(function(item) {
                result += dotHtml + item.axisValue + '<div style="margin-left:20px;">' + item.data[1] + '</div>';
            });
            return '<div style="display:flex;align-items:center;">' + result + '</div>';
        }
    },
    grid: {
        left: 0,
        right: 0,
        bottom: 10,
        top: 10
    },
    xAxis: [
        {
            type: 'category',
            show: false
        }
    ],
    yAxis: [
        {
            type: 'value',
            show: false
        }
    ],
    dataset: {
        source: []
    },
    series: [
        {
            type: 'bar',
        }
    ]
};

const searchTotalEchartOption = {
    tooltip: {
        ...tooltipBase,
        formatter: function(params) {
            let result = '';
            const dotHtml = '<span style="margin-right:5px;border-radius:100%;width:6px;height:6px;background:#1d90ff;"></span>';
            params.forEach(function(item) {
                result += dotHtml + item.axisValue + '<div style="margin-left:20px;">' + item.data[1] + '</div>';
            });
            return '<div style="display:flex;align-items:center;">' + result + '</div>';
        }
    },
    grid: {
        left: -20,
        right: -20,
        bottom: 10,
        top: 10
    },
    xAxis: [
        {
            type: 'category',
            show: false
        }
    ],
    yAxis: [
        {
            show: false
        }
    ],
    dataset: {
        source: []
    },
    series: [
        {
            type: 'line',
            smooth: true, //这个是把线变成曲线
            symbol: 'circle',
            symbolSize: 2,
            lineStyle: {
              width: 2,
              color: '#1d90ff',
            },
            itemStyle: {
                normal: {
                    color: 'rgba(151, 95, 228, 0)' //拐点颜色
                },
                emphasis: {
                    color: '#1d90ff',
                    borderColor: '#fff',
                    borderWidth: 2
                }
            },
            areaStyle: {
                color: '#d1e9ff'
            }
        }
    ]
};

const searchPerEchartOption = {
    tooltip: {
        ...tooltipBase,
        formatter: function(params) {
            let result = '';
            const dotHtml = '<span style="margin-right:5px;border-radius:100%;width:6px;height:6px;background:#1d90ff;"></span>';
            params.forEach(function(item) {
                result += dotHtml + item.axisValue + '<div style="margin-left:20px;">' + item.data[1] + '</div>';
            });
            return '<div style="display:flex;align-items:center;">' + result + '</div>';
        }
    },
    grid: {
        left: -20,
        right: -20,
        bottom: 10,
        top: 10
    },
    xAxis: [
        {
            type: 'category',
            show: false
        }
    ],
    yAxis: [
        {
            show: false
        }
    ],
    dataset: {
        source: []
    },
    series: [
        {
            type: 'line',
            smooth: true, //这个是把线变成曲线
            symbol: 'circle',
            symbolSize: 2,
            lineStyle: {
              width: 2,
              color: '#1d90ff',
            },
            itemStyle: {
                normal: {
                    color: 'rgba(151, 95, 228, 0)' //拐点颜色
                },
                emphasis: {
                    color: '#1d90ff',
                    borderColor: '#fff',
                    borderWidth: 2
                }
            },
            areaStyle: {
                color: '#d1e9ff'
            }
        }
    ]
};

const salesEchartOption = {
    color: ['#1890ff', '#13c2c2', '#2fc25b', '#facc14', '#f04864', '#8543e0'],
    // backgroundColor: '#fff',
    tooltip: {
        ...tooltipBase,
        trigger: 'item',
        formatter: function(param) {
            let result = '';
            const dotHtml =
                '<span style="margin-right:5px;border-radius:100%;width:6px;height:6px;background:' +
                param.color +
                ';"></span>';

            result +=
                dotHtml +
                param.name +
                '<div style="margin-left:20px;">' +
                param.percent +
                '%</div>';
            return (
                '<div style="display:flex;align-items:center;">' +
                result +
                '</div>'
            );
        }
    },
    dataset: {
        sourceHeader: false,
        dimensions: ['salesType', 'money', 'percent', 'color'],
        source: []
    },
    series: [
        {
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            hoverOffset: 0,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '0'
                    }
                }
            },
            itemStyle: {
                borderWidth: 5,
                borderColor: '#fff'
            }
            // data: []
        }
    ]
};

export {
    visitEchartOption,
    payEchartOption,
    searchTotalEchartOption,
    searchPerEchartOption,
    salesEchartOption,
}
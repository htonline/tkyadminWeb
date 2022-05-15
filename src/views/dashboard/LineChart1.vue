<template>
  <div :class="className" :style="{height:height,width:width}" ></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          text: '质量分析（周）',
          left: 10
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            magicType: { show: true, type: ['line', 'bar'] },
            dataZoom: {
              yAxisIndex: false
            },
            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          bottom: 90
        },
        dataZoom: [
          {
            type: 'inside'
          },
          {
            type: 'slider'
          }
        ],
        legend: {
          data: ['已检隧道（座）', '缺陷隧道（座）', '已检隧道（座） ', '缺陷隧道（座） ']
        },
        xAxis: {
          data: [30, 52, 200, 334, 390, 330, 220],
          silent: false,
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          }
        },
        yAxis: {
          splitArea: {
            show: false
          }
        },
        series: [
          {
            type: 'bar',
            name: '已检隧道（座）',
            color: '#1e634d',
            data: [30, 52, 200, 334, 390, 330, 220],
            // Set `large` for large data amount
            large: true
          },
          {
            type: 'line',
            name: '缺陷隧道（座）',
            color: '#eecf06',
            data: [30, 52, 200, 334, 390, 330, 220],
            // Set `large` for large data amount
            large: true
          },
          {
            type: 'bar',
            name: '已检隧道（座） ',
            color: '#8b5227',
            data: [37, 57, 210, 634, 396, 230, 120],
            // Set `large` for large data amount
            large: true
          },
          {
            type: 'line',
            name: '缺陷隧道（座） ',
            color: '#a50a40',
            data: [37, 57, 210, 634, 396, 230, 120],
            // Set `large` for large data amount
            large: true
          }
        ]
      })
    }
  }
}
</script>

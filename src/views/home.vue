<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
    <!-- <github-corner class="github-corner" /> -->
      <div class="card-panel-text">
        <span>衬砌检测总体概况</span>
        <panel-group @handleSetLineChartData="handleSetLineChartData" />
      </div>
      <el-row :gutter="32">
        <!--
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <radar-chart />
          </div>
        </el-col>
        -->
        <el-col :xs="8" :sm="8" :lg="6">
          <div class="chart-wrapper">
            <pie-chart2 />
          </div>
        </el-col>
        <el-col :xs="8" :sm="8" :lg="6">
          <div class="chart-wrapper">
            <pie-chart3 />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6">
          <div class="chart-wrapper">
            <bar-chart1 />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6">
          <div class="chart-wrapper">
            <bar-chart2 />
          </div>
        </el-col>
      </el-row>
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
       <!-- <line-chart :chart-data="lineChartData" />  -->
        <line-chart />
      </el-row>
    </div>
  </div>
</template>

<script>
import PanelGroup from './dashboard/PanelGroup1'
import LineChart from './dashboard/LineChart1'
import RadarChart from '@/components/Echarts/RadarChart'
import PieChart2 from '@/components/Echarts/PieChart2'
import PieChart3 from '@/components/Echarts/PieChart3'
import BarChart1 from '@/components/Echarts/BarChart1'
import BarChart2 from '@/components/Echarts/BarChart2'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'Dashboard',
  components: {
    // GithubCorner,
    PanelGroup,
    LineChart,
    RadarChart,
    PieChart2,
    PieChart3,
    BarChart1,
    BarChart2,
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>

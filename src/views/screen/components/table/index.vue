<template>
  <div class="box6">
    <div class="title">
      <p>设备异常报告</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <!-- 图形图标的容器 -->
    <!-- <div class="charts" ref="charts"></div> -->

    <el-table :data="tableData"
      style="width: 99.97%;--el-table-border-color: none;border-right: 1px #143275 solid;border-left: 1px #143275 solid;border-bottom: 1px #143275 solid;"
      :highlight-current-row="false"
      :header-cell-style="{ backgroundColor: '#143275', color: '#ffffff', fontSize: '14px', textAlign: 'center', borderLeft: '0.5px #154480 solid', borderBottom: '1px #154480 solid' }"
      :cell-style="{ color: 'white', fontSize: '14px', textAlign: 'center', borderBottom: '0.5px #143275 solid', borderLeft: '0.5px #143275 solid' }"
      :row-style="{ color: 'black', fontSize: '14px', textAlign: 'center', }" empty-text="暂无数据" max-height="818"
      :row-class-name="tableRowClassName">
      <el-table-column prop="date" label="时间" />
      <el-table-column prop="room" label="房间" />
      <el-table-column prop="type" label="设备类型" />
    </el-table>
  </div>
</template>

<script setup>
let tableData = [{
  date: '1',
  room: '20',
  type: 'zjhi',

}, {
  date: '1',
  room: '20',
  type: 'zjhi',

}, {
  date: '1',
  room: '20',
  type: 'zjhi',

}, {
  date: '1',
  room: '20',
  type: 'zjhi',

}, {
  date: '1',
  room: '20',
  type: 'zjhi',

}, {
  date: '1',
  room: '20',
  type: 'zjhi',

}, {
  date: '1',
  room: '20',
  type: 'zjhi',

}, {
  date: '1',
  room: '20',
  type: 'zjhi',

},]
// let tableData = ref<Node[]>();
// onMounted(() => {
//   getHasUser();
// })
const tableRowClassName = ({ row, rowIndex }) => {
  if (rowIndex % 2 == 0) {
    return "";
  } else {
    return "warning-row";
  }
}


// 表格斑马格:row-class-name="tableRowClassName
</script>

<style scoped lang='scss'>
.box6 {
  width: 100%;
  height: 100%;
  background: url(../../images/table.jpg) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;

  .title {
    margin-left: 5px;
    margin: 10px;

    p {
      color: white;
      font-size: 20px;
    }
  }

  .charts {
    height: calc(100% - 30px);
  }
}

// 最外层透明 */
::v-deep .el-table,
::v-deep .el-table__expanded-cell {
  background-color: transparent;
  color: #93dcfe;
  font-size: 10px;
}

/* 表格内背景颜色  */
::v-deep .el-table th,
::v-deep .el-table tr,
::v-deep .el-table td {
  background-color: transparent;
  border: 0px;
  color: #93dcfe;
  font-size: 24px;
  height: 5px;
  font-family: Source Han Sans CN Normal, Source Han Sans CN Normal-Normal;
  font-weight: Normal;
}

::v-deep .el-table__row.warning-row {
  background: #063570;
}

::v-deep .el-table tbody tr:hover>td {
  background: #063570 !important;
}

/* // 去掉最下面的那一条线  */
.el-table::before {
  height: 0px;
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar-track {
  background-color: #063570;
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  width: 10px;
  opacity: 0.5;
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 15px;
  background-color: #0257aa;
}

/* // 设置表格行高度 */
::v-deep .el-table__body tr,
::v-deep .el-table__body td {
  padding: 0;
  height: 54px;
}

/* // 修改高亮当前行颜色 */
::v-deep .el-table tbody tr:hover>td {
  background: #063570 !important;
}

/* // 取消当前行高亮 */
::v-deep .el-table tbody tr {
  pointer-events: none;
}

/* 修改表头样式-加边框 */
/* ::v-deep .el-table__header-wrapper {
border: solid 1px #04c2ed;
} */

/* // 表格斑马自定义颜色 */
::v-deep .el-table__row.warning-row {
  background: #01205A;
}


/* 去掉表格里的padding */
::v-deep .el-table .cell,
.el-table th div {
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
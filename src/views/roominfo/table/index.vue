<template>
  <div class="box6">
    <div class="title">
      <p>设备异常报告</p>
    </div>
    <div class="table">
      <div class="productProcess">

        <!-- 如果页面刷新数据比较频繁，可以将loading、showFlag的相关代码删除，防止过于频繁的出现加载动画 -->
        <div class="loading_div" v-show="!showFlag">
          <div>Loading...</div> <!-- 这个loading自己写，代码没贴出来 -->
        </div>

        <div class="success_info_body" v-show="showFlag">

          <!-- 标准title可以调用组件 -->
          <div class="title_div">
            <!--  <titleComponent :title="title"></titleComponent> --> <!-- 标题组件自己写，代码没贴出来 -->
          </div>

          <!-- 参数名称、列数根据实际情况调整 -->
          <div class="table_body">
            <div class="table_th">
              <div class="tr1 th_style" style="margin-left:30px;">时间</div>
              <div class="tr2 th_style" style="margin-left:30px;">房间</div>
              <div class="tr3 th_style">设备类型</div>
              <!-- <div class="tr4 th_style">进度</div> -->
            </div>
            <div class="table_main_body">
              <div class="table_inner_body" :style="{ top: tableTop + 'px' }">
                <div class="table_tr" v-for="(item, index) in tableList" :key="index">
                  <div class="tr3 tr" v-if="item.startDate != '-'">{{ item.startDate }} </div>
                  <div class="tr3 tr" v-else>-</div>
                  <div class="tr1 tr">{{ item.planNo }}</div>
                  <div class="tr2 tr">{{ item.type }}</div>
                  <!-- <div class="tr4 tr" v-if="item.process != '-'">{{ Number(item.process).toFixed(2) }} %</div>
                    <div class="tr4 tr" v-else>-</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // components: {
  //     titleComponent
  // },
  data() {
    return {
      showFlag: true,
      tableTimer: null,
      tableTop: 0,
      tableList: [],
      /* tableList 参考格式
        [{
          "process":0.0000,
          "planNo":"BP2022060701",
          "endDate":"2022-06-07",
          "type":"砌块",
          "startDate":"2022-06-07"
        },
        {
          "process":0.0000,
          "planNo":"WP2022061301",
          "endDate":"2022-06-13",
          "type":"墙板",
          "startDate":"2022-06-13"
        }]
      */
      tableListSize: 0,
      componentTimer: null,

      //需要根据情况设置的参数
      title: "排产进度",
      visibleSize: 6, //容器内可视最大完整行数
      lineHeight: 49, //每行的实际高度（包含margin-top/bottom,border等）
      componentTimerInterval: 3600000, //刷新数据的时间间隔
      tableTimerInterval: 100 //向上滚动 1px 所需要的时间，越小越快，推荐值 100
    };
  },

  //如果没有父元素传值，将watch内的内容搬至mounted中即可
  props: ["activeFactoryId"],
  watch: {
    activeFactoryId(val, oldVal) {
      clearInterval(this.componentTimer);
      this.bsGetProductProcess();
      this.componentTimerFun();
    }
  },
  mounted() {
    this.bsGetProductProcess();
  },
  beforeDestroy() {
    clearInterval(this.componentTimer);
    clearInterval(this.tableTimer);
  },
  methods: {
    //调用数据接口，获取列表数据，根据自己情况填接口url
    bsGetProductProcess() {
      this.tableList = [{
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      },
      {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      },
      {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      }, {
        process: 0.0000,
        planNo: " 1F W5101",
        endDate: "2022-06-07",
        type: "分体式壁挂",
        startDate: "2022-06-07 14:05"
      },
      ];
      this.showFlag = true;
      this.tableActionFun();
    },
    tableActionFun() {
      this.tableListSize = this.tableList.length;
      if (this.tableListSize > this.visibleSize) {
        this.tableList = this.tableList.concat(this.tableList);
        this.tableTimerFun();
      } else {
        this.fillTableList();
      }
    },
    //当数据过少时，不触发自动轮播事件，并填充没有数据的行，参数根据实际情况修改即可
    fillTableList() {
      var addLength = this.visibleSize - this.tableListSize;
      for (var i = 0; i < addLength; i++) {
        this.tableList.push({
          planNo: "-",
          type: "-",
          startDate: "-",
          endDate: "-",
          process: "-"
        });
      }
    },
    tableTimerFun() {
      var count = 0;
      this.tableTimer = setInterval(() => {
        if (count < (this.tableList.length / 2) * this.lineHeight) {
          this.tableTop -= 1;
          count++;
        } else {
          count = 0;
          this.tableTop = 0;
        }
      }, this.tableTimerInterval);
    },
    componentTimerFun() {
      this.componentTimer = setInterval(() => {
        this.bsGetProductProcess();
      }, this.componentTimerInterval);
    }
  }
};
</script>

<style scoped lang='scss'>
.box6 {
  width: 100%;
  height: 100%;
  background: url(@/views/screen/images/Group11.png) no-repeat;
  background-size: 100% 100%;
  // margin: 20px 0px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  .title {
    flex: 0.9;
    // margin-left: 150px;
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: #1580dc;
    background: url(@/views/screen/images/Group17.png) no-repeat center;
    // align-items: flex-end;

    img {
      height: 20px;
      width: auto;
    }

    p {
      margin-top: 20px;
      letter-spacing: 10px;
      color: #fafafa;
      font-size: 26px;
      margin-inline: 5px;
      font-weight: 500;
      text-shadow: 0 0 10px rgb(158, 209, 227), 0 0 20px rgb(158, 204, 220), 0 0 30px rgb(133, 178, 193), 0 0 40px rgb(119, 187, 214), 0 0 50px rgb(120, 193, 222), 0 0 60px rgb(105, 174, 201);
    }
  }

  .table {
    flex: 5;
    padding: 5px;

    // background-color: red;
    .productProcess {
      width: 490px;
      height: 345px;
      // background-color: blue;
    }

    .loading_div {
      color: #eee;
      padding-top: 100px;
    }

    .title_div {
      width: 100%;
    }

    .table_body {
      width: 100%;

    }

    .table_th {
      width: 100%;
      display: flex;
      height: 45px;
      background: rgba(8, 144, 165, 0.1);
      /* background-color: red; */
    }


    .tr {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      box-sizing: border-box;
      text-align: center;
      font-size: 15px;
      margin-top: 6px;
    }

    .tr1 {
      width: 18%;
    }

    .tr2 {
      width: 37%;
    }

    .tr3 {
      width: 45%;
      font-size: 15px;
    }

    .tr4 {
      flex: 1;
    }

    .th_style {
      margin-top: 8px;
      color: #33cccc;
      /* font-weight: bold; */
      font-size: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      box-sizing: border-box;
      padding: 0 5px;
      text-align: center;
    }

    .table_main_body {
      width: 100%;
      height: 290px;
      overflow: hidden;
      position: relative;
    }

    .table_inner_body {
      width: 100%;
      position: absolute;
      left: 0;
    }

    .table_tr {
      display: flex;
      height: 30px;
      color: #eee;
      font-size: 11px;
      background: rgba(3, 145, 167, 0.1);
      border: 1px solid rgb(4, 114, 131);
      margin-top: 4px;
    }
  }
}
</style>
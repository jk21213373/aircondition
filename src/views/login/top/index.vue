<template>
    <div class="top">
        <div class="left">
        </div>
        <div class="center">
            <div class="title">全息低碳空调管控云服务平台</div>
        </div>
        <div class="right">
            <!-- <span class="rbtn">统计报告</span> -->
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.top {
    width: 100%;
    height: 30px;
    display: flex;

    .left {
        flex: 1.5;
        background: url(@/views/screen/images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;

        // .lbtn {
        //     width: 150px;
        //     height: 40px;
        //     float: right;
        //     background: url(@/views/screen/images/dataScreen-header-btn-bg-l.png) no-repeat;
        //     background-size: 100% 100%;
        //     text-align: center;
        //     line-height: 40px;
        //     color: #29fcff;
        //     font-size: 20px;
        //     cursor: pointer;
        // }
    }

    .center {
        flex: 2;

        .title {
            width: 100%;
            height: 54px;
            background: url(@/views/screen/images/dataScreen-header-center-bg.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 54px;
            color: #29fcff;
            font-size: 23px;
        }
    }

    .right {
        flex: 1.5;
        background: url(@/views/screen/images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;
        display: flex;
        justify-content: space-between;
        align-items: center;

        // .rbtn {
        //     width: 150px;
        //     height: 40px;
        //     background: url(@/views/screen/images/dataScreen-header-btn-bg-r.png) no-repeat;
        //     background-size: 100% 100%;
        //     text-align: center;
        //     line-height: 40px;
        //     color: #29fcff;
        //     cursor: pointer;
        // }
    }
}
</style>
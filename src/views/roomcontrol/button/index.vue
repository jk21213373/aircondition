<template>
    <div class="example-basic">
        <el-time-picker format='HH:mm' value-format='HH:mm' popper-class="elDatePicker" v-model="value2" arrow-control
            ref="aaa" />
        <el-button @click='ttt'>{{ value2 + 'AM' }}</el-button>
    </div>
</template>
<script lang="ts" setup>


import { ref } from 'vue'
import useRoomTime from '@/store/modules/roomcontrol.ts'
let useRoomtime = useRoomTime();
let value2 = ref("9:00")
let aaa = ref();
const ttt = () => {
    aaa.value.focus();
}
import { defineProps } from 'vue';
const props = defineProps({
    message: Number
});
</script>

<style>
.example-basic .el-date-editor {
    display: none;
}

.example-basic .el-date-editor {
    display: none;
}

.elDatePicker.elDatePicker {
    background-color: transparent;
    display: flex;
    width: 100px;
    justify-content: center;

    /* .el-time-spinner__wrapper {
      width: 30px;
      height: 200px;
    } */
    .el-time-spinner__item {
        font-size: 10px;
        color: aliceblue;
    }

}
</style>
<template>
    <div class="example-basic">
        <el-time-picker :editable="false" format='HH:mm' value-format='HH:mm' popper-class="elDatePicker"
            v-model="roomControlTime.Times[flag][message]" arrow-control ref="reffocus">
        </el-time-picker>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import useRoomControlTime from '@/store/modules/roomcontrol'
let roomControlTime = useRoomControlTime();
let reffocus = ref();
const props = defineProps({
    message: {
        type: Number,
        required: true // Ensure message is always passed
    },
    flag: {
        type: Number,
        required: true // Ensure message is always passed
    }
});
</script>
<style>
.example-basic {
    /* margin-left: 50px; */
    height: 30px;
    width: 90px;
    /* 相对父元素定位 */
    position: absolute;
    /* margin-right: 50px; */
    /* background-color: brown; */
}

.example-basic .el-date-editor {
    /* position: absolute; */
    height: 30px;
    width: 90px;
    opacity: 0;
    /* visibility: hidden; */
}

.elDatePicker.elDatePicker {
    background-color: transparent;
    display: flex;
    width: 100px;
    justify-content: center;
    border: none;

    .el-time-spinner__item {
        font-size: 10px;
        color: rgb(43, 225, 225);
    }

    .el-time-panel__footer {
        display: none;
    }
}
</style>

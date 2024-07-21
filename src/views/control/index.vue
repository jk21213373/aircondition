<template>
    <div>test</div>
    <!-- <child @myClick="onMyClick"></child> -->
</template>
<script setup>
const onMyClick = (msg) => {
    console.log(msg) // 这是父组件收到的信息
}
</script>
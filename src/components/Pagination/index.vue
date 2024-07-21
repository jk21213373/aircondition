<template>
  <div>
    <svg :style="{ width, height }">
      <!-- x1ink:href执行用哪个图标，属性值务必#icon图标名字 -->
      <!--use标签fill属性可以设置图标的颜色~ -->
      <use :xlink :href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup>
defineProps({
  prefix: {
    type: String,
    default: "#icon-",
  },
  //提供使用的图标名字
  name: String,
  //接受父组件传递颜色
  color: {
    type: String,
    default: " ",
  },
  //接受父组件传递过来的图标的宽度
  width: {
    type: String,
    default: "16px",
  },
  height: {
    type: String,
    default: "16px",
  },
});
</script>

<style scoped></style>

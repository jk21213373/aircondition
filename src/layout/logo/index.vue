<template>
    <div class="logo" v-if="setting.logoHidden">
        <img :src="setting.logo" alt=" ">
        <p>{{ setting.title }}</p>
    </div>
</template>

<script setup lang='ts'>
import setting from '@/setting';
</script>

<style scoped lang='scss'>
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    color: white;
    display: flex;
    align-items: center;
    padding: 10px;

    img {
        width: 40px;
        height: 40px;
    }

    p {
        position: relative;
        color: transparent;
        font-style: italic;
        font-weight: 900;
        letter-spacing: 0.25vw;
        background: linear-gradient(183deg, #FFf 35%, #5bbaf6);
        background-clip: text;
        -webkit-background-clip: text;
        font-size: $base-logo-title-fontSize;
        margin-left: 10px;
    }
}
</style>

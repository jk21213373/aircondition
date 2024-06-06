<<<<<<< HEAD
<template>
    <div class="school" @click="roominfo">
        <img class="img" src="../../images/school.png" />
    </div>
</template>

<script setup lang='ts'>
import { useRouter, useRoute } from 'vue-router';
let $router = useRouter();
const roominfo = () => {
    $router.push('/roomcontrol');
}
</script>

<style scoped lang='scss'>
.school {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;

    .img {
        max-width: 95%;
        height: auto;
    }
}
</style>
=======
<template>
    <div class="school" @click="roominfo">
        <img class="img" src="../../images/school.png" />
    </div>
</template>

<script setup lang='ts'>
import { useRouter, useRoute } from 'vue-router';
let $router = useRouter();
const roominfo = () => {
    $router.push('/roomcontrol');
}
</script>

<style scoped lang='scss'>
.school {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;

    .img {
        max-width: 95%;
        height: auto;
    }
}
</style>
>>>>>>> new commit

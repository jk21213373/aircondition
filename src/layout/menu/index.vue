<template>
    <template v-for="(item, index) in menuList" :key="item.path">
        <template v-if="!item.children">
            <el-menu-item v-if="!item.meta.hidden && item.meta.type?.includes(useStore.type)" :index="item.path"
                @click="goRoute" class="temp">
                <button>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </button>
            </el-menu-item>
        </template>
        <template v-else v-for="(it, index) in item.children" :key="item.children.path">
            <el-menu-item v-if="!it.meta.hidden && it.meta.type?.includes(useStore.type)" :index="it.path"
                @click="goRoute" class="temp">
                <button>
                    <el-icon>
                        <component :is="it.meta.icon"></component>
                    </el-icon>
                    <span>{{ it.meta.title }}</span>
                </button>
            </el-menu-item>
        </template>
        <!-- <template v-else>
            <el-sub-menu :index="item.path">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
                <Menu :menuList="item.children"></Menu>
            </el-sub-menu>
        </template> -->
    </template>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';
let useStore = useUserStore();
defineProps(['menuList'])
let $router = useRouter();
const goRoute = (vc: any) => {
    $router.push(vc.index)
    //console.log(vc.index);
}
</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>
<style scoped lang='scss'>
button {
    display: flex;
    align-items: center;
    font-family: inherit;
    cursor: pointer;
    font-weight: 500;
    font-size: 15px;
    padding: 0.8em 2.7em 0.8em 0.9em;
    color: white;
    background: #ad5389;
    background: linear-gradient(to right, #141c42, #192b56, #17254a);
    border: none;
    letter-spacing: 0.05em;
    border-radius: 16px;
    margin: 0.9em;

}

.temp {
    margin: 0.7em;
}

button span {
    transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
}

button:hover svg {
    transform: translateX(5px) rotate(90deg);
}

button:hover span {
    transform: translateX(7px);
}
</style>

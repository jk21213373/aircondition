<template>
    <el-tree style="max-width: 600px" :data="data" :props="defaultProps" @node-click="handleNodeClick" />
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from 'vue';
import { reqNodeInfo } from '@/api/equipment/index.ts';
import { ElNotification } from 'element-plus';
import useLayOutSettingStore from '@/store/modules/setting';
let settingStore = useLayOutSettingStore();
interface Tree {
    label: string
    children?: Tree[]
}
let data = ref<Tree[]>();
const handleNodeClick = (data: Tree) => {
    console.log(data)
}
onMounted(() => {
    getHasUser();
})
const getHasUser = async () => {
    let result = await reqNodeInfo();
    data = result;
}

//     {
//         楼层名: ' ',
//         children: [
//             {
//                 房间名: ' ',
//                 children: [
//                     {
//                         节点id: ' ',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         label: 'Level one 2',
//         children: [
//             {
//                 label: 'Level two 2-1',
//                 children: [
//                     {
//                         label: 'Level three 2-1-1',
//                     },
//                 ],
//             },
//             {
//                 label: 'Level two 2-2',
//                 children: [
//                     {
//                         label: 'Level three 2-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         label: 'Level one 3',
//         children: [
//             {
//                 label: 'Level two 3-1',
//                 children: [
//                     {
//                         label: 'Level three 3-1-1',
//                     },
//                 ],
//             },
//             {
//                 label: 'Level two 3-2',
//                 children: [
//                     {
//                         label: 'Level three 3-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
// ]

const defaultProps = {
    children: 'children',
    label: 'label',
}
</script>
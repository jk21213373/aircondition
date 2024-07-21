// interface node{
//     pid: number,
//     temperature: string,
//     mode: string,
//     children: [],
// }
// export function transListToTreeData(list: node[], rootValue: number) {
//     const arr = []
//     list.forEach(item => {
//         if (item.pid === rootValue) {
//             //找到了匹配的节点
//             arr.push(item);
//             //当前节点的id和当前节点的子节点的pid是想等的
//             const children = transListToTreeData(list, item.id);
//             item.children = children//将子节点赋值给当前节点
//         })
//     return arr
// }
import { defineStore } from 'pinia'
interface roomnode {
    name: string,
    tem: number,
    time: string,
    state: boolean,
    floor: string,
}
let useRoomInfoTime = defineStore('useRoomInfoTime', {
    state: () => {
        return {
            Times: [['19:00', '9:00', '9:00', '9:00'], ['9:00', '9:00', '9:00', '9:00']],
            DisplayRooms: {} as roomnode,
        }
    },
})
export default useRoomInfoTime


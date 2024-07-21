import { defineStore } from 'pinia'

interface roomnode {
    id: string,
    name: string,
    tem: string,
    time: string,
    state: string,
    floor: string,
}
let useRoomControl = defineStore('useRoomControl', {
    state: () => {
        return {
            Times: [['19:00', '9:00', '9:00', '9:00'], ['9:00', '9:00', '9:00', '9:00']],
            Rooms: [] as roomnode[],
            DisplayRooms: [] as roomnode[],
        }
    },
})
export default useRoomControl

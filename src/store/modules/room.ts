import { defineStore } from 'pinia'

let useLayOutRoomStore = defineStore('useLayOutRoomStore', {
    state: () => {
        return {
            storeyRoomID: '',
            roomID: '',
        }
    },
})

export default useLayOutRoomStore

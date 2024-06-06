import { defineStore } from 'pinia'

let useLayOutRoomStore = defineStore('SettingStore', {
    state: () => {
        return {
            storeyRoomID: '',
        }
    },
})

export default useLayOutRoomStore

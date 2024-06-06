import { defineStore } from 'pinia'

let useRoomTime = defineStore('SettingStore', {
    state: () => {
        return {
            Times: ['9:00', '9:00', '9:00', '9:00']
        }
    },
})

export default useRoomTime

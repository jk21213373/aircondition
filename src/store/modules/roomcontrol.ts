import { defineStore } from 'pinia'

let useRoomTime = defineStore('SettingStore', {
    state: () => {
        return {
            Times: ['9:00', '9:00', '9:00', '9:00'],
            key: '0',
        }
    },
})

export default useRoomTime

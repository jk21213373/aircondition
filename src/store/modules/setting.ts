import { defineStore } from 'pinia'

let useLayOutSettingStore = defineStore('SettingStore', {
    state: () => {
        return {
            fold: false,
            refsh: false,
            generalControl: '',
        }
    },
})

export default useLayOutSettingStore

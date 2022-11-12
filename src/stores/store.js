import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => {
    return {
      photo_data: "",
      art_data: ""
    }
  },
})
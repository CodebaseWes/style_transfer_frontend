import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => {
    return {
      host : window.location.origin + (process.env.NODE_ENV == 'development' ? '/public' : '')
    }
  },
})
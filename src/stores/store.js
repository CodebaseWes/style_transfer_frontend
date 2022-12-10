import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => {
    return {
      host : window.location.origin + (process.env.NODE_ENV == 'development' ? '/public' : ''),
      pageVisited : false,
      contentDOMID : "Content",
      masterpiece: "",
      wasPhotoUploadSelected : null,
      wasArtUploadSelected : null,
      pingFinished :  true,
      apiURL: "https://3fzpvqbixa.execute-api.us-east-1.amazonaws.com/prod/style_transfer",
      photo_data: "",
      art_data: "",
    }
  },
})
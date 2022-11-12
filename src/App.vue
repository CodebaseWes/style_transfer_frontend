<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ChooseImage from './components/ChooseImage.vue'
import { useStore } from './stores/store'
</script>

<template>
  <RouterView />
  <footer>
    <div id="privacy">
      <button class="meh_button" @click="$router.push('privacy')">Privacy Policy</button>
    </div>
    <div id="linkedin">
      <a href="https://www.linkedin.com/in/wesley-f-6379251b7" target="_blank">
        <img width=70 :src="useStore().host+'/icons/linkedin_icon.png'" />
      </a>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {
  }
}
</script>
<style scoped>

  #linkedin {
    position: fixed;
    right: 5px;
    bottom : 0%;
  }

  #privacy {
    position: fixed;
    left: 0%;
    bottom: 0%;
    padding:5px;
  }

  #privacy button {
    font-size: 12px;
  }
</style>

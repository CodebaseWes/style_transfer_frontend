<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useStore } from './stores/store'
</script>

<template>
  <div id="Content">
    <RouterView />
  </div>
  <footer>
    <div id="privacy">
      <button class="meh_button" @click="$router.push('/privacy')">Privacy Policy</button>
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
    return {
      contentID : "Content",
      store: useStore()
    }
  },
  created() {
    /* If user reloads the page, the Vue store state is lost. Therefore, lets
    redirect the user to the home page
    */
    if (this.store.pageVisited == false && this.$route.name != "Index") {
      this.$router.push("/")
    }
  }, 
}
</script>
<style scoped>

  #Content {
    height: 100%;
  }

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

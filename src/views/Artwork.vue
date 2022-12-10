<script setup>
  import { useStore } from '../stores/store'
</script>
<template>
    <div v-if="error">
        <h1>Error</h1>
        <h3>Something went wrong. Choose a different photo and/or artwork and try again.</h3>      
    </div>
    <div :style="error ? 'display:none' : ''">
        <h1>Style Transfer Complete</h1>
        <canvas ref="canvas" width="256" height="256"></canvas>
    </div>
    <div class="button_margin">
        <button @click="$router.push('/selection/photo')" class="cool_button" >&laquo; Change Photo</button>  
    </div>
    <div class="button_margin">
        <button @click="$router.push('/selection/art')" class="cool_button">&laquo; Change Artwork</button>
    </div>
</template>
<script>
export default {
    name : "Artwork",
    props: ["error"],
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() {
        if (this.error) {
            return
        }

        let canvas = this.$refs.canvas
        const ctx = canvas.getContext('2d')

        var image = new Image()
        image.crossOrigin = 'Anonymous';
        image.onload = () => {
            ctx.drawImage(image, 0, 0)
        }
        image.src ="data:image/jpeg;base64, " + useStore().masterpiece

    }
}
</script>
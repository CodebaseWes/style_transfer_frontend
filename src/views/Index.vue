<script setup>
  import { useStore } from '../stores/store'
</script>
<template>
    <h1>Welcome to RoboArtist!</h1>
    <h3>On this site, you can transform photographs into works of art.</h3>
    <div id="get_started_container">
      <button
        @click="goToSelection()"
        class="cool_button"  
      >Get Started</button>
    </div>
    <div class="example_container">
      <div class="example" :style="slide1_style">
        <h2>Upload a Photo</h2>
        <img :src="useStore().host + '/examples/example_photo.jpg'" />
        <h2>Or Select one from the Archive</h2>
      </div>

      <div class="example" :style="slide2_style">
        <h2>Upload an Artwork</h2>
        <img :src="useStore().host + '/examples/example_painting.jpg'" />
        <h2>Or Select a Monet Painting from the Archive</h2>
      </div>

      <div class="example" id="example_fake" :style="slide3_style">
        <h2>The Style from the Artwork...</h2>
        <img :src="useStore().host + '/examples/example_fake_painting.jpg'" />
        <h2> ...will be Transferred to the Photo</h2>
      </div>
    </div>

  </template>
<script>
export default {
    name : "Index",
    data() {
        return {
            slide1_style: {opacity : 1},
            slide2_style: {opacity : 0},
            slide3_style : {opacity : 0},
            animTime : 8000,
            active : true,
            store : this.useStore
        }
    },
    methods: {
        goToSelection() {
            this.ping()
            this.$router.push("/selection/photo")
        },
        /*Deep learning models are notoriously slow, especially if they do not 
        have GPU hardware on which to run. The Lambda function on the back-end takes 
        a while to get initialized, but is reasonably fast once dependencies have been cached.
        This function pings the API to wake up while the web user is choosing images to upload. 
        I could have used Lambda Provisioned concurrency for this, but I don't want to pay $11 */
        async ping() {
            try {
                let response = await fetch(this.store.apiURL, {
                    method : "POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({})
                });
            } finally {
                this.store.pingFinished = true        
            }

        },

    },
    /* When the DOM has rendered, start up a slideshow animation.*/
    mounted() {
        this.store.pingFinished = false //reset the ping flag
        this.store.pageVisited = true //this helps with redirect on page refresh


        let slide1_inc = -0.01
        let slide2_inc = 0
        let slide3_inc = 0

        const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));
        const round_hund = num => Math.round(num * 100) / 100;

        (async () => {
            /* While on this page, show the animation*/
            while (this.active) {
                this.slide1_style.opacity = round_hund(this.slide1_style.opacity + slide1_inc)
                this.slide2_style.opacity =  round_hund(this.slide2_style.opacity + slide2_inc)
                this.slide3_style.opacity = round_hund(this.slide3_style.opacity + slide3_inc)

                if (this.slide1_style.opacity == 1) slide1_inc = -0.01;

                if (this.slide2_style.opacity == 1) slide2_inc = -0.01;

                if (this.slide3_style.opacity == 1) slide3_inc = -0.01;

                if (this.slide1_style.opacity == 0 && 
                this.slide2_style.opacity == 0 && 
                this.slide3_style.opacity == 0) {
                
                    if (slide1_inc == -0.01) {
                        slide1_inc = 0
                        slide2_inc = 0.01
                    }

                    if (slide2_inc == -0.01) {
                        slide2_inc = 0
                        slide3_inc = 0.01
                    }

                    if (slide3_inc == -0.01) {
                        slide3_inc = 0
                        slide1_inc = 0.01
                    }
                }

                await waitFor(this.animTime / 300)
            }
        })()
    },
    unmounted() {
        //Stop the animation when the user leaves the page
        this.active = false
    }
}
</script>
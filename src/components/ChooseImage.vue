<script setup>
defineProps({
  image_path: {
    type: String,
    required: true
  },
  max_image_size: {
    type: Number,
    required: true
  }, 
  images: {
    type: Array,
    required: true
  },
  image_data : {
    type: String,
    required: true
  }
})
</script>

<template>
      <h2>Select An Image</h2>
      <canvas :id="image_path" width="256" height="256"></canvas>
      <div v-if="selectFromGallery" class="buttons_container">
        <button @click="prev()"  class="meh_button" style="float:left">&laquo; Prev</button>
        <button @click="next()"  class="meh_button" style="float:right">Next &raquo;</button>
      </div>
      <div v-else>
        <input type="file" @change="selectFromGallery=false;editImage($event)" />
      </div>

      <div class="options_separator">
        <span>OR</span><div></div>
      </div>

      <div class="buttons_container" style="clear:left">
        <button v-if="selectFromGallery"
          @click="selectFromGallery=false; clearCanvas()"
          class="meh_button"
        >Upload Your Own!</button>
        <button v-else 
          @click="selectFromGallery=true; populateWithIndex()"
          class="meh_button"
        >Select From Gallery</button>
      </div>
</template>
<script>
export default {
  name: 'ChooseImage',
  data() {
    return {
      image_index : Math.floor(Math.random() * this.images.length),
      selectFromGallery : true
    }
  },
  methods : {
    editImage(event) {
      let file = event.target.files[0];      
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        this.populate(reader.result)
      }
    },
    next() {
      this.image_index = (this.image_index + 1) % this.images.length
      this.populateWithIndex()
    },
    prev() {
      this.image_index = (this.image_index - 1 + this.images.length) % this.images.length
      this.populateWithIndex()
    },
    populate(src) {
      let canvas = document.getElementById(this.image_path)
      let ctx = canvas.getContext('2d')

      var image = new Image()
      image.src = src
      image.onload = () => {
        ctx.drawImage(image, 0, 0, 256, 256)
        
        let result = canvas.toDataURL("image/jpeg")

        let quality = Math.min(1, this.max_image_size/result.length)
        while (result.length > this.max_image_size) {
          quality *= 0.99
          result = canvas.toDataURL("image/jpeg", quality)
        }

        result = result.replace("data:image/jpeg;base64,", "");
        this.$emit('update:image_data', result)
      }
    },
    populateWithIndex() {
      this.populate(this.image_path + this.images[this.image_index])
    },
    clearCanvas() {
      let canvas = document.getElementById(this.image_path)
      let ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.$emit('update:image_data', '')
    }
  },

  mounted() {
    this.populateWithIndex()
  }
}
</script>
<style scoped>
    .buttons_container {
      margin: 10px;
    }
    

    .options_separator {
      margin-top: 5%;
    }
    .options_separator div{
      margin-top: 10px;
      margin-bottom: 30px;
      background: linear-gradient(to right,black, black, rgba(255, 255, 0, 0),rgba(255, 255, 0, 0), black, black);
      height: 3px;
    }
    .options_separator span {
      position: relative;
      top: 28px;
      font-size: 30px;
      padding-left: 20px;
      padding-right:20px;
    }


</style>

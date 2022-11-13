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
  },
  Message : {
    type: String,
    required: true
  }
})
</script>

<template>
    <h1>{{Message}}</h1>
    <div :style="selectFromGallery != null ? '' : 'display:none'">      
      <div>
        <div v-if="selectFromGallery" class="galleryPrevNext">
          <button @click="prev()"  class="meh_button" style="float:left">&laquo; Prev</button>
          <button @click="next()"  class="meh_button" style="float:right">Next &raquo;</button>
        </div>
        <canvas :id="image_path" width="256" height="256" style="clear:both" @click="chooseImage()"></canvas>
        <div class="file_input_container" :style="selectFromGallery == true ? 'display:none' : ''">
          <input :id="image_path + 'upload'" type="file" @change="uploadImage()" />
        </div>
      </div>
      <div class="button_margin" v-if="data != ''">
        <button class="cool_button" @click="chooseImage()">Choose this Image</button>
      </div>
      <div class="button_margin">
        <button 
          v-if="selectFromGallery == false" 
          class="meh_button" 
          @click="populateWithIndex()">Select from Gallery</button>
        <button 
          v-else 
          class="meh_button" 
          @click="clearCanvas()">Upload your Own</button>
      </div>
    </div>
      

    <div class="chooseOption" v-if="selectFromGallery == null">
      <button
          @click="populateWithIndex()"
          class="cool_button"
        >Select From Gallery</button>

      <div style="height:74px">
        <div class="options_separator">
          <span>OR</span><div></div>
        </div>
      </div>

      <button
          @click="clearCanvas()"
          class="cool_button"
        >Upload Your Own!</button>
    </div>
      
</template>
<script>
export default {
  name: 'ChooseImage',
  data() {
    return {
      image_index : Math.floor(Math.random() * this.images.length),
      selectFromGallery : null,
      data : ""
    }
  },
  methods : {
    uploadImage() {
      let elem = document.getElementById(this.image_path + "upload")
      
      if (elem.files.length == 0) {
        return
      } 
      let file = elem.files[0]
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
        this.data = result
      }
    },
    populateWithIndex() {
      this.selectFromGallery = true
      this.populate(this.image_path + this.images[this.image_index])
    },
    clearCanvas() {
      this.selectFromGallery=false;
      let canvas = document.getElementById(this.image_path)
      let ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.uploadImage()
    }, 
    chooseImage() {
      this.$emit('update:image_data', this.data)
    }
  },

  mounted() {
  }
}
</script>
<style scoped>

    .chooseOption {
      margin-top: 30%;
    }

    .buttons_container {
      margin: 10px;
    }

    .options_separator div{
      background: linear-gradient(to right,black, black, rgba(255, 255, 0, 0),rgba(255, 255, 0, 0), black, black);
      height: 3px;
    }
    .options_separator span {
      position: relative;
      top: 21px;
      font-size: 30px;
      padding-left: 20px;
      padding-right:20px;
    }

    .galleryPrevNext {
      width: 256px;
      margin:auto;
    }

    .file_input_container {
      background-color: #111;
      padding: 10px;
      border-radius: 10px;
      width: 256px;
      margin: auto;
    }


</style>

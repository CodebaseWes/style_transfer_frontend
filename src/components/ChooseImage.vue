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
  fromGallery: {
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
        <canvas ref="canvas" width="256" height="256" style="clear:both"></canvas>
        <div class="file_input_container" :style="selectFromGallery == true ? 'display:none' : ''">
          <input ref="upload" type="file" @change="uploadImage()" />
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
  emits : ["selectionUpdate", "image_chosen"],
  data() {
    return {
      image_index : Math.floor(Math.random() * this.images.length),
      data : this.image_data,
      selectFromGallery : this.fromGallery
    }
  },
  methods : {
    uploadImage() {
      let elem = this.$refs.upload
      
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
    /* Given a web url or a data url, draw the image to a canvas */
    populate(src) {
      let canvas = this.$refs.canvas
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
    /* Draw the image that the user has selected from the gallery */
    populateWithIndex() {
      this.selectFromGallery = true
      this.$emit("selectionUpdate", this.selectFromGallery)
      this.populate(this.image_path + this.images[this.image_index])
    },
    clearCanvas() {
      this.selectFromGallery=false;
      /*Reset the data variable. This prevents the user from continuing with a blank image.
      If an image is not uploaded, the parent should have a copy of the last chosen image 
      and will use that one*/
      this.data = "";

      this.$emit("selectionUpdate", this.selectFromGallery)
      let canvas = this.$refs.canvas
      let ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.uploadImage()
    }, 
    /*Tell the parent that a user has chosen an image */
    chooseImage() {
      this.$emit('image_chosen', this.data)
    }
  },
  mounted() {
    /* If an image has not been chosen/uploaded, make sure that
    to reset the the flag that tells the app which choice the user made (select from gallery or upload) */
    if (this.data == "") {
      this.selectFromGallery = null
      this.$emit("selectionUpdate", this.selectFromGallery)
      return
    }

    /*I the user had previously chosen an image, show it.
    The Vue app temporarily remembers what images users had chosen/uploaded. */
    let canvas = this.$refs.canvas
    let ctx = canvas.getContext('2d')

    var image = new Image()
    image.onload = () => {
      ctx.drawImage(image, 0, 0, 256, 256)
    }
    image.src = "data:image/jpeg;base64," + this.data
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

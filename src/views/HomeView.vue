<script setup>
  import ChooseImage from '../components/ChooseImage.vue'
  import Loading from '../components/Loading.vue'

  import { useStore } from '../stores/store'

</script>
<template>
  <div :id="step != 3 ? 'HomeView' : 'LoadingBlur'">

    <div v-if="step == 0">

      <h1>Welcome to RoboArtist!</h1>
      <h3>On this site, you can transform photographs into works of art.</h3>
      <div id="get_started_container">
        <button
          @click="step=1; ping()"
          class="cool_button"  
        >Get Started</button>
      </div>
      <div class="example_container">
        <div class="example" id="example_photo" style="opacity:0">
          <h2>Upload a Photo</h2>
          <img :src="useStore().host + '/examples/example_photo.jpg'" />
          <h2>Or Select one from the Archive</h2>
        </div>

        <div class="example" id="example_art" style="opacity: 0;">
          <h2>Upload an Artwork</h2>
          <img :src="useStore().host + '/examples/example_painting.jpg'" />
          <h2>Or Select a Monet Painting from the Archive</h2>
        </div>

        <div class="example" id="example_fake" style="opacity:0">
          <h2>The Style from the Artwork...</h2>
          <img :src="useStore().host + '/examples/example_fake_painting.jpg'" />
          <h2> ...will be Transferred to the Photo</h2>
        </div>
      </div>

    </div>

    <div :style="step == 1 ? '' : 'display: none'">
      <ChooseImage 
      Message="Select/Upload Photo"
      :images="photos" 
      :image_path="photo_path" 
      :max_image_size="max_image_size" 
      v-bind:image_data="photo_data"
      v-on:update:image_data="photo_data = $event; nextStep();"></ChooseImage>
    </div>


    <div :style="step == 2 ? '' : 'display: none'">
      <ChooseImage 
      Message = "Select/Upload Artwork"
      :images="paintings" 
      :image_path="art_path" 
      :max_image_size="max_image_size" 
      v-bind:image_data="art_data"
      v-on:update:image_data="art_data = $event; nextStep();"></ChooseImage>
    
    </div>


    <div v-if="step == 3">
      <Loading></Loading>
    </div>


    <div :style="step == 4 ? '' : 'display: none'">
      <div v-if="error">
        <h1>Error</h1>
        <h3>Something went wrong. Choose a different photo and/or artwork and try again.</h3>      
      </div>
      <div :style="error ? 'display:none' : ''">
        <h1>Style Transfer Complete</h1>
        <canvas id="canvas" width="256" height="256"></canvas>
      </div>
      <div class="button_margin">
        <button @click="step = 1" class="cool_button" >&laquo; Change Photo</button>  
      </div>
      <div class="button_margin">
        <button @click="step = 2" class="cool_button">&laquo; Change Artwork</button>
      </div>
    </div>
  

  </div>

</template>
<script>
export default {
  name: 'HomeView',
  data() {
    return {
      step : 0,
      error : false,
      pingFinished : false,
      apiURL: "https://3fzpvqbixa.execute-api.us-east-1.amazonaws.com/prod/style_transfer",
      animTime : 10000,
      submittedBefore: false,
      max_image_size : 50000,
      photo_data: "",
      photo_path : "/photo_jpg/",
      photos : ['000ded5c41.jpg','00aeb60e25.jpg','00c6a0ad1e.jpg','00dcf0f1e3.jpg','00dff09ebe.jpg','00e1798585.jpg','00e64e1b2c.jpg','00f78547f0.jpg','00fcff630e.jpg','01ae8be57e.jpg','01af5f8623.jpg','01bce47d3f.jpg','01c4f86e3e.jpg','01f7a6398e.jpg','0a0c3a6d07.jpg','0a0d3e6ea7.jpg','0a1d1b9f8e.jpg','0a271892d0.jpg','0a284dbed0.jpg','0a2e5f728d.jpg','0a325fc655.jpg','0a44c8287d.jpg','0a49020ae5.jpg','0a497f768d.jpg','0a6091114d.jpg','0a6279ef66.jpg','0a6e92d928.jpg','0a74701f65.jpg','0a7a8e30bd.jpg','0a7b607c9c.jpg','0a8839fac9.jpg','0a996d988b.jpg','0aa4202c77.jpg','0aaf6960c4.jpg','0abbeddf71.jpg','0abbf2fd4b.jpg','0ac4b6aaaa.jpg','0ac84db7bc.jpg','0ad13029a9.jpg','0ad956708f.jpg','0ae5e9bfe2.jpg','0aec1f9701.jpg','0b0bf6fe85.jpg','0b1669c3ea.jpg','0b21ce3df6.jpg','0b2454f0e3.jpg','0b2f2a3e59.jpg','0b3fd12ac9.jpg','0b461ab035.jpg','0b48073b83.jpg','0b4dbff7c8.jpg','0b4f93c337.jpg','0b53fd3e90.jpg','0b68939003.jpg','0b6b4bfc29.jpg','0b91f359c5.jpg','0b97d70d93.jpg','0bb9d1a3cf.jpg','0bcecb1330.jpg','0bddd37684.jpg','0bde6ba99b.jpg','0bdf3110dc.jpg','0bede4ba4e.jpg','0c18bf8536.jpg','0c21bed0d8.jpg','0c272fcde8.jpg','0c4ebc7f6a.jpg','0c64451f58.jpg','0c64b00832.jpg','0c696d12a2.jpg','0c6b56bba9.jpg','0c6b63c2c5.jpg','0c6c9d8ce7.jpg','0c6e6b52be.jpg','0c6fcdf1f5.jpg','0c781e1538.jpg','0c7e07acd3.jpg','0c8a94c597.jpg','0ca5b3c96a.jpg','0cac1bcf2b.jpg','0cae98323f.jpg','0cb4144fbb.jpg','0cb6683555.jpg','0ccbcfcf65.jpg','0cda2627bf.jpg','0cdfbb28e6.jpg','0ce227ee32.jpg','0cec4d02a7.jpg','0cecce2e24.jpg','0cf495d82e.jpg','0cf4dc75d0.jpg','0cfe85f73d.jpg','0d11463712.jpg','0d1a5b6882.jpg','0d23431254.jpg','0d2583e3ea.jpg','0d2ed7fb8e.jpg','0d2f9d322d.jpg','0d3752b4ad.jpg','0d423f52fd.jpg','0d59054b30.jpg','0d593e3752.jpg','0d64ca5ecf.jpg','0d6ba5d215.jpg','0d6c81cbc2.jpg','0d6f893bc7.jpg','0d7c5d97ac.jpg','0d80b97eb4.jpg','0d859e1630.jpg','0d89393fe0.jpg','0d8c66b24e.jpg','0dd016afa5.jpg','0dd4041294.jpg','0dd5085fdf.jpg','0dde3f8ee7.jpg','0de8320918.jpg','0de920c5bf.jpg','0debce885b.jpg','0df35db4a2.jpg','0df9a45c26.jpg','0e003670f7.jpg','0e0577ec3a.jpg','0e0a660bb8.jpg','0e0bdef20a.jpg','0e1230a330.jpg','0e13d9c6f4.jpg','0e23057337.jpg','0e2610ef33.jpg','0e441b3c17.jpg','0e4c7d5e15.jpg','0e4ec46846.jpg','0e5afbada4.jpg','0e750aaed9.jpg','0e8eb4587e.jpg','0e95c87f76.jpg','0e983a3ef5.jpg','0eaa8d71f6.jpg','0eb3c8892a.jpg','0eb810429d.jpg','0eddbbb35c.jpg','0f1e6530bc.jpg','0f35be9cbb.jpg','0f3757e6cd.jpg','0f3ed210c0.jpg','0f5228f2a6.jpg','0f58899ce1.jpg','0f819ab838.jpg','0f8e316a87.jpg','0fa29829f2.jpg','0fa5629898.jpg','0fb1ca7fe1.jpg','0fbcbeddd5.jpg','0fca1c304e.jpg','0fccbd8558.jpg','0fd7cd6092.jpg','0fdcf56678.jpg','0fe76a9ec9.jpg','0fef77210a.jpg','1a23085db7.jpg','1a2542d28b.jpg','1a25f82753.jpg','1a27cb4cba.jpg','1a2cd9ea8c.jpg','1a3b1a3da9.jpg','1a4213d2ce.jpg','1a4491cef2.jpg','1a45b8c270.jpg','1a5041d9ed.jpg','1a5cf3b632.jpg','1a6013cba4.jpg','1a61870a06.jpg','1a6b4e9e13.jpg','1a7af9964c.jpg','1a8633fbb9.jpg','1a892680fb.jpg','1a8c1a7995.jpg','1a8c9e6c4c.jpg','1aa0d1c558.jpg','1aa8abd685.jpg','1ac1673452.jpg','1ac35e7dc8.jpg','1ac5876376.jpg','1acb4c14ce.jpg','1acb4d1d54.jpg','1ad17703ce.jpg','1ad8701262.jpg','1ae03b00e7.jpg','1ae342cd57.jpg','1b062b66a7.jpg','1b118a066b.jpg','1b129b65db.jpg','1b12cf626f.jpg','1b3e398db7.jpg','1b4e94ffbd.jpg','1b4f115bdd.jpg','1b5e8cedda.jpg','1b66416060.jpg','1b6a1a7e94.jpg','1b6d7b4e65.jpg','1b72549327.jpg','1b770229f3.jpg','1b961a3a39.jpg','1b98321823.jpg','1b987c577e.jpg','1baa6a3895.jpg','1baf74b1a7.jpg','1bb75f970a.jpg','1bb8674fbf.jpg','1bba0654b7.jpg','1bbaea3e6b.jpg','1bc105b0b9.jpg','1bc290729f.jpg','1bc9fc642d.jpg','1bccaf17e5.jpg','1bd527d6a0.jpg','1bd7be0503.jpg','1bd8b4f799.jpg','1be016515b.jpg','1be0fa86b5.jpg','1be6584349.jpg','1bf60182b2.jpg','1c0ea0fe1b.jpg','1c1f697d7e.jpg','1c3c1aca33.jpg','1c434baf43.jpg','1c4de511e1.jpg','1c5cc22c2c.jpg','1c5ce714cc.jpg','1c64f657f4.jpg','1c69470718.jpg','1c6eed59f5.jpg','1c707e6132.jpg','1c75256206.jpg','1c7b3cdedc.jpg','1c807fee79.jpg','1c84f1179c.jpg','1c863100b1.jpg','1c88080a3f.jpg','1c95a45486.jpg','1cb96210e6.jpg','1cb9d045d8.jpg','1cc26c48b8.jpg','1cd5acea15.jpg','1cdb990c46.jpg','1ce3cb350d.jpg','1cea1bf43d.jpg','1cf711c1d1.jpg','1cfe6aba33.jpg','1d0aecbd16.jpg','1d0f76765b.jpg','1d17249a0f.jpg','1d19c4bc7e.jpg','1d205c56c5.jpg','1d3446f22b.jpg','1d38a9bee0.jpg','1d3fb25bad.jpg','1d40d5d6ca.jpg','1d44f79c1c.jpg','1d46709e18.jpg','1d53ac5a9f.jpg','1d57118b49.jpg','1d584ad062.jpg','1d5aa09f6b.jpg','1d5c4b80c6.jpg','1d5cf63313.jpg','1d5d4a0729.jpg','1d640e96a3.jpg','1d67aef6c9.jpg','1d726a097f.jpg','1d76ab1c0c.jpg','1d79ab97ec.jpg','1d7d8ff0ac.jpg','1d8a6d18f1.jpg','1d939cb782.jpg','1d971deb73.jpg','1da3631b3f.jpg','1da538235f.jpg','1da6888f64.jpg','1dafe2cf42.jpg','1db0b33747.jpg','1dba9a48ae.jpg','1dbbe43952.jpg','1dc32da064.jpg','1dc335fcac.jpg','1dc3833078.jpg','1dc3a7de89.jpg','1dcbd84c73.jpg','1dd0ec3618.jpg','1dda02098b.jpg','1de54dbad6.jpg','1df4ff0436.jpg','1dfa5b2910.jpg','1dfe2f3b46.jpg','1e39d0e97c.jpg','1e3a931f96.jpg','1e4ccca31e.jpg','1e56d7de95.jpg','1e74d0da3b.jpg','1e7e4f894f.jpg','1e7ed16969.jpg',],
      art_data: "",
      art_path : "/monet_jpg/",
      paintings: ['000c1e3bff.jpg','011835cfbf.jpg','0260d15306.jpg','049e293b93.jpg','05144e306f.jpg','052a77c020.jpg','058f878b7c.jpg','05b493ff42.jpg','064487d630.jpg','066fe4cbaa.jpg','07fcaee35f.jpg','09b76b6471.jpg','0a5075d42a.jpg','0bd913dbc7.jpg','0e3b3292da.jpg','106757e5d8.jpg','1078363ff0.jpg','10c555c1b1.jpg','118da0690c.jpg','11ab570c5e.jpg','11be65b3e9.jpg','133b42e498.jpg','14162de938.jpg','14ff6e6a99.jpg','158740962c.jpg','16dabe418c.jpg','17557a29cb.jpg','1814cc6632.jpg','184d6c66cd.jpg','1994b8d4a2.jpg','19dc36ccb2.jpg','1a127acf4d.jpg','1e4e4e63c5.jpg','1f22663e72.jpg','1f9667f2a7.jpg','22b1ac6b44.jpg','23832dead5.jpg','23b07c3769.jpg','23d6aeb485.jpg','23f0fbd77e.jpg','24af733334.jpg','252d9a4abc.jpg','2581464ddc.jpg','25c9904782.jpg','26b66eb819.jpg','2759c1ed37.jpg','281b73fb5e.jpg','28deb43a71.jpg','295eb5c521.jpg','29696b4455.jpg','2acfbab228.jpg','2c00f5147f.jpg','2cca56415e.jpg','2e0d0e6e19.jpg','2f20944b6a.jpg','2f90c99e10.jpg','3283442e33.jpg','32cc820303.jpg','32e33792cc.jpg','3417ace946.jpg','344d1829bb.jpg','3545597386.jpg','369f6d07e8.jpg','3843e221cc.jpg','3b262c6726.jpg','3c341ff93e.jpg','3d13fe022e.jpg','3deea9f4a4.jpg','3eaef3ee43.jpg','40d7d18ad3.jpg','417e77e946.jpg','4260d1c556.jpg','429e382095.jpg','463835bbc6.jpg','4660310c3e.jpg','47a0548067.jpg','488600cb75.jpg','49337b68f4.jpg','4995c04b1a.jpg','4ab2583fe2.jpg','4ad8b366c1.jpg','4b0adf7c6f.jpg','4bb4ca7b03.jpg','4c0e35882c.jpg','4c74254ad3.jpg','4e05523825.jpg','4f045779b0.jpg','4f3f4ff590.jpg','4f4de0bbba.jpg','4f7e01f097.jpg','50855dd324.jpg','512cd171a9.jpg','5185e8c56a.jpg','51bdd25f76.jpg','51db3fc011.jpg','526a110636.jpg','52aed0f943.jpg','52d12dc627.jpg','52fc351abf.jpg','536aa87152.jpg','565f19268b.jpg','586acab7c5.jpg','5926f85cbf.jpg','593db29cce.jpg','599098859e.jpg','59df696966.jpg','5aa514ffac.jpg','5c79cfe0b3.jpg','5cb895b722.jpg','5e357ad790.jpg','5ffbfe68d4.jpg','6043aadea0.jpg','608ee0d370.jpg','61e735361a.jpg','632ddbc784.jpg','661e374153.jpg','66226e18fc.jpg','66a144f547.jpg','6742294320.jpg','676a5a4c2e.jpg','6782e7cb2a.jpg','68729aac07.jpg','68b60c04b7.jpg','68d60af226.jpg','695897bd4a.jpg','69f4b75a37.jpg','6a03aea8be.jpg','6bbe0e63c6.jpg','6bfbd1df5b.jpg','6c6cc46498.jpg','6d0e87f557.jpg','6e0429f92e.jpg','6ee7c39dbc.jpg','6f0b9df5c5.jpg','7017e6caa1.jpg','7054793632.jpg','70bc945f95.jpg','718445ebe3.jpg','7239ba0b55.jpg','730f325b64.jpg','732d76a469.jpg','7341d96c1d.jpg','73f33a12c5.jpg','74e452fb31.jpg','76cc7181f8.jpg','77b37629f2.jpg','79224da51f.jpg','79292e1434.jpg','7952021d2f.jpg','7960adbd50.jpg','7cb36714d0.jpg','7d64c3100c.jpg','8044a92484.jpg','8077b7e9e7.jpg','8114fa2607.jpg','815624563e.jpg','82991e742a.jpg','82b9fd68b1.jpg','8314acfd35.jpg','853f8d711f.jpg','85580214be.jpg','88402296cc.jpg','893db2701d.jpg','89964efa86.jpg','89d970411d.jpg','89fcbf2f76.jpg','8b54448a07.jpg','8b7948248f.jpg','8b841420b4.jpg','8c48e112d0.jpg','8c8011c291.jpg','8cfd45a2e2.jpg','8e5ff15568.jpg','8ee2933868.jpg','8f02369f42.jpg','910610e827.jpg','910729e0ce.jpg','92c0ba8c0d.jpg','93132f89ee.jpg','932d0dd808.jpg','95a53d7b0b.jpg','95b5f01a85.jpg','9843bc25c5.jpg','9908d1daa9.jpg','990ed28f62.jpg','9963d64ebf.jpg','99a51d3e25.jpg','99d94af5dd.jpg','9ae6552353.jpg','9d58456cc3.jpg','9d9a4fccfb.jpg','9db9843ed1.jpg','9f409e3376.jpg','9fc868e864.jpg','a030bc32e6.jpg','a06b54dfe9.jpg','a202b1b200.jpg','a210ceedc7.jpg','a4e4a61fb2.jpg','a59f3f5b89.jpg','a619072f82.jpg','a6291c2a1c.jpg','a642e9cb6f.jpg','a7977705be.jpg','a7d53885e8.jpg','a885da7b52.jpg','a8fbbe3eb1.jpg','a96b79a93f.jpg','aa76c7625a.jpg','ad0101d010.jpg','ad8ce41fc0.jpg','b1310da865.jpg','b13c0973ee.jpg','b1ea5d5a7d.jpg','b256e61a5d.jpg','b2ce76c750.jpg','b3adc75e7d.jpg','b44f24c048.jpg','b5c2fe7c4c.jpg','b76d52e05a.jpg','b99546090b.jpg','ba52f976af.jpg','baf6efabfe.jpg','bbc5ac4564.jpg','bc4b364a44.jpg','bf6db09354.jpg','c14505c1da.jpg','c1dc1a85a4.jpg','c2576267d4.jpg','c4622e3fb6.jpg','c67ba2060c.jpg','c68c52e8fc.jpg','c6c360756c.jpg','c6c88ce9c4.jpg','c78b4fa3a9.jpg','c7d8142152.jpg','cb50326950.jpg','cb9c553ded.jpg','cc2bb659f4.jpg','cd6623d07d.jpg','cdddf326e3.jpg','ce3e0daddd.jpg','ceb6cf5f31.jpg','cf6488d84c.jpg','cfc6fce7b5.jpg','d05cab011d.jpg','d087730b76.jpg','d14c1abdd4.jpg','d1d9748a64.jpg','d239dae42d.jpg','d4116437bb.jpg','d50049fbfc.jpg','d5b0c260a0.jpg','d6d6e625bd.jpg','d729785cb8.jpg','d754850d01.jpg','d7948c7635.jpg','d88482796d.jpg','d9e8704878.jpg','da72006ef5.jpg','dc33f0edbe.jpg','dcab49d080.jpg','dcf5ea1040.jpg','dd46691bd7.jpg','de6f71b00f.jpg','df64ac2dcb.jpg','e2253b87a0.jpg','e291f8144f.jpg','e3112413b1.jpg','e37407c747.jpg','e510a74d3c.jpg','e568f84fad.jpg','e753318d04.jpg','e88d9de918.jpg','e9580cd500.jpg','e9f5563817.jpg','e9f686534b.jpg','eb3cc5c559.jpg','ec3398cef9.jpg','ec78d80dbd.jpg','ed597655a0.jpg','ede9769cb3.jpg','ee7adac58f.jpg','f04c9d8e34.jpg','f0884db067.jpg','f0d789c4bc.jpg','f4413e97bd.jpg','f486c1655f.jpg','f7836c88eb.jpg','f821791c85.jpg','f84fb4516a.jpg','f96a8de9f3.jpg','fb3b06dcb2.jpg','fb806a2a1c.jpg','fb93438ff9.jpg','fba982625d.jpg','fc11d52502.jpg','fd63a333f1.jpg','fdf1530d95.jpg','ffd74c77ea.jpg',]
    }
  },
  methods : {
    nextStep() {
      if (this.art_data == "") {
        this.step = 2
      } else {
        this.step = 3
        this.submit()
      }
    },
    async ping() {
      let response = await fetch(this.apiURL, {
          method : "POST",
          headers: {
              'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({})
      });

      this.pingFinished = true
    },
    async submit(prev_tries=0) {
      this.error = false

      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')

      const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));

      while (!this.pingFinished) {
        await waitFor(1000)
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let response = await fetch(this.apiURL, {
          method : "POST",
          headers: {
              'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
              "photo" : this.photo_data,
              "art" : this.art_data
          })
      });

      if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json();
        if ("styled" in json && json["styled"]) {
          var image = new Image()
          image.crossOrigin = 'Anonymous';
          image.onload = () => {
              ctx.drawImage(image, 0, 0)
          }
          image.src ="data:image/jpeg;base64, " + json["styled"]
          this.step = 4
          return
        }
      }
      
      if (prev_tries == 0) {
        await this.submit(prev_tries+1)
      } else {
        this.error = true
      }

      this.step=4
    }
  },
  mounted() {
    let photo = document.getElementById("example_photo")
    let art = document.getElementById("example_art")
    let fake = document.getElementById("example_fake")

    let photo_op = 1
    let art_op = 0
    let fake_op = 0

    let photo_inc = -0.01
    let art_inc = 0
    let fake_inc = 0

    const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));
    const round_hund = num => Math.round(num * 100) / 100;

    (async () => {
      while (this.step == 0) {
        photo_op = round_hund(photo_op + photo_inc)
        art_op =  round_hund( art_op + art_inc)
        fake_op = round_hund(fake_op + fake_inc)

        photo.style.opacity = photo_op
        art.style.opacity = art_op
        fake.style.opacity = fake_op

        if (photo_op == 1) {
          photo_inc = -0.01
        }

        if (art_op == 1) {
          art_inc = -0.01
        }

        if (fake_op == 1) {
          fake_inc = -0.01
        }

        if (photo_op == 0 && art_op == 0 && fake_op == 0) {
          if (photo_inc == -0.01) {
            photo_inc = 0
            art_inc = 0.01
          }

          if (art_inc == -0.01) {
            art_inc = 0
            fake_inc = 0.01
          }

          if (fake_inc == -0.01) {
            fake_inc = 0
            photo_inc = 0.01
          }
        }

        await waitFor(this.animTime / 300)
      }
    })()
    
  },

}
</script>
<style>
  canvas {
    border: 11px solid black;
    margin-bottom: 1%;
  }
  
  .button_margin {
    margin-top: 5%;
  }

  .next_steps_buttons {
    margin-top:5%;
  }

  #HomeView {
    max-width: 500px;
    background: #1c1717bd;
    margin: auto;
    padding: 5%;
    padding-top: 1px;
    height: 100%;
  }

  #LoadingBlur {
    width: 100%;
    background: #1c171742;
    margin: auto;
    height: 1000px;
    padding:1px;
  }

  h2 {
    margin: 8px;
  }

  .example_container {
    margin-top: 20px;
    position: relative;
    height:450px;
  }

  .example {
    position: absolute;
    width: 100%;
    padding-bottom: 15px;
  }

  .example img {
    border-radius: 10px;
  }

</style>
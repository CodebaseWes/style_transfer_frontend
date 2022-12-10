import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Select from '../views/Selection.vue'
import Select2 from '../views/Selection.vue'
import Artwork from '../views/Artwork.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/selection/photo',
      name: 'PhotoSelection',
      component: Select,
      props: {stage : "photo"}
    },
    {
      path: '/selection/art',
      name: 'ArtSelection',
      component: Select2,
      props: {stage : "art"}
    },

    {
      path: '/artwork',
      name: 'Artwork',
      component: Artwork
    },
    {
      path: '/error',
      name: 'Error',
      component: Artwork,
      props: {error : true}
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyPolicy
    }
  ]
})

export default router

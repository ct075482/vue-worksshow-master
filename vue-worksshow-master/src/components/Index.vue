<template>
    <div class="index">
      <vue-nav></vue-nav>
      <router-view></router-view>
    </div>
</template>

<script>
  import vueNav from '../components/Nav.vue'
  import vueCarousel from '../components/Carousel.vue'
  import mainShow from '../components/MainShow.vue'
  import oneShow from '../components/OneShow.vue'
  export default {
    name: 'Index',
    data () {
      return {
        msg: 'Index'
      }
    },
    components: {
      vueNav, vueCarousel, mainShow, oneShow
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

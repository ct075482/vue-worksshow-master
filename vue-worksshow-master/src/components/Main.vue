<template>
    <div class="main">
      <carousel></carousel>
      <main-show></main-show>
    </div>
</template>

<script>
  import carousel from '@/components/Carousel'
  import MainShow from '@/components/MainShow'
  export default {
    name: 'Main',
    components: {
      carousel, MainShow
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

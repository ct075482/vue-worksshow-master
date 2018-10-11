<template>
    <div class="carousel">
      <el-carousel height="300px" class="hidden-xs-only">
        <el-carousel-item v-for="item in items" :key="item.path">
          <img :src="item.path">
        </el-carousel-item>
      </el-carousel>
      <el-carousel height="150px" class="hidden-sm-and-up">
        <el-carousel-item v-for="item in items" :key="item.path">
          <img :src="item.path">
        </el-carousel-item>
      </el-carousel>
    </div>
</template>

<script>
  export default {
    name: 'carousel',
    data () {
      return {
        items: [
          {
            path: './static/images/banner01.png'
          },
          {
            path: './static/images/banner02.jpg'
          }
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img{
    width: 100%;
    height: 100%;
  }
  .carousel{
    width: 75%;
    margin: 91px auto 30px auto;
    border-radius: 4px;
    overflow: hidden;
  }
  @media screen and (max-width: 768px){
    .carousel{
      width: 100%;
      margin: 0px auto;
      border-radius: 0px;
      padding-top: 50px;
      overflow: hidden;
    }
  }
</style>

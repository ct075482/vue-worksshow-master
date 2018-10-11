<template>
    <div class="introduction">
      <div class="box" v-html="introduction">

      </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
      name: 'Introduction',
      data () {
        return {
          introduction: ''
        }
      },
      created: function () {
        this.getLastMatch()
      },
      methods: {
        getLastMatch () {
          var that = this
          axios.post(this.Global.host + 'Match/getLastMatch')
            .then(function (res) {
              console.log(res)
              if (res.data.code === 0) {
                that.introduction = res.data.data.introduction
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .introduction{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    background: #f4f4f4;
  }
  .box{
    margin: 100px auto;
    width: 70%;
    background: white;
    box-shadow: 0 0 15px 1px rgba(0,0,0,.2);
    padding: 30px;
    text-align: center;
  }
  h1{
    color: orangered;
  }
  h1,h2{
    font-weight: 500;
    padding-top: 5px;
  }
  h3{
    font-weight: 500;
    text-align: left;
  }
  p{
    text-align: left;
    margin-top: 20px;
    margin-bottom: 20px;
    text-indent: 32px;
    font-size: 16px;
    line-height: 30px;
  }
  @media screen and (max-width: 768px){
    .box{
      margin: 50px auto;
      width: 90%;
      background: white;
      box-shadow: 0 0 5px 1px rgba(0,0,0,.2);
      padding: 10px;
      text-align: center;
    }
  }
</style>

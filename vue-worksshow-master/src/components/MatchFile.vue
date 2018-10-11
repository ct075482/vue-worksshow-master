<template>
    <div class="match-file">
      <div class="box" v-for="item in fileList" :key="item.url">
        <img :src="item.url">
        <p><a :href="item.url" target="_blank">{{ item.url }}</a></p>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'MatchFile',
    data () {
      return {
        matchId: '',
        fileList: []
      }
    },
    methods: {
      getMatchInfo () {
        var that = this
        axios.post(this.Global.host + 'Match/getMatchInfo', {
          match_id: that.matchId
        })
          .then(function (res) {
            if (res.data.code === 0) {
              that.fileList = []
              // 分割素材
              if (res.data.data.file_url === '-1') {
                that.$alert('无素材')
              } else {
                let fileArr = res.data.data.file_url.split(',')
                for (let i = 0; i < fileArr.length; i++) {
                  that.fileList.push({
                    url: that.Global.matchUrl + fileArr[i]
                  })
                }
              }
            } else {
              that.$alert('未开放')
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    },
    mounted: function () {
      this.matchId = this.$route.params.matchId
      console.log(this.matchId)
      this.getMatchInfo()
    }
  }
</script>

<style scoped>
.match-file{
  margin: 91px auto 30px auto;
}
  .box{
    text-align: center;
    width: 500px;
    overflow: hidden;
    margin: 1rem auto;
  }
  .box img{
    max-width: 100%;
  }
</style>

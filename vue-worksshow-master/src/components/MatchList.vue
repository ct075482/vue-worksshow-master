<template>
    <div class="match-list">
      <div class="box">
        <ul>
          <li v-for="item in matchList" :key="item.match_id">
            <router-link :to="{name:'MatchFile',params: {matchId: item.match_id}}" exact>
              {{ item.match_name }}
            </router-link>
            <span>{{ item.create_time }}</span>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'MatchList',
    data () {
      return {
        matchList: []
      }
    },
    methods: {
      getAllMatchList () {
        var that = this
        axios.post(this.Global.host + 'Match/getAllMatch')
          .then(function (res) {
            console.log(res)
            if (res.data.code === 0) {
              that.matchList = []
              for (let i = 0; i < res.data.data.length; i++) {
                that.matchList.push({
                  match_id: res.data.data[i].match_id,
                  match_name: res.data.data[i].match_name,
                  create_time: res.data.data[i].create_time
                })
              }
            } else {
              that.$alert('还没有哦')
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    },
    mounted: function () {
      this.getAllMatchList()
    }
  }
</script>

<style scoped>
.match-list{
  margin: 91px auto 30px auto;
}
.box{
  width: 65%;
  margin: 0 auto;
}
  li{
    text-align: center;
    line-height: 2.5rem;
    width: 60%;
    margin: 0 auto;
    list-style: none;
  }
  li a:hover{
    color: rgb(255, 209, 0);
  }
  li > span{
    display: block;
    color: gray;
    float: right;
  }
</style>

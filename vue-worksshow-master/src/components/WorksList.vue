<template>
    <div class="works-list">
      <ul>
        <li v-for="item in worksList">
          <router-link :to="{name: 'OneWorksInfo',params:{ worksId: item.id }}" exact>
            {{ item.works_name }}
          </router-link>
        </li>
      </ul>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
      name: 'WorksList',
      data () {
        return {
          worksList: []
        }
      },
      methods: {
        getWorksList: function (token) {
          var that = this
          // 根据用户id获取最新队伍信息、该队伍作品信息
          axios.post(this.Global.host + 'User/getWorksList', {
            token: token
          })
            .then(function (response) {
              if (response.data.code === 0) {
                for (var i = 0; i < response.data.data.length; i++) {
                  that.worksList.push(response.data.data[i])
                }
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      },
      mounted: function () {
        this.getWorksList(JSON.parse(sessionStorage.user).token)
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li{
    line-height: 30px;
    text-align: center;
  }
  li a:hover{
    color: orangered;
  }
</style>

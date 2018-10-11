<template>
    <div class="news-info">
      <h1>{{ title }}</h1>
      <article v-html="content"></article>
      <ul>
        <li>创建时间：{{ create_time }}</li>
        <li>更新时间：{{ update_time }}</li>
      </ul>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'NewsInfo',
    data () {
      return {
        news_id: 0,
        title: '',
        content: '',
        create_time: '',
        update_time: ''
      }
    },
    created: function () {
      this.getNewsInfo(this.$route.params.newsId)
    },
    methods: {
      getNewsInfo (newsId) {
        var that = this
        axios.post(this.Global.host + 'News/getOneNews', {
          news_id: newsId
        })
          .then(function (res) {
            if (res.data.code === 0) {
              that.news_id = res.data.data.news_id
              that.title = res.data.data.title
              that.content = res.data.data.content
              that.create_time = res.data.data.create_time
              that.update_time = res.data.data.update_time
            } else {
              that.$alert('异常')
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>
  .news-info{
    margin: 91px auto 30px auto;
    width: 80%;
  }
  ul{
    margin-top: 2rem;
  }
  ul li{
    list-style: none;
    display: inline-block;
  }
  ul li:last-child{
    float: right;
  }
</style>

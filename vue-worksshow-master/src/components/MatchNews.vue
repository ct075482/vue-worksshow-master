<template>
    <div class="match-news">
      <div class="box">
        <ul>
          <li v-for="item in news" :key="item.news_id">
            <router-link :to="{name:'NewsInfo',params: {newsId: item.news_id}}" exact>{{ item.title }}</router-link>
            <span>{{ item.create_time }}</span>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'MatchNews',
    data () {
      return {
        start_index: 0,
        page_size: 10,
        news: []
      }
    },
    methods: {
      getNews (startIndex, pageSize) {
        var that = this
        axios.post(this.Global.host + 'News/getNewsList', {
          start_index: startIndex,
          page_size: pageSize
        })
          .then(function (res) {
            if (res.data.code === 0) {
              that.news = []
              for (let i = 0; i < res.data.data.length; i++) {
                that.news.push({
                  news_id: res.data.data[i].news_id,
                  title: res.data.data[i].title,
                  create_time: res.data.data[i].create_time
                })
              }
            } else {
              that.$alert('暂无')
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    },
    created: function () {
      this.getNews(0, 10)
    }
  }
</script>

<style scoped>
  .match-news{
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

<template>
    <div class="main-show">
      <el-row class="tabs-col">
        <el-col>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="最新上传" name="0" value="0"></el-tab-pane>
            <el-tab-pane label="热度最高" name="1" value="1"></el-tab-pane>
            <el-tab-pane label="最新赛事" name="2" value="2"></el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-row class="row-margin" :gutter="30">
        <el-col v-for="item in items" :key="item.path" :xs="24" :sm="12" :md="8" :lg="6">
          <router-link :to="{name: 'OneShow',params:{ worksId: item.id }}" exact>
            <div class="box-img">
              <img :src="item.path" alt="图片找不到了呢">
              <ul>
                <li>作品名称：{{ item.name }}</li>
                <li>学号：{{ item.username }}</li>
                <li>姓名：{{ item.realname }}</li>
                <li>网友点赞：{{ item.net_star }}</li>
                <li>专家点赞：{{ item.expert_star }}</li>
              </ul>
            </div>
          </router-link>
        </el-col>
      </el-row>
      <el-row class="btn-more">
        <el-button @click="loadingMoreWorks">加载更多</el-button>
      </el-row>
    </div>
</template>

<script>
  import axios from 'axios'
  import ElCol from 'element-ui/packages/col/src/col'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElButton from '../../node_modules/element-ui/packages/button/src/button'
  export default {
    components: {
      ElButton,
      ElRow,
      ElCol
    },
    name: 'MainShow',
    created: function () {
      this.loadingWorks(0, 0, 8)
    },
    methods: {
      // 加载作品列表
      loadingWorks: function (type, startItem, pageSize) {
        var that = this
        // var url = 'http://127.0.0.1/gallery/public/uploads/works/'
        axios.post(this.Global.host + 'Works/getWorksList', {
          type: type,
          startItem: startItem,
          pageSize: pageSize
        })
          .then(function (response) {
            // console.log(response)
            // 判断响应码
            if (response.data.code === 803) {
              that.$message('参数异常')
            } else if (response.data.code === 101) {
              that.$message('暂无数据')
            } else if (response.data.code === 0) {
              // console.log(response.data.data)
              that.items = []
              for (var i = 0; i < response.data.data.length; i++) {
                // 将图片地址以逗号分割成数组
                var arrImg = response.data.data[i].pictures.split(',')
                that.items.push({
                  id: response.data.data[i].id,
                  path: that.Global.worksUrl + arrImg[0],
                  name: response.data.data[i].works_name,
                  net_star: response.data.data[i].net_star,
                  expert_star: response.data.data[i].expert_star,
                  match_name: response.data.data[i].match_name,
                  user_id: response.data.data[i].user_id,
                  username: response.data.data[i].username,
                  realname: response.data.data[i].realname === '-1' ? '未填写' : response.data.data[i].realname
                })
              }
              // 加载完数据 重新定义 起始项
              that.startItem += response.data.data.length
            } else {
              that.$message('异常')
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      // 加载更多作品
      loadingMoreWorks: function () {
        var that = this
        // var url = 'http://127.0.0.1/gallery/public/uploads/works/'
        axios.post(this.Global.host + 'Works/getWorksList', {
          type: that.activeType,
          startItem: that.startItem,
          pageSize: that.pageSize
        })
          .then(function (response) {
            console.log(response)
            // 判断响应码
            if (response.data.code === 803) {
              that.$message('参数异常')
            } else if (response.data.code === 101) {
              that.$message('没有了')
            } else if (response.data.code === 0) {
              // console.log(response.data)
              for (let i = 0; i < response.data.data.length; i++) {
                // 将图片地址以逗号分割成数组
                var arrImg = response.data.data[i].pictures.split(',')
                that.items.push({
                  id: response.data.data[i].id,
                  path: that.Global.worksUrl + arrImg[0],
                  name: response.data.data[i].works_name,
                  net_star: response.data.data[i].net_star,
                  expert_star: response.data.data[i].expert_star,
                  match_name: response.data.data[i].match_name,
                  user_id: response.data.data[i].user_id,
                  username: response.data.data[i].username,
                  realname: response.data.data[i].realname === '-1' ? '未填写' : response.data.data[i].realname
                })
              }
              that.startItem += response.data.data.length
              console.log(that.startItem)
            } else {
              that.$message('异常')
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      // 切换标签页触发
      handleClick: function (tab, event) {
        console.log(tab.name)
        this.startItem = 0
        // 传递不同参数以相应排序方式获取数据
        this.loadingWorks(tab.name, this.startItem, this.pageSize)
        this.activeType = tab.name
      }
    },
    data () {
      return {
        activeType: 0,
        activeName: '0',
        startItem: 0,
        pageSize: 8,
        items: [
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .btn-more{
    text-align: center;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  .main-show{
    margin:0 auto;
    padding-bottom: 50px;
    background: #f4f4f4;
  }
  .box-img{
    background: white;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 5px 5px 1px rgba(0,0,0,.2);
  }
  .box-img ul{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .box-img ul li{
    padding-left: 16px;
    list-style: none;
    line-height: 25px;
    height: 25px;
    font-size: 14px;
    color: #282828;
  }
  .box-img img{
    width: 100%;
    height: 150px;
    max-height: 150px;
    min-height: 150px;
  }
  .el-row{
    width: 75%;
    margin: 0 auto !important;
  }
  .tabs-col .el-col{
    margin-top: 0px;
  }
  .el-col{
    margin-top: 25px;
  }
  .el-pagination{
    text-align: center;
    margin: 50px auto;
  }
  @media screen and (max-width: 768px){
    .el-row{
      width: 100%;
      margin: 0 auto !important;
    }
  }
</style>

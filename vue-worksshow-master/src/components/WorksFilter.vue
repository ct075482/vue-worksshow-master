<template>
    <div class="works-filter">
      <div class="center">
        <el-select v-model="matchId" placeholder="请选择赛事">
          <el-option
            v-for="item in matchList"
            :key="item.match_id"
            :label="item.match_name"
            :value="item.match_id">
          </el-option>
        </el-select>
        <el-select v-model="classId" placeholder="请选择班级">
          <el-option
            v-for="item in classList"
            :key="item.class_id"
            :label="item.class_name"
            :value="item.class_id">
          </el-option>
        </el-select>
      </div>
      <el-row class="row-margin" :gutter="30">
        <el-col v-for="item in worksList" :key="item.path" :xs="24" :sm="12" :md="8" :lg="6">
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
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'WorksFilter',
    data () {
      return {
        worksList: [],
        matchId: '根据赛事筛选数据',
        classId: '根据班级筛选数据',
        matchList: [],
        classList: []
      }
    },
    watch: {
      matchId: function (newMatchId) {
        this.getMatchAndClassWorks(this.classId, newMatchId)
        // this.getMatchWorks(newMatchId)
      },
      classId: function (newClassId) {
        this.getMatchAndClassWorks(newClassId, this.matchId)
        // this.getClassWorks(newClassId)
      }
    },
    mounted: function () {
      this.getAllMatch()
      this.getAllClass()
    },
    methods: {
      getAllClass () {
        var that = this
        axios.post(this.Global.host + 'Classcontroller/getAllClass')
          .then(function (res) {
            console.log(res)
            if (res.data.code === 0) {
              that.classList = []
              for (let i = 0; i < res.data.data.length; i++) {
                that.classList.push({
                  class_id: res.data.data[i].class_id,
                  class_name: res.data.data[i].class_name
                })
              }
            } else {

            }
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      getAllMatch () {
        var that = this
        axios.post(this.Global.host + 'Match/getAllMatch')
          .then(function (res) {
            if (res.data.code === 0) {
              that.matchList = []
              for (let i = 0; i < res.data.data.length; i++) {
                that.matchList.push({
                  match_id: res.data.data[i].match_id,
                  match_name: res.data.data[i].match_name
                })
              }
            } else {

            }
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      getMatchWorks (matchId) {
        var that = this
        axios.post(this.Global.host + 'Works/getMatchWorks', {
          match_id: matchId
        })
          .then(function (res) {
            console.log(res)
            if (res.data.code === 803) {
              that.$message('参数异常')
            } else if (res.data.code === 101) {
              that.$alert('暂无数据')
            } else if (res.data.code === 0) {
              that.worksList = []
              for (var i = 0; i < res.data.data.length; i++) {
                // 将图片地址以逗号分割成数组
                var arrImg = res.data.data[i].pictures.split(',')
                that.worksList.push({
                  id: res.data.data[i].id,
                  path: that.Global.worksUrl + arrImg[0],
                  name: res.data.data[i].works_name,
                  net_star: res.data.data[i].net_star,
                  expert_star: res.data.data[i].expert_star,
                  match_name: res.data.data[i].match_name,
                  user_id: res.data.data[i].user_id,
                  username: res.data.data[i].username,
                  realname: res.data.data[i].realname === '-1' ? '未填写' : res.data.data[i].realname
                })
              }
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      getClassWorks (classId) {
        var that = this
        axios.post(this.Global.host + 'Works/getClassWorks', {
          class_id: classId
        })
          .then(function (res) {
            console.log(res)
            if (res.data.code === 803) {
              that.$message('参数异常')
            } else if (res.data.code === 101) {
              that.$alert('暂无数据')
            } else if (res.data.code === 0) {
              that.worksList = []
              for (var i = 0; i < res.data.data.length; i++) {
                // 将图片地址以逗号分割成数组
                var arrImg = res.data.data[i].pictures.split(',')
                that.worksList.push({
                  id: res.data.data[i].id,
                  path: that.Global.worksUrl + arrImg[0],
                  name: res.data.data[i].works_name,
                  net_star: res.data.data[i].net_star,
                  expert_star: res.data.data[i].expert_star,
                  match_name: res.data.data[i].match_name,
                  user_id: res.data.data[i].user_id,
                  username: res.data.data[i].username,
                  realname: res.data.data[i].realname === '-1' ? '未填写' : res.data.data[i].realname
                })
              }
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      getMatchAndClassWorks (classId, matchId) {
        var that = this
        axios.post(this.Global.host + 'Works/getMatchAndClassWorks', {
          class_id: classId,
          match_id: matchId
        })
          .then(function (res) {
            console.log(res)
            if (res.data.code === 803) {
              that.$message('参数异常')
            } else if (res.data.code === 101) {
              that.$alert('暂无数据')
            } else if (res.data.code === 0) {
              that.worksList = []
              for (var i = 0; i < res.data.data.length; i++) {
                // 将图片地址以逗号分割成数组
                var arrImg = res.data.data[i].pictures.split(',')
                that.worksList.push({
                  id: res.data.data[i].id,
                  path: that.Global.worksUrl + arrImg[0],
                  name: res.data.data[i].works_name,
                  net_star: res.data.data[i].net_star,
                  expert_star: res.data.data[i].expert_star,
                  match_name: res.data.data[i].match_name,
                  user_id: res.data.data[i].user_id,
                  username: res.data.data[i].username,
                  realname: res.data.data[i].realname === '-1' ? '未填写' : res.data.data[i].realname
                })
              }
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
  .works-filter{
    margin-top: 91px;
  }
  .center{
    text-align: center;
    margin-bottom: 2rem;
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
  .el-col{
    margin-top: 25px;
  }
</style>

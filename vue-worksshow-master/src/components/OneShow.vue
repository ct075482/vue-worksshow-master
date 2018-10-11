<template>
    <div class="one-show">
      <el-row>
        <el-col>
          <el-tabs>
            <el-tab-pane label="主要信息">
              <el-col :xs="24" :sm="8" class="carousel-img">
                <el-carousel height="200px">
                  <el-carousel-item v-for="item in items" :key="item.path">
                    <img :src="item.path">
                  </el-carousel-item>
                </el-carousel>
              </el-col>
              <el-col class="main-info" :xs="24" :sm="6" :offset="1">
                <h2>
                  {{ worksName }}
                </h2>
                <ul>
                  <li>作品名称：{{ worksName }}</li>
                  <li>学号：{{ username }}</li>
                  <li>姓名：{{ realname }}</li>
                  <li v-if="hasWeb" class="website">预览地址：<a :href="website" target="_blank">点击预览</a></li>
                </ul>
              </el-col>
              <el-col class="start-info" :offset="1" :sm="4">
                <ul>
                  <li>网友点赞：{{ netStar }}</li>
                  <li>专家点赞：{{ expertStar }}</li>
                  <li>分享：
                    <a :href="sinaUrl" target="_blank">
                      <i class="iconfont">&#xe501;</i>
                    </a>
                  </li>
                  <li>
                    <el-button class="start-btn starf" v-bind:class="{ star: star }" @click="setStar(userData.token, worksId)" round type="primary" icon="el-icon-star-on">点赞</el-button>
                  </li>
                </ul>
              </el-col>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="introduction">
          <el-tabs>
            <el-tab-pane label="作品介绍" v-html="introduction">
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-tabs>
            <el-tab-pane label="作品图片">
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-row class="col-img">
        <el-col v-for="item in items" :key="item.path">
          <img :src="item.path">
        </el-col>
      </el-row>
      <el-row class="start">
        <el-col>
          <el-button class="start-btn starf" v-bind:class="{ star: star }" @click="setStar(userData.token, worksId)" round type="primary" icon="el-icon-star-on">点赞</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-tabs>
            <el-tab-pane label="全部评论">
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-input
            type="textarea"
            autosize
            placeholder="说点什么吧"
            v-model="newComment">
          </el-input>
        </el-col>
        <el-col class="comment-btn">
          <el-button  type="primary" @click="addComment(worksId, newComment, userData.token)">评论</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-for="comment in comments" :key="comment.username">
          <el-container>
            <el-aside>
              <img :src="comment.headImg" alt="图片找不到了呢">
            </el-aside>
            <el-container>
              <el-header height="100%">
                <h4>{{ comment.nickname }}</h4>
                <span>{{ comment.commentTime }}</span>
              </el-header>
              <el-main>
                <p>
                  {{ comment.content }}
                </p>
              </el-main>
            </el-container>
          </el-container>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import axios from 'axios'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
  export default {
    components: {
      ElCol,
      ElRow},
    name: 'OneShow',
    mounted: function () {
      this.loadingWorksInfo()
      this.loadingUserInfo()
      this.loadingComment()
      this.checkStar(this.userData.token, this.$route.params.worksId)
    },
    created: function () {
      this.sinaUrl = this.sinaUrl + encodeURIComponent(window.location.href)
    },
    methods: {
      // 加载作品信息
      loadingWorksInfo: function () {
        // var url = 'http://127.0.0.1/gallery/public/uploads/works/'
        // var projectUrl = 'http://127.0.0.1/gallery/public/uploads/project/'
        var that = this
        axios.post(this.Global.host + 'Works/getWorksInfo', {
          worksid: this.$route.params.worksId
        })
          .then(function (response) {
            // console.log(response)
            // 判断响应码
            if (response.data.code === 803) {
              that.$message('参数异常')
            } else if (response.data.code === 101) {
              that.$message('获取作品异常')
            } else if (response.data.code === 0) {
              if (response.data.data.website === '-1') {
                that.hasWeb = false
              }
              console.log(response.data)
              that.worksId = response.data.data.works_id
              that.worksName = response.data.data.works_name
              that.website = that.Global.projectUrl + response.data.data.website
              that.introduction = response.data.data.introduction
              that.netStar = response.data.data.net_star
              that.expertStar = response.data.data.expert_star
              that.username = response.data.data.username
              that.realname = response.data.data.realname === '-1' ? '未填写' : response.data.data.realname
              var arrImg = response.data.data.pictures.split(',')
              for (var i = 0; i < arrImg.length; i++) {
                that.items.push({
                  path: that.Global.worksUrl + '/' + arrImg[i]
                })
              }
            } else {
              that.$message('异常')
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      loadingUserInfo: function () {
        if (sessionStorage.user) {
          this.userData = JSON.parse(sessionStorage.user)
        }
      },
      // 加载评论
      loadingComment: function () {
        // var url = 'http://127.0.0.1/gallery/public/uploads/headImg/'
        var that = this
        axios.post(this.Global.host + 'Works/getCommentsInfo', {
          worksid: this.$route.params.worksId
        })
          .then(function (response) {
            console.log(response)
            // 判断响应码
            if (response.data.code === 803) {
             // that.$message('参数异常')
            } else if (response.data.code === 101) {
              // that.$message('获取作品异常')
            } else if (response.data.code === 0) {
              that.comments = []
              for (var i = 0; i < response.data.data.length; i++) {
                var img
                if (response.data.data[i].headImg === '-1') {
                  img = './static/images/head.jpg'
                } else {
                  img = that.Global.headImgUrl + '/' + response.data.data[i].headImg
                }
                that.comments.push({
                  nickname: response.data.data[i].nickname,
                  content: response.data.data[i].content,
                  headImg: img,
                  commentTime: response.data.data[i].comment_time
                })
              }
            } else {
             //  that.$message('异常')
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      // 新增评论
      addComment: function (worksId, content, token) {
        if (content === '') {
          this.$message('评论内容不能为空')
          return false
        }
        if (token === '') {
          this.$message('请先登录')
        }
        var that = this
        // 根据用户id获取最新队伍信息、该队伍作品信息
        axios.post(this.Global.host + 'Works/addComment', {
          token: token,
          work_id: worksId,
          content: content
        })
          .then(function (response) {
            // 判断响应码
            if (response.data.code === 803) {
              that.$message('请登录')
            } else if (response.data.code === 101) {
              that.$message('请登录')
            } else if (response.data.code === 102) {
              that.$message('评论失败，请稍后重试')
            } else if (response.data.code === 0) {
              that.loadingComment()
              that.$message('评论成功')
            } else {
              that.$message('异常')
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      // 检查对当前作品的点赞状态
      checkStar: function (token, worksId) {
        console.log(token + '**' + worksId)
        var that = this
        // 根据用户id获取最新队伍信息、该队伍作品信息
        axios.post(this.Global.host + 'Works/checkStar', {
          token: token,
          worksid: worksId
        })
          .then(function (response) {
            console.log(response)
            // 判断响应码
            if (response.data.code === 102) {
              that.star = true
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      setStar: function (token, worksId) {
        var that = this
        // 根据用户id获取最新队伍信息、该队伍作品信息
        axios.post(this.Global.host + 'Works/star', {
          token: token,
          worksid: worksId
        })
          .then(function (response) {
            console.log(response)
            // 判断响应码
            if (response.data.code === 803) {
              console.log('参数异常')
            } else if (response.data.code === 103) {
             // that.star = true
              that.$message('您已赞过')
            } else if (response.data.code === 102) {
              that.$message('点赞失败，请稍后重试')
            } else if (response.data.code === 0) {
              that.star = true
              if (response.data.data.role === 1) {
                that.expertStar = that.expertStar + 1
              } else {
                that.netStar = that.netStar + 1
              }
            } else {
              console.log('异常')
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    data () {
      return {
        star: false,
        hasWeb: true,
        sinaUrl: 'http://v.t.sina.com.cn/share/share.php?title=我在这里上传了作品，快快来点评一下哦~&url=',
        newComment: '',
        website: '',
        worksId: '',
        worksName: '',
        address: '',
        team: '',
        school: '',
        nickname: '',
        username: '',
        realname: '',
        teamMembers: '',
        teamTeachers: '',
        netStar: 0,
        expertStar: 0,
        introduction: '',
        items: [
        ],
        comments: [
        ],
        userData: {
          token: ''
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .one-show{
    margin-top: 75px;
  }
  .comment-btn .el-button{
    width: 100%;
    height: 35px;
    line-height: 35px;
    padding: 0;
    margin-top: 10px;
  }
  .start-info{
    text-align: left;
  }
  .start-info li{
    list-style: none;
    line-height: 30px;
    height: 30px;
  }
  .start-info li i{
    font-size: 20px;
    color: orangered;
    cursor: pointer;
  }
  .start{
    margin-bottom: 0 !important;
  }
  .share{
    text-align: right;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    line-height: 30px;
    height: 30px;
  }
  .share span{
    font-size: 14px;
  }
  .share i{
    font-size: 30px;
    cursor: pointer;
    vertical-align: middle;
  }
  .share i:hover{
    color: #62b900;
  }
  .carousel-img img{
    width: 100%;
    height: 100%;
  }
  .main-info h2{
    margin-bottom: 10px;
  }
  .main-info ul li{
    line-height: 30px;
    height: 30px;
  }
  .introduction{
    line-height: 30px;
  }
  .introduction .el-tab-pane{
    padding-left: 20px;
    padding-right: 20px;
  }
  .el-row{
    width: 75%;
    margin: 30px auto;
    overflow: hidden;
  }
  .col-img img{
    width: 100%;
    height: 100%;
    min-height: 150px;
  }
  ul li{
    list-style: none;
  }
  h2{
    color: #333;
    font-size: 24px;
    font-weight: 400;
  }
  .el-tab-pane{
    /*padding-left: 20px;*/
  }
  .start-btn{
    border: 0;
    margin: 20px auto;
    display: block;
  }
  .star{
    background-color: #ffd100 !important;
    color: white !important;
  }
  .starf{
    background-color: #eee;
    color: #999;
  }
  .el-aside{
    width: 80px !important;
    height: 80px;
    overflow: hidden;
    border-radius: 100%;
  }
  .el-aside img{
    width: 100%;
    height: 100%;
  }
  h4{
    display: inline-block;
    padding-right: 20px;
  }
  h4 + span{
    font-size: 14px;
    color: #bbb;
    display: inline-block;
  }
  .el-row .el-container{
    padding-left: 20px;
  }
  .el-main{
    height: 100%;
    margin-bottom: 20px;
    padding-top: 5px;
  }
  .el-header{
    height: 30px !important;
    line-height: 30px ;
  }
  li.website a{
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: underline;
  }
  @media screen and (max-width: 768px){
    .one-show{
      margin-top: 50px;
    }
    .start-info{

    }
    .comment-btn .el-button{
      width: 100%;
      height: 35px;
      line-height: 35px;
      padding: 0;
    }
    *{
      font-size: 14px;
      line-height: 25px;
    }
    .main-info h2{
      margin-top: 10px;
    }
    .el-header{
      height: 50px !important;
    }
    .el-row{
      width: 90%;
      margin: 0 auto !important;
    }
    .el-tabs{
      margin-top: 20px;
    }
    .el-header{
      height:100%;
    }
    .el-aside{
      width: 50px !important;
      height: 50px;
      overflow: hidden;
      border-radius: 100%;
    }
    .el-row .el-container{
      padding-left: 10px;
    }
  }
</style>

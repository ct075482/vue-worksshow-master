<template>
    <div class="nav">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        class="el-menu-demo hidden-xs-only"
        background-color="#ffd100"
        text-color="#282828">
        <router-link to="/" exact>
          <div class="logo">
            LOGO
          </div>
        </router-link>
        <el-menu-item index="1">
          <router-link to="/" exact>
            首页
          </router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/Introduction" exact>
            大赛简介
          </router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/MatchList" exact>
            赛事信息
          </router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <router-link to="/MatchNews" exact>
            大赛新闻
          </router-link>
        </el-menu-item>
        <el-menu-item index="5">
          <router-link to="/WorksFilter" exact>
            作品筛选
          </router-link>
        </el-menu-item>
        <el-menu-item index="6">
          <a href="http://47.106.86.119/vue-admin" target="_blank">后台</a>
        </el-menu-item>
        <div class="user">
          <div v-if="loginStatus" @click="logout">退出</div>
          <router-link to="/Login" v-if="!loginStatus">
            <span>登录</span>
          </router-link>
          <i v-if="!loginStatus">
            |
          </i>
          <router-link to="/Register" v-if="!loginStatus">
            <span>注册</span>
          </router-link>
          <router-link to="/UserInfo" v-if="loginStatus">
            <div class="user-img">
             <!--  <img :src="userImg">  -->
              <i class="iconfont">&#xe63a;</i>
            </div>
          </router-link>
        </div>
      </el-menu>
      <header class="hidden-sm-and-up">
        <router-link to="/UserInfo" v-if="loginStatus">
          <div class="user-img">
            <!--  <img :src="userImg">  -->
            <i class="iconfont">&#xe63a;</i>
          </div>
        </router-link>
        <router-link to="/" exact>
          <div class="logo">
            LOGO
          </div>
        </router-link>
        <label class="menu-lb" for="menu-cb">
          <i class="iconfont">&#xe60a;</i>
        </label>
      </header>
      <input type="checkbox" id="menu-cb"/>
      <el-menu
        :default-active="activeIndex"
        mode="vertical"
        class="el-menu-demo hidden-sm-and-up xs-nav"
        background-color="#ffd100"
        text-color="#282828">
        <router-link to="/" exact>
          <el-menu-item index="1">首页</el-menu-item>
        </router-link>
        <router-link to="/Introduction" exact>
          <el-menu-item index="2">大赛简介</el-menu-item>
        </router-link>
        <router-link to="/MatchList" exact>
          <el-menu-item index="3">赛事信息</el-menu-item>
        </router-link>
        <router-link to="/MatchNews" exact>
          <el-menu-item index="4">大赛新闻</el-menu-item>
        </router-link>
        <el-menu-item index="5" @click="logout" v-if="loginStatus">退出</el-menu-item>
        <router-link to="/Login" v-if="!loginStatus">
          <el-menu-item index="5" >登录</el-menu-item>
        </router-link>
        <router-link to="/Register" v-if="!loginStatus">
          <el-menu-item index="6">注册</el-menu-item>
        </router-link>
      </el-menu>
    </div>
</template>

<script>
  import 'element-ui/lib/theme-chalk/display.css'

  export default {
    name: 'nav',
    data () {
      return {
        loginStatus: false,
        activeIndex: '1',
        userImg: './static/images/head.jpg'
      }
    },
    methods: {
      // 检查登录状态
      checkLogin: function () {
        var imgUrl = 'http://zsptapeng.cn:8011/tp/public/uploads/'
        if (sessionStorage.user) {
          this.loginStatus = true
          var userData = JSON.parse(sessionStorage.user)
          if (userData.userImg !== '-1') {
            this.userImg = imgUrl + userData.userImg
          }
        } else {
          this.loginStatus = false
        }
      },
      logout: function () {
        sessionStorage.removeItem('user')
        this.loginStatus = false
      }
    },
    mounted: function () {
      this.checkLogin()
    },
    created: function () {
      this.checkLogin()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nav{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 20;
    box-shadow: 0 1px 5px 1px rgba(0,0,0,.2);
  }
  .user > div{
    display: inline;
    cursor: pointer;
  }
  .user-img{
    width: 40px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    display: inline-block;
    margin: 5px 0px 0px 0px;
  }
  .user-img img{
    width: 100%;
    height: 100%;
  }
  .logo{
    font-size: 25px;
    font-weight: 500;
    position: fixed;
    top: 18px;
    left: 60px;
    z-index: 12;
  }
  .el-menu{
    padding-left: 35%;
  }
  .xs-nav li{
    height: 45px;
    line-height: 45px;
    text-align: center;
  }
  .xs-nav{
    position: fixed;
    top: -250px;
    z-index: 10;
    width: 100%;
  }
  .el-menu a{
    font-weight: 600;
  }
  header{
    z-index: 11;
    background: #ffd100;
    position: fixed;
    top: 0;
    height: 50px;
    width: 100%;
    line-height: 50px;
  }
  #menu-cb{
    display: none;
  }
  header .menu-lb i{
    font-size: 30px;
    display: block;
    position: fixed;
    top: 0px;
    right: 10px;
    color: white;
    cursor: pointer;
  }
  .user{
    position: fixed;
    top: 5px;
    right: 45px;
    line-height: 61px;
    height: 61px;
  }
  .user span{
    padding: 0px 15px 0px 15px;
    font-weight: 400;
  }
  input[type=checkbox]:checked + .xs-nav{
    animation: aniMenu 1s forwards;
  }
  @keyframes aniMenu {
    from{
      top:-250px;
    }
    to{
      top:50px;
    }
  }
  @media screen and (max-width: 768px){
    .logo{
      font-size: 25px;
      font-weight: 400;
      position: fixed;
      top: 5px;
      left: 40%;
      z-index: 12;
    }
    .user{
      position: fixed;
      top:0;
      left: 0;
    }
    .el-menu{
      padding-left: 0;
    }
    .el-menu a{
      font-weight: 400;
    }
    .user-img{
      width: 35px;
      height: 35px;
      display: inline-block;
      margin: 9px 0px 0px 15px;
    }
  }
</style>

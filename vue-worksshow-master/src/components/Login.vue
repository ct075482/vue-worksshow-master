<template>
    <div class="login">
      <div class="window">
        <el-input
          placeholder="请输入用户名"
          v-model="username"
          clearable>
        </el-input>
        <el-input
          placeholder="请输入密码"
          v-model="password"
          type="password"
          clearable>
        </el-input>

        <el-button @click="requestLogin">登录</el-button>

        <el-row class="three">
          <el-col :span="24">
            第三方登录
          </el-col>
        </el-row>
        <el-row class="three-icon">
          <el-col :span="24">
            <i class="iconfont">&#xe501;</i>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import md5 from 'js-md5'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
  export default {
    components: {
      ElCol,
      ElRow},
    name: 'Login',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    created: function () {
      var that = this
      document.onkeydown = function (e) {
        var key = window.event.keyCode
        if (key === 13) {
          that.requestLogin()
        }
      }
    },
    methods: {
      // 请求登录
      requestLogin: function () {
        var that = this
        axios.post(this.Global.host + 'User/login', {
          username: that.username,
          password: md5(that.password)
        })
          .then(function (response) {
            console.log(response)
              // 判断响应码
            if (response.data.code === 803) {
              that.$message('参数异常')
            } else if (response.data.code === 101 || response.data.code === 102) {
              that.$message('用户名或密码错')
            } else if (response.data.code === 103) {
              that.$alert('账号暂未通过审核')
            } else if (response.data.code === 0) {
              that.$message('登录成功')
              // 保存账号信息
              sessionStorage.user = JSON.stringify(response.data.data)
              // 跳转至主界面
              that.$router.push({ path: '/' })
            } else {
              that.$alert('异常')
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("http://zsptapeng.cn/vue-worksshow/static/images/bglogin.jpg") no-repeat center center fixed;
    background-size: cover;
  }
  .window{
    width: 336px;
    padding: 50px 30px 50px 30px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 0 10px 1px rgba(0,0,0,.1);
    position: absolute;
    top:15%;
    left: 35%;
  }
  .el-input{
    color: #666;
    margin-bottom: 20px;
    border-radius: 4px;
  }
  .el-button{
    width: 100%;
    background-color: deepskyblue;
    border: 0;
  }
  .three{
    text-align: center;
    margin: 40px 0px 20px 0px;
    color: black;
    font-weight: 400;
  }
  .el-row .el-col i{
     cursor: pointer;
   }
  .three-icon{
    text-align: center;
  }
  .three-icon i{
    color: orangered;
    font-size: 30px;
  }
  @media screen and (max-width: 768px){
    .window{
      width: 90%;
      padding: 60px 0px 50px 0px;
      border: 0;
      border-radius: 4px;
      box-shadow: 0 0 0px 0px rgba(0,0,0,.1);
      position: absolute;
      top:15%;
      left: 5%;
    }
    .el-input{
      width: 100%;
    }
    .el-message-box{
      width: 50% !important;
    }
  }
</style>

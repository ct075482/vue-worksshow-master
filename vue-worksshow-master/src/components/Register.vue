<template>
    <div class="register">
        <div class="box">
          <div class="box-header">
            <h2>注册</h2>
          </div>
          <div class="box-main">
            <el-form label-width="80px">
              <el-form-item label="用户名">
                <el-input v-model="username" placeholder="请输入您的用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input type="password" v-model="checkPassword" placeholder="请重新输入密码"></el-input>
              </el-form-item>
            </el-form>
            <el-button @click="requestRegister">注册</el-button>
            <div class="box-url">
              <router-link to="/Login">
                已有账号，马上登录
              </router-link>
              |
              <router-link to="/">
                返回首页
              </router-link>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import md5 from 'js-md5'
  import ElFormItem from '../../node_modules/element-ui/packages/form/src/form-item'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
  export default {
    components: {
      ElCol,
      ElRow,
      ElFormItem},
    name: 'Register',
    data () {
      return {
        username: '',
        password: '',
        checkPassword: ''
      }
    },
    methods: {
      requestRegister: function () {
        if (this.username === '' || this.password === '') {
          this.$message('填写内容不能为空')
          return false
        }
        if (this.password !== this.checkPassword) {
          this.$message('两次输入密码不一致')
          return false
        }
        var that = this
        axios.post(this.Global.host + 'User/register', {
          username: that.username,
          password: md5(that.password)
        })
          .then(function (response) {
            console.log(response)
            // 判断响应码
            if (response.data.code === 101) {
              that.$message('用户名已存在，请直接登录')
            } else if (response.data.code === 102) {
              that.$message('注册失败，请稍后重试')
            } else if (response.data.code === 0) {
              that.$message('注册成功，请等待管理员完成审核')
              that.$router.push({ path: '/Login' })
            } else {
              that.$message('异常')
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
  .register{
    width: 100%;
    height: 100%;
    background: #f4f4f4;
    position: absolute;
    top:0;
    left: 0;
  }
  .el-row{
    height: 30px;
    line-height: 30px;
  }
  .el-row a{
    color: orangered;
  }
  .box{
    width: 70%;
    margin: 100px auto;
    position: relative;
  }
  .box-header{
    width: 100%;
    height: 76px;
    line-height: 76px;
    background: #ffd100;
    text-align: center;
    border-top-left-radius:4px;
    border-top-right-radius: 4px;
  }
  .box-header h2{
    font-weight: normal;
    font-size: 24px;
  }
  .box-main{
    background: white;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 20px 0px 30px 0px;
  }
  .box-main form{
    width: 50%;
    margin: 0 auto;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100% !important;
  }
  .el-button{
    width: 50%;
    background-color: rgb(255, 209, 0);
    border: 0;
    margin: 0 auto;
    display: block;
  }
  .box-url{
    text-align: right;
  }
  .box-url a{
    font-size: 12px;
    color: orangered;
    padding: 0px 10px 0px 10px;
    margin-top: 10px;
    display: inline-block;
  }
  @media screen and (max-width: 768px){
    .box{
      width: 100%;
      margin: 0;
    }
    .box-header{
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: #ffd100;
      text-align: center;
      border-top-left-radius:4px;
      border-top-right-radius: 4px;
    }
    .box-main form{
      width: 90%;
      margin: 0 auto;
    }
    .el-button{
      width: 90%;
      background-color: rgb(255, 209, 0);
      border: 0;
      margin: 0 auto;
      display: block;
    }
  }
</style>

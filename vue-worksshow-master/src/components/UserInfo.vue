<template>
    <div class="user-info">
      <div class="box">
        <el-row :gutter="20">
          <el-col class="left" :sm="6" :xs="24">
            <div class="user-img" @click="changeUserImg">
              <img :src="userImg">
            </div>
            <ul>
              <li @click="changeList(true)">
                个人信息
              </li>
              <li @click="changeList(false)">
                作品信息
              </li>
              <li>
                <router-link to="/UploadWorks">
                  上传作品
                </router-link>
              </li>
            </ul>
          </el-col>
          <el-col class="right" :sm="15" :xs="24">
            <el-tabs v-if="showList">
              <el-tab-pane label="个人信息">
                <ul v-if="changeInfoForm">
                  <li>
                    用户名：{{ username }}
                  </li>
                  <li>
                    昵称：{{ nickname }}
                  </li>
                  <li>
                    真实姓名：{{ realname }}
                  </li>
                  <li>
                    专业：{{ major }}
                  </li>
                  <li>
                    学校：{{ school }}
                  </li>
                  <li>
                    手机号码：{{ phone }}
                  </li>
                  <li>
                    <el-button class="primary" @click="changeInfo">完善信息</el-button>
                  </li>
                </ul>
                <ul v-else>
                  <el-form ref="form" :model="infoForm" label-width="80px">
                    <el-form-item label="昵称">
                      <el-input v-model="infoForm.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名">
                      <el-input v-model="infoForm.realname"></el-input>
                    </el-form-item>
                    <el-form-item label="专业">
                      <el-input v-model="infoForm.major"></el-input>
                    </el-form-item>
                    <el-form-item label="学校">
                      <el-input v-model="infoForm.school"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码">
                      <el-input v-model="infoForm.phone"></el-input>
                    </el-form-item>
                  </el-form>
                  <el-button type="primary" @click="updateUserInfo">提交信息</el-button>
                  <el-button @click="changeInfo">返回</el-button>
                </ul>
              </el-tab-pane>
            </el-tabs>
            <el-tabs v-else class="text-left">
              <el-tab-pane label="作品信息">
                <router-view></router-view>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
        <el-dialog
          class="dialog"
          title="修改头像"
          :visible.sync="centerDialogVisible"
          width="350px"
          center>
          <el-upload
            class="avatar-uploader"
            :action="action"
            :show-file-list="false"
            :data="uploadData"
            name="image"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus
             avatar-uploader-icon"></i>
          </el-upload>
        </el-dialog>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
  import ElButton from '../../node_modules/element-ui/packages/button/src/button'
  import ElForm from '../../node_modules/element-ui/packages/form/src/form'
  import ElFormItem from '../../node_modules/element-ui/packages/form/src/form-item'
  import ElInput from '../../node_modules/element-ui/packages/input/src/input'

  export default {
    components: {
      ElInput,
      ElFormItem,
      ElForm,
      ElButton,
      ElCol,
      ElRow},
    name: 'UserInfo',
    data () {
      return {
        action: this.Global.host + 'User/updateUserImg',
        centerDialogVisible: false,
        showList: true,
        changeInfoForm: true,
        auditStatus: '未提交审核',
        role: '普通用户',
        realname: '',
        userImg: './static/images/head.jpg',
        username: '',
        major: '',
        nickname: '',
        school: '',
        phone: '',
        works: '',
        website: '',
        netStar: 0,
        expertStar: 0,
        uploadDate: '',
        introduction: '',
        infoForm: {
          major: '',
          school: '',
          nickname: '',
          realname: '',
          phone: ''
        },
        imageUrl: '',
        uploadData: {
          token: '',
          worksid: ''
        },
        fileList: []
      }
    },
    methods: {
      uploadFileSuccess: function (response, file, fileList) {
        console.log(response)
        if (response.code === 0) {
         // console.log(this.worksUrl)
          this.$message('上传成功')
        //  console.log(response.data)
          this.requestInfo(this.uploadData.token)
        } else if (response.code === 804) {
          this.$message('请重新登录')
        } else if (response.code === 102) {
          this.$message('查无作品信息')
        } else if (response.code === 103) {
          this.$message('用户不匹配')
        } else if (response.code === 104) {
          this.$message('文件异常')
        } else if (response.code === 105) {
          this.$alert('解压失败，可能压缩包内文件名包含中文，请上传不包含任何中文命名文件的项目')
        }
      },
      uploadFileError: function (response, file, fileList) {
        console.log('error:' + response)
      },
      submitUpload () {
        this.$refs.upload.submit()
      },
      handleFileRemove (file, fileList) {
        console.log(file, fileList)
      },
      handleFilePreview (file) {
        console.log(file)
      },
      changeUserImg: function () {
        this.centerDialogVisible = true
      },
      changeInfo: function () {
        this.changeInfoForm = !this.changeInfoForm
      },
      changeList: function (list) {
        this.showList = list
      },
      // 修改个人信息
      updateUserInfo: function () {
        var that = this
        if (sessionStorage.user) {
          var userData = JSON.parse(sessionStorage.user)
          var token = userData.token
        } else {
          this.$message('请先登录')
          return false
        }
        axios.post(this.Global.host + 'User/updateUserInfo', {
          token: token,
          nickname: this.infoForm.nickname,
          major: this.infoForm.major,
          school: this.infoForm.school,
          realname: this.infoForm.realname,
          phone: this.infoForm.phone
        })
          .then(function (response) {
            console.log(response)
            if (response.data.code === 804) {
              that.$message('请重新登录')
            } else if (response.data.code === 101) {
              that.$message('修改失败')
            } else if (response.data.code === 0) {
              that.$message('修改成功')
              that.realname = that.infoForm.realname
              that.major = that.infoForm.major
              that.school = that.infoForm.school
              that.phone = that.infoForm.phone
              that.nickname = that.infoForm.nickname
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      requestInfo: function (token) {
        // var url = 'http://127.0.0.1/gallery/public/uploads/'
        var that = this
        // 根据用户id获取最新队伍信息、该队伍作品信息
        axios.post(this.Global.host + 'User/requestInfo', {
          token: token
        })
          .then(function (response) {
            // 判断响应码
            if (response.data.code === 804) {
              that.$message('请登录')
            } else if (response.data.code === 804) {
              that.$message('请登录')
            } else {
              var responseData = response.data.data
              that.uploadData.worksid = responseData.worksid
              that.works = responseData.works_name
              that.worksUrl = responseData.website
              that.netStar = responseData.net_star
              that.website = that.Global.projectUrl + responseData.website
              that.expertStar = responseData.expert_star
              that.uploadDate = responseData.create_time
              that.introduction = responseData.introduction
              that.team = responseData.team
              that.teamMembers = responseData.members
              that.teamTeachers = responseData.teachers
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
        var userData = JSON.parse(sessionStorage.user)
        var token = userData.token
        this.requestUserInfo(token)
        console.log(res)
        this.$message('修改头像成功')
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      loadingInfo: function () {
        console.log(sessionStorage.user)
        // return false
        // var imgUrl = 'http://127.0.0.1/gallery/public/uploads/headImg/'
        if (sessionStorage.user) {
          var userData = JSON.parse(sessionStorage.user)
          console.log(userData)
          this.username = userData.username
          this.infoForm.realname = userData.realname === '-1' ? '' : userData.realname
          this.realname = userData.realname === '-1' ? '未填写' : userData.realname
          this.nickname = userData.nickname === '-1' ? '未填写' : userData.nickname
          this.infoForm.nickname = userData.nickname === '-1' ? '' : userData.nickname
          if (userData.userImg !== '-1') {
            this.userImg = this.Global.headImgUrl + userData.userImg
          }
         // this.role = '认证专家11'
          if (userData.is_expert === '1') {
            this.role = '认证专家'
          } else {
            this.role = '普通用户'
          }
          this.major = userData.major === '-1' ? '未填写' : userData.major
          this.infoForm.major = userData.major === '-1' ? '' : userData.major
          this.school = userData.school === '-1' ? '未填写' : userData.school
          this.infoForm.school = userData.school === '-1' ? '' : userData.school
          this.phone = userData.phone === '-1' ? '未填写' : userData.phone
          this.infoForm.phone = userData.phone === '-1' ? '' : userData.phone
          // 获取队伍、作品信息
          // this.requestInfo(userData.token)
          this.uploadData.token = userData.token
        }
      },
      requestUserInfo: function (token) {
        var that = this
        // 根据用户id获取最新队伍信息、该队伍作品信息
        axios.post(this.Global.host + 'User/requestUserInfo', {
          token: token
        })
          .then(function (response) {
            if (response.data.code === 0) {
              sessionStorage.user = JSON.stringify(response.data.data)
              that.loadingInfo()
            } else {
              that.$alert('请登录')
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    created: function () {
      // this.checkAudit()
      this.loadingInfo()
    },
    mounted: function () {
     // this.requestUserInfo(JSON.parse(sessionStorage.user).token)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .upload-demo{
    margin-top: 10px;
  }
  section{
    margin-top: 15px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .el-upload__tip{
    color: orangered;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .user-info{
    width: 100%;
    height: 100%;
    position: absolute;
    overflow-x: hidden;
    top:0px;
    background: #f4f4f4;
  }
  .el-tabs{
    padding-left: 20px;
  }
  .text-left{
    text-align: left;
  }
  .box{
    text-align: center;
    width: 60%;
    margin: 100px auto;
  }
  .box .el-col{
    background: white;
  }
  .box ul li{
    list-style: none;
  }
  .user-img{
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 100%;
    margin: 50px auto 20px auto;
    cursor: pointer;
  }
  .el-col{
    box-shadow: 0 0 5px 1px rgba(0,0,0,.1);
  }
  .right p{
    font-size: 14px;
    line-height: 25px;
    text-indent: 28px;
    padding-right: 20px;
  }
  .user-img img{
    width: 100%;
    height: 100%;
  }
  .left{
    padding-bottom: 50px;
  }
  .left ul li{
    line-height: 40px;
    height: 40px;
    cursor: pointer;
  }
  .left ul li:hover a, .left ul li:hover{
    color: orangered;
  }
  .right{
    padding: 20px 20px 50px 20px ;
    margin-left: 20px;
  }
  .right li{
    line-height: 40px;
    height: 40px;
    font-size: 16px;
  }
  @media screen and (max-width: 768px) {
    .el-dialog{
      width: 80% !important;
    }
    .box{
      text-align: left;
      width: 100%;
      margin: 61px auto;
    }
    .user-img{
      width: 50px;
      height: 50px;
      overflow: hidden;
      border-radius: 100%;
      margin: 20px auto 10px auto;
    }
    .left{
      padding-bottom: 20px;
    }
    .left ul{
      text-align: center;
    }
    .left ul li{
      display: inline-block;
      padding: 0px 10px 0px 10px;
    }
    .right{
      margin-top: 10px;
      margin-left: 0;
    }
    .right ul{
      padding-left: 0px;
    }
    .right form{
      margin: 0;
      text-align: left;
    }
    .el-form{
      width: 90%;
      margin: 0 auto;
    }
  }

</style>

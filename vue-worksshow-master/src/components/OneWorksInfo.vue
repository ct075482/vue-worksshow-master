<template>
    <div class="one-works-info">
      <a href="javascript:history.back()"><i class="iconfont">&#xe602;</i>返回</a>
      <ul>
        <li>
          作品名称：{{ works }}
        </li>
        <li v-if="hasWeb">
          预览地址：<a :href="website" target="_blank">点击预览</a>
        </li>
        <li>
          网友点赞：{{ netStar }}
        </li>
        <li>
          专家点赞：{{ expertStar }}
        </li>
        <li>
          上传时间：{{ uploadDate }}
        </li>
        <li>
          作品介绍：
        </li>
        <p>
          {{ introduction }}
        </p>
      </ul>
      <section>
        上传项目文件生成预览地址：
      </section>
      <el-upload
        class="upload-demo"
        ref="upload"
        :data="uploadData"
        name="file"
        :action="action"
        :on-preview="handleFilePreview"
        :on-remove="handleFileRemove"
        :file-list="fileList"
        :on-success="uploadFileSuccess"
        :on-error="uploadFileError"
        accept="zip"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">上传项目静态文件压缩包、以供预览展示,目前仅支持 zip 格式，文件夹名请跟压缩包名保持一致，文件名请不要包含任何中文</div>
      </el-upload>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'OneWorksInfo',
    data () {
      return {
        action: this.Global.host + 'Works/uploadWorksFile',
        hasWeb: true,
        works: '',
        website: '',
        netStar: 0,
        expertStar: 0,
        uploadDate: '',
        introduction: '',
        uploadData: {
          token: '',
          worksid: ''
        },
        fileList: []
      }
    },
    methods: {
      // 上传图片成功触发
      uploadFileSuccess: function (response, file, fileList) {
        console.log(response)
        if (response.code === 0) {
          // console.log(this.worksUrl)
          this.$message('上传成功')
          //  console.log(response.data)
          this.requestInfo(this.uploadData.worksid)
        } else if (response.code === 101) {
          this.$alert('请重新登录')
        } else if (response.code === 102) {
          this.$message('查无作品信息')
        } else if (response.code === 103) {
          this.$message('用户不匹配')
        } else if (response.code === 104) {
          this.$alert('文件异常')
        } else if (response.code === 105) {
          this.$alert('解压失败，可能压缩包内文件名包含中文，请上传不包含任何中文命名文件的项目')
        } else if (response.code === 106) {
          this.$alert('不在允许上传时间范围内')
        } else {
          this.$alert('未知错误，请联系管理员')
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
      // 请求作品信息
      requestInfo: function (worksId) {
        // var url = 'http://127.0.0.1/gallery/public/uploads/project/'
        var that = this
        // 根据用户id获取最新队伍信息、该队伍作品信息
        axios.post(this.Global.host + 'Works/getOneWorksInfo', {
          works_id: worksId
        })
          .then(function (response) {
            // 判断响应码
            if (response.data.code === 803) {
              that.$message('请登录')
            } else if (response.data.code === 101) {
              that.$message('请登录')
            } else if (response.data.code === 0) {
              var responseData = response.data.data
              if (responseData.website === '-1') {
                that.hasWeb = false
              }
              that.works = responseData.works_name
              that.netStar = responseData.net_star
              that.website = that.Global.projectUrl + responseData.website
              that.expertStar = responseData.expert_star
              that.uploadDate = responseData.create_time
              that.introduction = responseData.introduction
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    mounted: function () {
      this.uploadData.token = JSON.parse(sessionStorage.user).token
      // 获取作品id
      this.uploadData.worksid = this.$route.params.worksId
      this.requestInfo(this.$route.params.worksId)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li{
    line-height: 30px;
  }
  li+ p{
    text-indent: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    line-height: 25px;
  }
  section{
    padding-bottom: 5px;
  }
  .el-upload__tip{
    color: orangered;
  }
  .iconfont{
    color: orangered;
    font-size: 20px;
    display: inline-block;
    vertical-align: middle;
  }
  .one-works-info > a {
    color: orangered;
  }
</style>

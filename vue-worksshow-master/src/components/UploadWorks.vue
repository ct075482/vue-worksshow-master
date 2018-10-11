<template>
    <div class="upload-works">
      <div class="box">
       <el-form label-width="80px">
         <el-form-item label="选择赛事">
           <el-select v-model="matchId" placeholder="请选择赛事">
             <el-option v-for="item in matchList" v-bind:key="item.match_id" :label="item.match_name" :value="item.match_id"></el-option>
           </el-select>
         </el-form-item>
          <el-form-item label="作品名称">
            <el-input v-model="works" placeholder="请输入作品名称"></el-input>
          </el-form-item>
          <el-form-item label="作品介绍">
            <el-input
              type="textarea"
              autosize
              placeholder="作品介绍"
              v-model="introduction">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="upload-demo"
              :action="action"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="images"
              :data="uploadData"
              :onSuccess="uploadSuccess"
              :onError="uploadError"
              name="images[]"
              multiple
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="uploadInfo">上传</el-button>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import ElFormItem from '../../node_modules/element-ui/packages/form/src/form-item'
  export default {
    components: {ElFormItem},
    name: 'UploadWorks',
    data () {
      return {
        action: this.Global.host + 'Works/uploadWorks',
        token: '',
        works: '',
        website: '',
        introduction: '',
        images: [],
        strImage: '',
        matchId: '',
        matchList: [],
        uploadData: {
          token: ''
        }
      }
    },
    methods: {
      getMatchList () {
        var that = this
        axios.post(this.Global.host + 'Match/getMatchList')
          .then(function (res) {
            console.log(res)
            if (res.data.code === 0) {
              that.matchList = []
              for (let i = 0; i < res.data.data.length; i++) {
                that.matchList.push({
                  match_id: res.data.data[i].match_id,
                  match_name: res.data.data[i].match_name
                })
              }
            } else {
              that.$alert('当前没有可上传的赛事')
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      uploadSuccess: function (response, file, fileList) {
        console.log(response)
        if (response.code === 0) {
          if (this.strImage === '') {
            this.strImage = response.data.img
          } else {
            this.strImage = this.strImage + ',' + response.data.img
          }
          this.$message('上传成功')
        } else if (response.code === 102) {
          this.$message('图片格式不对或者图片超过规定大小')
        } else if (response.code === 101) {
          this.$message('请先登录')
        }
      },
      uploadError: function (response, file, fileList) {
        console.log('error:' + response)
      },
      uploadInfo: function () {
        if (this.works === '' || this.introduction === '' || this.matchId === '' || this.strImage === '') {
          this.$message('填写信息不能为空')
          return false
        }
        var that = this
        axios.post(this.Global.host + 'Works/uploadWorksInfo', {
          token: that.uploadData.token,
          worksname: that.works,
          introduction: that.introduction,
          pictures: that.strImage,
          match_id: that.matchId
        })
          .then(function (response) {
            console.log(response)
            // 判断响应码
            if (response.data.code === 803) {
              that.$message('参数异常')
            } else if (response.data.code === 101) {
              that.$message('请先登录')
            } else if (response.data.code === 102) {
              that.$message('提交失败')
            } else if (response.data.code === 0) {
              that.$message('成功')
            } else if (response.data.code === 103) {
              that.$message('作品名已存在')
            } else {
              that.$alert('未知错误，请联系管理员')
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    created: function () {
      if (sessionStorage.user) {
        var userData = JSON.parse(sessionStorage.user)
        this.uploadData.token = userData.token
        console.log(this.uploadData.token)
      } else {
        console.log(11)
      }
    },
    mounted: function () {
      this.getMatchList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .upload-works{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0px;
    background: #f4f4f4;
  }
  .box{
    width: 60%;
    margin: 100px auto;
  }
  .el-button{
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    .box{
      width: 95%;
      margin: 80px auto;
    }
  }
</style>

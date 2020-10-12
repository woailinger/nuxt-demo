<template>
<div class="page">
  <div class="left">
    <div class="top">
      <div class="avatar">
        <img class="img" :src="$store.state.userInfo.avatar || imgDataUrl" alt="">
      </div>
      <div class="userName">{{$store.state.userInfo.userName}}</div>
    </div>
    <van-cell title="Profile" is-link url="/h5/my/profile" />
    <van-cell title="Comments" is-link to="/h5/my/comments" />
    <van-cell title="Likes" is-link to="/h5/my/likes" />
    <van-cell title="ResetPwd" is-link to="/h5/my/resetPwd" />
    <van-cell title="Newsletter" is-link to="/h5/my/newsletter" />
    <van-cell title="FindPwd" is-link to="/h5/my/findPwd" />
  </div>
</div>
</template>
<script>
  export default {
    layout: "blank",
    head() {
      return {
        title: 'MyInfo',
        meta: [{ name: "description", hid: "description", content: "page aaaa"}],
        link: [{ rel: "favicon", href: "favicon.ico" }]
      }
    },
    middleware: 'notTokenenticated',
    asyncData(context) {
     if (!context.isMobile) {
       context.redirect('/my/');
     }
    },
    data() {
      return {
        userName: '',
        mode: 'inline',
        theme: 'light',
        show: false,
        imgDataUrl: require('~/assets/img/Asha-Go-dark-circle-logo-no-text.png'),
        active: 1,
        loading: false,
        modifyForm: this.$form.createForm(this, { name: 'horizontal_modify' }),
        confirmDirty: false,
        hasErrors: fieldsError => {
          return Object.keys(fieldsError).some(field => fieldsError[field]);
        }
      }
    },
    methods: {
      handleClickItem (type) {
        this.active = type;
      },
      toggleShow() {
        this.show = !this.show;
      },
      cropSuccess(imgDataUrl, field){
        console.log('-------- crop success --------');
        this.imgDataUrl = imgDataUrl;
      },
      /**
       * upload success
       *
       * [param] jsonData   服务器返回数据，已进行json转码
       * [param] field
       */
      cropUploadSuccess(jsonData, field){
        console.log('-------- upload success --------');
        console.log(jsonData);
        console.log('field: ' + field);
      },
      /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
      cropUploadFail(status, field){
        console.log('-------- upload fail --------');
        console.log(status);
        console.log('field: ' + field);
      },
      handleSubmitModify (e) {
        e.preventDefault();
        this.reSetPwdForm.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      },
      handleChangeTab (num) {
        this.active = num;
      }
    }
  }
</script>
<style lang="less" scoped>
  .page {
    padding: 20px;
    display: flex;
    overflow-x: auto;
    justify-content: center;
    .left {
      //margin-left: 100px;
      margin-top: 40px;
      width: 100%;
      .top {
        //width: 260px;
        padding: 30px 30px;
        //border: 1px solid #8D050B;
        .avatar {
          text-align: center;
          position: relative;
          margin-bottom: 10px;
          .img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
          }
        }
        .userName {
          text-align: center;
          margin: 0 auto;
          line-height: 40px;
          font-size: 20px;
          color: #8D050B;
        }
        .follow {
          margin: 0 auto;
          margin-top: 30px;
          display: flex;
          .item {
            width: 50%;
            padding: 0 20px;
            color: #8D050B;
            font-size: 20px;
            text-align: center;
            cursor: pointer;
          }
          .item:first-child {
            border-right: 1px solid #8D050B;
          }
        }
      }
      .bottom {
        width: 260px;
        margin-top: 20px;
        padding: 10px 30px;
        border: 1px solid #8D050B;
        color: #8D050B;
        font-size: 18px;
        .title {
          font-size: 20px;
          line-height: 40px;
        }
        ul, li{
          list-style: none;
          padding: 0;
        }
        .list {
          li {
            font-size: 16px;
            line-height: 60px;
            cursor: pointer;
          }
          .active {
            font-size: 18px;
            font-weight: 600;
          }
          li:hover {
            font-size: 20px;
            font-weight: 600;
          }
        }
      }
    }
    .right {
      margin: 0px;
      margin-left: 40px ;
      padding: 0 50px;
    }
  }
</style>

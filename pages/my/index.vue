<template>
<div class="page">
  <div class="left">
    <div class="top">
      <div class="avatar">
        <img class="img" :src="$store.state.userInfo.avatar || imgDataUrl" alt="">
      </div>
      <div class="userName">{{$store.state.userInfo.userName}}</div>
    </div>
    <div class="bottom">
      <ul class="list">
        <li @click="handleClickItem(1)" :class="active === 1 ? 'active' : ''">Profile</li>
        <li @click="handleClickItem(2)" :class="active === 2 ? 'active' : ''">Comments</li>
        <li @click="handleClickItem(3)" :class="active === 3 ? 'active' : ''">Likes</li>
        <li @click="handleClickItem(4)" :class="active === 4 ? 'active' : ''">Change Password</li>
        <!-- <li @click="handleClickItem(5)" :class="active === 5 ? 'active' : ''">Newsletter</li> -->
      </ul>
    </div>
    <client-only>
      <avatar field="img"
              @crop-success="cropSuccess"
              @crop-upload-success="cropUploadSuccess"
              @crop-upload-fail="cropUploadFail"
              v-model="show"
              :width="300"
              :height="300"
              url="/upload"
              img-format="png" />
    </client-only>
  </div>
  <div class="right">
    <Profile v-if="active === 1" />
    <Comments v-if="active === 2" />
    <Likes v-if="active === 3" />
    <ResetPwd v-if="active === 4" @changeTab="handleChangeTab" />
    <Newsletter v-if="active === 5" />
    <FindPwd v-if="active === 6" />
    <div class="modifyUserInfo">
      <a-form :form="modifyForm" @submit="handleSubmitModify" class="form">
      </a-form>
    </div>
  </div>
</div>
</template>
<script>
  import Profile from './components/Profile.vue';
  import Comments from './components/Comments.vue';
  import Notifications from './components/Notifications.vue';
  import ResetPwd from './components/ResetPwd.vue';
  import Newsletter from './components/Newsletter.vue';
  import Likes from './components/Likes.vue';
  export default {
    head() {
      return {
        title: 'MyInfo',
        meta: [{ name: "description", hid: "description", content: "page aaaa"}],
        link: [{ rel: "favicon", href: "favicon.ico" }]
      }
    },
    middleware: 'notTokenenticated',
    components: {
      Profile,
      Comments,
      Notifications,
      ResetPwd,
      Newsletter,
      Likes
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
    .left {
      margin-left: 100px;
      margin-top: 40px;
      .top {
        width: 260px;
        padding: 30px 30px;
        border: 1px solid #8D050B;
        .avatar {
          text-align: center;
          position: relative;
          margin-bottom: 10px;
          .img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
          }
          .dropdown {
            position: absolute;
            right: 20px;
            transform: rotate(90deg);
            font-size: 30px;
            color: #8D050B;
            cursor: pointer;
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
            font-size: 18px;
            line-height: 60px;
            cursor: pointer;
          }
          .active {
            font-size: 20px;
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
      /*flex: 1;*/
      margin: 0px;
      margin-left: 20px ;
      padding: 0 50px;
      /*overflow: auto;*/
    }
  }
</style>

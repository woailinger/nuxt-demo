<template>
<div class="page">
  <div class="left">
    <div class="top">
      <div class="avatar">
        <img class="img" :src="imgDataUrl" alt="">
        <a-dropdown>
          <span class="dropdown" @click="e => e.preventDefault()">...</span>
          <a-menu slot="overlay">
            <a-menu-item>
              <span @click="toggleShow">修改头像</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="userName">hello Tom</div>
      <div class="follow">
        <div class="item">
          <div class="num">1</div>
          <div class="name">Follows</div>
        </div>
        <div class="item">
          <div class="num">0</div>
          <div class="name">Following</div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title">Profile</div>
      <ul class="list">
        <li @click="handleClickItem(1)" :class="active === 1 ? 'active' : ''">重置密码</li>
        <li @click="handleClickItem(2)" :class="active === 2 ? 'active' : ''">修改个人资料</li>
        <li @click="handleClickItem(3)" :class="active === 3 ? 'active' : ''">功能2222</li>
        <li @click="handleClickItem(4)" :class="active === 4 ? 'active' : ''">功能3333</li>
        <li @click="handleClickItem(5)" :class="active === 5 ? 'active' : ''">功能4444</li>
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
    <div class="resetPwd" v-if="active === 1">
      <a-form :form="reSetPwdForm" @submit="handleSubmit" class="form">
        <a-form-item>
          <a-input
            v-decorator="[
          'oldPwd',
          {
            rules: [
              { required: true, message: 'Please input your oldPwd!' }
            ]
          },
        ]"
            type="password"
            placeholder="oldPwd"
            size="large"
          >
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item has-feedback>
          <a-input
            v-decorator="[
          'token',
          {
            rules: [
              { required: true, message: 'Please input your Password!' },
              { validator: validateToNextPassword }
            ]
          },
        ]"
            type="password"
            placeholder="Password"
            size="large"
          >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item has-feedback>
          <a-input
            v-decorator="[
          'confirmPassword',
          {
            rules: [
              { required: true, message: 'The passwords entered twice do not match!' },
              { validator: compareToFirstPassword }
            ]
          }
        ]"
            type="password"
            placeholder="Confirm password"
            size="large"
            @blur="handleConfirmBlur"
          >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="register" :loading="loading">
            Reset Pwd
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="modifyUserInfo">
      <a-form :form="modifyForm" @submit="handleSubmitModify" class="form">

      </a-form>
    </div>
  </div>
</div>
</template>
<script>
  export default {
    head() {
      return {
        title: 'MyInfo',
        meta: [{ name: "description", hid: "description", content: "page aaaa"}],
        link: [{ rel: "favicon", href: "favicon.ico" }]
      }
    },
    layout: "blank",
    middleware: 'notTokenenticated',
    data() {
      return {
        mode: 'inline',
        theme: 'light',
        show: false,
        imgDataUrl: require('~/assets/img/Asha-Go-dark-circle-logo-no-text.png'),
        active: 1,
        loading: false,
        reSetPwdForm: this.$form.createForm(this, { name: 'horizontal_reset' }),
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
      passwordError() {
        const { getFieldError, isFieldTouched } = this.reSetPwdForm;
        return isFieldTouched('token') && getFieldError('token');
      },
      handleConfirmBlur(e) {
        const value = e.target.value;
        this.confirmDirty = this.confirmDirty || !!value;
      },
      validateToNextPassword(rule, value, callback) {
        const form = this.reSetPwdForm;
        if (value && this.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      },
      compareToFirstPassword(rule, value, callback) {
        const form = this.reSetPwdForm;
        if (value && value !== form.getFieldValue('token')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      },
      handleSubmit(e) {
        e.preventDefault();
        this.reSetPwdForm.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.reSetPwd(values);
          }
        });
      },
      reSetPwd (values) {
        this.$Server({
          url: 'user/resetPwd',
          method: 'post',
          data: {
            token: encryption(values['token'])
          }
        }).then(res => {
          this.loading = false;
        })
      },
      handleSubmitModify (e) {
        e.preventDefault();
        this.reSetPwdForm.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }
    }
  }
</script>
<style lang="less" scoped>
  .page {
    padding: 20px;
    display: flex;
    .left {
      width: 350px;
      .top {
        padding: 30px 50px;
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
          border-bottom: 2px solid #8D050B;
          line-height: 40px;
          font-size: 30px;
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
        margin-top: 20px;
        padding: 10px 50px;
        border: 1px solid #8D050B;
        color: #8D050B;
        .title {
          font-size: 25px;
          line-height: 40px;
        }
        ul, li{
          list-style: none;
          padding: 0;
        }
        .list {
          li {
            font-size: 18px;
            line-height: 40px;
            cursor: pointer;
          }
          .active {
            font-size: 22px;
            font-weight: 600;
          }
          li:hover {
            font-size: 22px;
            font-weight: 600;
          }
        }
      }
    }
    .right {
      padding: 120px 50px 0 30px;
    }
  }
</style>

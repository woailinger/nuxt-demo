<template>
  <div class="container">
    <img class="logo" src="../assets/img/Asha-Go-dark-circle-logo-no-text.png" alt="logo">
    <div class="title">Login</div>
    <a-form :form="form" @submit="handleSubmit" class="form">
      <a-form-item :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
        <a-input
          v-decorator="[
          'email',
          {
            rules: [
              { type: 'email', message: 'The input is not valid E-mail!' },
              { required: true, message: 'Please input your email!' }
            ]
          },
        ]"
          placeholder="Email"
          size="large"
        >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
        <a-input
          v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your password' }] },
        ]"
          type="password"
          placeholder="Password"
          size="large"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" block :loading="loading" :disabled="hasErrors(form.getFieldsError())">
          Login
        </a-button>
      </a-form-item>
      <div class="others">
        <!-- <span>
          Other login methods
          <a-icon class="icon" type="facebook" @click="fbLogin"/>
          <a-icon class="icon" style="font-size: 24px" @click="wxLogin" type="wechat" />
          <div id="login_container"> test</div>
        </span> -->
        <a-button class="register" type="link" @click="handleToRegister">Sign Up</a-button>
        <a-button class="register" type="link" @click="handleToForgot">Forgot password?</a-button>
      </div>
    </a-form>
  </div>
</template>
<script>
  const Cookie = process.client ? require('js-cookie') : undefined
  import Utils from '@/tools/Utils.js';
  const { encryption } = Utils;
  export default {
    middleware: 'notTokenenticated',
    layout: "blank",
    data () {
      return {
        loading: false,
        form: this.$form.createForm(this, { name: 'horizontal_login' }),
        hasErrors: fieldsError => {
          return Object.keys(fieldsError).some(field => fieldsError[field]);
        }
      }
    },
    mounted() {
      // var obj = new WxLogin({
      //   self_redirect:true,
      //   id: "login_container",
      //   appid: "wx2b4b189cd5930702",
      //   scope: "snsapi_login",
      //   redirect_uri: "http://ashago-dev.cc2dbe1fd91f042528f96dc27c2dba5fe.cn-zhangjiakou.alicontainer.com/",
      //   state: "",
      //   style: "",
      //   href: ""
      // });
      this.$nextTick(() => {
        // To disabled submit button at the beginning.
        this.form.validateFields();
      });
    },
    methods: {
      handleToRegister () {
        this.$router.push('/register');
      },
      handleToForgot() {
        this.$router.push('/FindPwd');
      },
      userNameError() {
        const { getFieldError, isFieldTouched } = this.form;
        return isFieldTouched('email') && getFieldError('email');
      },
      // Only show error after a field is touched.
      passwordError() {
        const { getFieldError, isFieldTouched } = this.form;
        return isFieldTouched('password') && getFieldError('password');
      },
      wxLogin() {

      },
      fbLogin() {
        FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response) {
                  console.log('Good to see you, ' + response.name + '.');
                });
                } else {
                console.log('User cancelled login or did not fully authorize.');
                }
            });
        // window.fbAsyncInit = function() {
          // FB.init({
          //   appId            : '2816565075139161',
          //   autoLogAppEvents : true,
          //   xfbml            : true,
          //   version          : 'v7.0'
          // });
          // FB.login(function(response) {
          //   if (response.authResponse) {
          //       console.log('Welcome!  Fetching your information.... ');
          //       FB.api('/me', function(response) {
          //         console.log('Good to see you, ' + response.name + '.');
          //       });
          //       } else {
          //       console.log('User cancelled login or did not fully authorize.');
          //       }
          //   });
        // };
      },
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.postLogin(values);
          } else {
            return false;
          }
        });
      },
      postLogin (values) {
        this.loading = true
//        setTimeout(() => {
//          const auth = {
//            token: 'someStringGotFromApiServiceWithAjax'
//          }
//          this.$store.commit('setAuth', auth)
//          Cookie.set('auth', auth);
//          this.loading = false
//          this.$router.push('/')
//        }, 3000)
        this.$Server({
          url: 'user/login',
          method: 'post',
          data: {
            password: encryption(values.password),
            email: values.email
          }
        }).then(res => {
          if (res.code == 0) {
            Cookie.set('_t', res.data.t);
            this.$store.commit('setToken', res.data.t);
            this.$store.commit('setUserId', res.data.userId || '');
            this.$router.push('/')
          }
        }).finally(data => {
          this.loading = false;
        });
      }
    }
  }
</script>
 <style scoped lang="less">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  background: #f0f2f5;
//   background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  .logo {
    margin-top: 50px;
    height: 100px;
  }
  .title {
    line-height: 120px;
    font-size: 50px;
  }
  .form {
    width: 320px;
  }
  .login {
    width: 100%;
  }
  .register {

  }
  .others {
    height: 32px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    .icon {
      font-size: 24px;
      cursor: pointer;
    }
    .icon:hover {
      color: #1890ff;
    }
  }
}
</style>

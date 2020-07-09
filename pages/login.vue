<template>
  <div class="container">
    <div class="title">Sign Up</div>
    <a-form :form="form" @submit="handleSubmit" class="form">
      <a-form-item :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
        <a-input
          v-decorator="[
          'userName',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
          placeholder="Username"
          size="large"
        >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
        <a-input
          v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
          type="password"
          placeholder="Password"
          size="large"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" block :loading="loading">
          Login
        </a-button>
      </a-form-item>
      <div class="others">
        <span>
          其他方式登录
          <a-icon class="icon" type="facebook" />
          <a-icon class="icon" style="font-size: 24px" type="wechat" />
        </span>
        <a-button class="register" type="link" @click="handleToRegister">Register</a-button>
      </div>
    </a-form>
  </div>
</template>
<script>
  const Cookie = process.client ? require('js-cookie') : undefined
  export default {
    layout: 'blank',
    middleware: 'notTokenenticated',
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
      this.$nextTick(() => {
        // To disabled submit button at the beginning.
        this.form.validateFields();
      });
    },
    methods: {
      handleToRegister () {
        this.$router.push('/register');
      },
      userNameError() {
        const { getFieldError, isFieldTouched } = this.form;
        return isFieldTouched('userName') && getFieldError('userName');
      },
      // Only show error after a field is touched.
      passwordError() {
        const { getFieldError, isFieldTouched } = this.form;
        return isFieldTouched('password') && getFieldError('password');
      },
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.postLogin(values);
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
          url: 'api/login',
          method: 'post',
          data: values
        }).then(res => {
          this.loading = false;
          if (res.ok === 1) {
            this.$store.commit('setToken', res.token);
            this.$router.push('/')
          } else {
            this.$message.error('Wrong account or password. Please try again.');
          }
        })
      }
    }
  }
</script>
 <style scoped lang="less">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  background: #f0f2f5;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
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

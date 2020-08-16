<template>
  <div class="container">
    <img class="logo" src="../assets/img/Asha-Go-dark-circle-logo-no-text.png" alt="logo">
    <div class="title">Register</div>
    <a-form :form="form" @submit="handleSubmit" class="form">
      <a-form-item>
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
          placeholder="email"
          size="large"
        >
          <a-icon slot="prefix" type="mail" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
          'userName',
          {
            rules: [
              { required: true, message: 'Please input your userName!' }
            ]
          },
        ]"
          placeholder="userName"
          size="large"
        >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item has-feedback>
        <a-input
          v-decorator="[
          'password',
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
        <a-checkbox v-decorator="['agreement', { valuePropName: 'checked' }]">
          I have read the
          <a href="/agreement" target="_blank">
            agreement
          </a>
        </a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-checkbox v-decorator="['subscribed', { valuePropName: 'checked' }]">
          Subscribe to email？
        </a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="register" :loading="loading">
          Register
        </a-button>
        <a-button type="link" class="toLogin" @click="handleToLogin">Already have an account?</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
  import Utils from '@/tools/Utils.js';
  const { encryption } = Utils;
  export default {
    middleware: 'notTokenenticated',
    layout: "blank",
    data () {
      return {
        loading: false,
        form: this.$form.createForm(this, { name: 'horizontal_login' }),
        confirmDirty: false,
        hasErrors: fieldsError => {
          return Object.keys(fieldsError).some(field => fieldsError[field]);
        }
      }
    },
    mounted() {
    },
    methods: {
      handleToLogin() {
        this.$router.push('/login');
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
      handleConfirmBlur(e) {
        const value = e.target.value;
        this.confirmDirty = this.confirmDirty || !!value;
      },
      confirmPasswordError() {
        const { getFieldError, isFieldTouched } = this.form;
        return isFieldTouched('password') && getFieldError('password');
      },
      validateToNextPassword(rule, value, callback) {
        const form = this.form;
        if (value && this.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      },
      compareToFirstPassword(rule, value, callback) {
        const form = this.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      },
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            if (!values.agreement) {
              // 请勾选协议
              this.$message.warning('Please read and tick the agreement carefully.');
              return
            }
            this.postLogin(values);
          }
        });
      },
      postLogin (values) {
        console.log(values, '---');
        this.loading = true
        this.$Server({
          url: 'user/register',
          method: 'post',
          data: {
            email: values.email,
            password: encryption(values['password']),
            subscribed: !!values.subscribed,
            userName: values.userName,
          }
        }).then(res => {
          this.loading = false;
          if (res.code === 0) {
//            this.$store.commit('setToken', res.data.token);
            this.$router.push('/getStarted');
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
    flex-direction: column;
    align-items: center;
    overflow: auto;
    background: #f0f2f5;
    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
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
    .register {
      width: 125px
    }
    .toLogin {
      width: 195px;
    }
  }
</style>

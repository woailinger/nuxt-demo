<template>
  <div class="container">
    <img class="logo pointer" src="../assets/img/Asha-Go-dark-circle-logo-no-text.png" alt="logo">
    <div class="title">Sign Up</div>
    <a-form :form="form" @submit="handleSubmit" class="form">
      <a-form-item>
        <a-input
          v-decorator="[
          'email',
          {
            rules: [
              { type: 'email', message: 'Invalid email' },
              { required: true, message: 'Email is required' }
            ]
          },
        ]"
          placeholder="Email"
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
              { required: true, message: 'Username is required' }
            ]
          },
        ]"
          placeholder="Username"
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
              { required: true, message: 'Password is required' },
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
              { required: true, message: 'Passwords do not match' },
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
      <a-form-item style="margin-bottom: 0">
        <a-checkbox v-decorator="['agreement', { valuePropName: 'checked' }]">
          I have read the
          <a href="/agreement" target="_blank">
            user agreement
          </a>
        </a-checkbox>
      </a-form-item>
      <a-form-item style="margin-bottom: 0">
        <a-checkbox v-decorator="['subscribed', { valuePropName: 'checked' }]">
          Subscribe
        </a-checkbox>
      </a-form-item>
      <a-form-item style="text-align: center; margin-bottom: 0">
        <a-button type="primary" html-type="submit" class="register" :loading="loading">
          Sign Up
        </a-button>
      </a-form-item>
      <div style="text-align: center">
        <a-button type="link" class="toLogin" @click="handleToLogin">Already have an account?</a-button>
      </div>
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
          callback('The passwords don\'t match');
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
              this.$message.warning('Please check the box to accept our user agreement.');
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
          if (res.code == 0) {
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
      margin-top: 5px;
      width: 195px;
    }
  }
</style>

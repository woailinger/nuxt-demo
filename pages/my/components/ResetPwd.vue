<template>
  <div class="resetPwd">
    <div class="title">Change Passwords</div>
    <a-form :form="reSetPwdForm" @submit="handleSubmit" class="form" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }" labelAlign="left">
      <a-form-item label="Old password">
        <a-col :span="15">
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
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25);" />
          </a-input>
        </a-col>
        <a-col :span="7" :offset="2" class="forgetPwd" @click="forget">Forget password ?</a-col>
      </a-form-item>
      <a-form-item has-feedback label="New password">
        <a-col :span="15">
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
        </a-col>
      </a-form-item>
      <a-form-item has-feedback label="Confirm password">
        <a-col :span="15">
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
        </a-col>
        
      </a-form-item>
      <a-form-item>
        <div class="button">
          <a-button type="primary" html-type="submit" class="register" :loading="loading">
            Save
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      reSetPwdForm: this.$form.createForm(this, { name: 'horizontal_reset' }),
      loading: false,
      codeDisabled: false
    }
  },
  methods: {
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
        url: '/user/change-password',
        method: 'post',
        data: {
          userId: this.$store.state.userId,
          oldPassword: this.oldPassword,
          newPassword: this.confirmPassword,
        }
      }).then(res => {
        this.loading = false;
      })
    },
    forget() {
      this.$emit('changeTab', 6);
    },
     /***
     * 校验code值
     */
    handleGetCode () {
      this.codeDisabled = true;
      this.deadline = Date.now() + 1000 * 60;
      this.$Server({
        url: '/vcode/send-email',
        method: 'post',
        data: {
          email: this.$store.state.email,
          scene: 'RESET_PASSWORD'
        }
      })
    },
    onFinish () {
      this.codeDisabled = false;
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
    }
  }
}
</script>
<style scoped lang="less">
  .form {
    margin: 0 auto;
    width: 700px;
  }
  .title {
    text-align: center;
    color: #8D050B;
    line-height: 200px;
    font-size: 40px;
    font-weight: 500;
  }
  .forgetPwd {
    display: inline-block;
    border: 1px solid #ccc;
    text-align: center;
    cursor: pointer;
  }
  .button {
    text-align: center;
  }
</style>

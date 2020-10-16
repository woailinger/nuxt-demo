<template>
  <div class="resetPwd">
    <div class="title">Change Passwords</div>
    <a-form :form="reSetPwdForm" @submit="handleSubmit" class="form" labelAlign="left">
      <a-form-item>
        <a-col :span="13">
          <a-input
            v-decorator="[
          'oldPassword',
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
        <a-col :span="10" :offset="1" class="forgetPwd" @click="forget">Forget password ?</a-col>
      </a-form-item>
      <a-form-item has-feedback>
        <a-input
          v-decorator="[
          'newPassword',
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
  layout: "blank",
  data () {
    return {
      reSetPwdForm: this.$form.createForm(this, { name: 'horizontal_reset' }),
      loading: false,
      codeDisabled: false,
      seqNo: ''
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
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        }
      }).then(res => {
        this.loading = false;
        if (res.msg === 'success') {
        }
      })
    },
    forget() {
//      this.$emit('changeTab', 6);
      this.$router.push('/findPassword');
    },
    /***
     * 校验code值
     */
    handleGetCode () {
      this.codeDisabled = true;
      this.deadline = Date.now() + 1000 * 60;
      const form = this.reSetPwdForm;
      if (!form.getFieldValue('email')) {
        this.passwordError()
        return;
      }
      this.$Server({
        url: '/vcode/send-email',
        method: 'post',
        data: {
          email: form.getFieldValue('email'),
          scene: 'RESET_PASSWORD'
        }
      }).then(res => {
        this.seqNo = res.data.seqNo
      })
    },
    onFinish () {
      this.codeDisabled = false;
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.reSetPwdForm;
      if (value && this.confirmDirty) {
        form.validateFields(['confirmPassword'], { force: true });
      }
      callback();
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.reSetPwdForm;
      if (value && value !== form.getFieldValue('newPassword')) {
        callback('The passwords don\'t match!');
      } else {
        callback();
      }
    }
  }
}
</script>
<style scoped lang="less">
.resetPwd {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
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
  .form {
    //margin: 0 auto;
    //width: 320px;
    //width: 700px;
  }
}
.button {
  text-align: center;
}
</style>

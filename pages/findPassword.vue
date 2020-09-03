<template>
  <div class="container">
    <img class="logo pointer" src="../assets/img/Asha-Go-dark-circle-logo-no-text.png" alt="logo">
    <div class="title">
      Reset Password
    </div>
    <a-form class="form" :form="form" @submit="handleSubmit">
      <a-form-item>
        <a-input
          v-decorator="[
          'email',
          {
            rules: [
              { type: 'email', message: 'I􏰀􏰀nvali􏰁d email􏰁' },
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
      <a-form-item label="">
        <a-col :span="14">
          <a-input
            v-decorator="[
          'vcode',
          {
            rules: [
              { required: true, message: 'Please enter the verification code!' }
            ]
          }
        ]"
            placeholder="verification code"
            size="large"
          >
            <a-icon slot="prefix" type="number" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-col>
        <a-col :span="8" :offset="2">
          <a-button style="text-align: center; width: 100%" size="large" @click="handleGetCode" :disabled="codeDisabled">
            <span v-if="!codeDisabled">get Code</span>
            <a-statistic-countdown
              v-else
              :value="deadline"
              suffix="S"
              format="s"
              valueStyle="color: rgba(0, 0, 0, 0.25); font-size: 16px;"
              @finish="onFinish"
            />
          </a-button>
        </a-col>
      </a-form-item>
      <a-form-item has-feedback>
        <a-input
          v-decorator="[
          'newPassword',
          {
            rules: [
              { required: true, message: 'Please input your Password' },
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
        <a-col :span="24" class="button">
          <a-button type="primary" block html-type="submit">
            Save
          </a-button>
        </a-col>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
  export default {
    layout: "blank",
    data () {
      return  {
        form: this.$form.createForm(this, {name: 'find_password'}),
        hasErrors: fieldsError => {
          return Object.keys(fieldsError).some(field => fieldsError[field]);
        },
        codeDisabled: false,
        deadline: '',
        email: '',
        seqNo: '',
      }
    },
    mounted() {
      let userInfo = this.$store.state.userInfo;
      this.email = (userInfo && userInfo.email) || '';
    },
    methods: {
      // Only show error after a field is touched.
      passwordError() {
        const { getFieldError, isFieldTouched } = this.form;
        return isFieldTouched('newPassword') && getFieldError('newPassword');
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
        if (value && value !== form.getFieldValue('newPassword')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      },
      handleConfirmBlur(e) {
        const value = e.target.value;
        this.confirmDirty = this.confirmDirty || !!value;
      },
      /***
       * 校验code值
       */
      handleGetCode () {
        const form = this.form;
        form.validateFields(['email'], (errors, values) => {
          if (!errors) {
            this.$Server({
              url: '/vcode/send-email',
              method: 'post',
              data: {
                email: values.email,
                scene: 'RESET_PASSWORD'
              }
            }).then((res) => {
              this.codeDisabled = true;
              this.deadline = Date.now() + 1000 * 60;
              this.seqNo = res.data.seqNo;
            }).catch((res) => {
              this.$message.waring('sorry')
            })
          } else {
            return false;
          }
        });
      },
      onFinish () {
        this.codeDisabled = false;
      },
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.handleConfirm(values);
          } else {
            return false;
          }
        });
      },
      handleConfirm (values) {
        this.$Server({
          url: '/user/reset-password',
          method: 'post',
          data: {
            userId: this.$store.state.userId,
            newPassword: values.newPassword,
            seqNo: this.seqNo,
            vcode: values.vcode
          }
        }).then(res => {
          if (res.msg === 'success') {
            this.$message.success('Reset Password successful!')
            this.$router.push('/')
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
    //   background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;
    .logo {
      margin-top: 50px;
      height: 100px;
    }
    .title {
      font-size: 30px;
      line-height: 80px;
      font-weight: 600;
      text-align: center;
    }
    .form {
      width: 320px;
    }
  }
</style>

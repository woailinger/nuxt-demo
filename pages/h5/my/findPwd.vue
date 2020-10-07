<template>
  <div class="container">
    <div class="title">
      Find Password
    </div>
    <a-form :form="form" @submit="handleSubmit" :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }" labelAlign="left">
      <a-form-item label="email">
        <a-input
          v-model="email"
          v-decorator="[
          'email',
          { rules: [{ required: true, message: 'Please input your Email' }] },
        ]"
          placeholder="Please input your Email"
        />
      </a-form-item>
      <a-form-item label="code">
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
      <a-form-item label="New Password">
        <a-input
          v-decorator="[
          'newPassword',
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
        <a-col :span="24" class="button">
          <a-button type="primary" html-type="submit">
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
      form: this.$form.createForm(this, {name: 'dynamic_rule'}),
      codeDisabled: false,
      deadline: '',
      email: '',
      seqNo: '',
      userId: '',
    }
  },
  mounted() {
    let userInfo = this.$store.state.userInfo;
    this.email = (userInfo && userInfo.email) || '';
  },
  methods: {
    /***
     * 校验code值
     */
    handleGetCode () {
      this.$Server({
        url: '/vcode/send-email',
        method: 'post',
        data: {
          email: this.email,
          scene: 'RESET_PASSWORD'
        }
      }).then((res) => {
        this.codeDisabled = true;
        this.deadline = Date.now() + 1000 * 60;
        this.seqNo = res.data.seqNo;
        this.userId = res.data.userId;
      }).catch((res) => {
        this.$message.waring('sorry')
      })
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
          userId: this.userId,
          newPassword: values.newPassword,
          seqNo: this.seqNo,
          vcode: values.vcode
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.container {
  color: #8D050B;
  width: 500px;
  .title {
    font-size: 30px;
    line-height: 80px;
    font-weight: 600;
  }
}
</style>

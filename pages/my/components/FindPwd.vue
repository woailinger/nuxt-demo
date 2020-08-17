<template>
  <div class="container">
    <div class="title">
      Find Password
    </div>
    <a-form :form="form" :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }" labelAlign="left">
      <a-form-item label="邮箱">
      <span class="ant-form-text">
        12345678@qq.com
      </span>
      </a-form-item>
      <a-form-item label="验证码">
        <a-col :span="14">
          <a-input
            v-decorator="[
          'code',
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
          'token',
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
          <a-button type="primary" @click="$emit('ok')">
            Save
          </a-button>
        </a-col>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  data () {
    return  {
      form: this.$form.createForm(this, {name: 'dynamic_rule'}),
      codeDisabled: false,
      deadline: ''
    }
  },
  methods: {
    /***
     * 校验code值
     */
    handleGetCode () {
      this.codeDisabled = true;
      this.deadline = Date.now() + 1000 * 60;
    },
    onFinish () {
      this.codeDisabled = false;
    },
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

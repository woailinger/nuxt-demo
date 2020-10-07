<template>
  <div class="container">
    <div class="title">Sign up for Newsletter</div>
    <a-form :form="form" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }" labelAlign="left">
      <a-form-item
        label="Email address"
      >
        <a-input
          v-decorator="[
          'email',
          { rules: [{ required: true, message: 'Please input your Email' }] },
        ]"
          placeholder="Please input your Email"
        />
      </a-form-item>
      <a-form-item
        label="What do you want know about"
      >
        <a-checkbox-group
          v-decorator="[
          'email',
          { rules: [{ required: true, message: 'Please choose your interests' }] },
        ]"
          placeholder="Please choose your live now"
        >
          <a-row>
            <a-col :span="12">
              <a-checkbox value="daily">
                daily
              </a-checkbox>
            </a-col>
            <a-col :span="12">
              <a-checkbox value="life">
                life
              </a-checkbox>
            </a-col>
            <a-col :span="12">
              <a-checkbox value="food& drinks">
                food& drinks
              </a-checkbox>
            </a-col>
            <a-col :span="12">
              <a-checkbox value="travel">
                travel
              </a-checkbox>
            </a-col>
            <a-col :span="12">
              <a-checkbox value="language">
                language
              </a-checkbox>
            </a-col>
            <a-col :span="12">
              <a-checkbox value="shopping">
                shopping
              </a-checkbox>
            </a-col>
            <a-col :span="12">
              <a-checkbox value="events">
                events
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item wrapper-col="{ span: 24 }">
        <a-col :span="24" class="button">
          <a-button type="primary" html-type="submit">
            Submit
          </a-button>
        </a-col>
      </a-form-item>
      <a-form-item wrapper-col="{ span: 24 }">
        <a-col :span="24" class="title">
          Cancel subscription
        </a-col>
      </a-form-item>
      <a-form-item wrapper-col="{ span: 24 }">
        <a-col :span="24" class="button">
          <a-button type="primary" html-type="submit">
            Submit
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
    return {
      form: this.$form.createForm(this, {name: 'dynamic_rule'})
    }
  }
}
</script>
<style scoped lang="less">
.container {
  width: 500px;
  /*color: #8D050B;*/
  .title {
    font-size: 30px;
    line-height: 80px;
    font-weight: 600;
    text-align: center;
    color: #8D050B;
  }
  .button {
    text-align: center;
  }
}
</style>

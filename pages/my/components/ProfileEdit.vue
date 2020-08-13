<template>
  <div class="form">
    <a-form :form="form" :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }" labelAlign="left">
      <a-form-item
        label="Name"
      >
        <a-input
          v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your name' }] },
        ]"
          placeholder="Please input your name"
        />
      </a-form-item>
      <a-form-item label="Gender">
        <a-radio-group
          v-decorator="[
            'radio-group',
            { rules: [{ required: true, message: 'Please Choose your Gender' }] },
          ]"
        >
          <a-radio value="a">
            Female
          </a-radio>
          <a-radio value="b">
            Male
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="Nationality"
      >
        <a-input
          v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your name' }] },
        ]"
          placeholder="Please input your name"
        />
      </a-form-item>
      <a-form-item
        label="Birthday"
      >
        <a-date-picker
          v-decorator="[
          'birthday',
          { rules: [{ required: checkNick, message: 'Please choose your Birthday' }] },
        ]"
          placeholder="Please choose your Birthday"
        />
      </a-form-item>
      <a-form-item
        label="Email"
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
        label="Where do you live now"
      >
        <a-input
          v-decorator="[
          'email',
          { rules: [{ required: true, message: 'Please input your live now' }] },
        ]"
          placeholder="Please input your live now"
        />
      </a-form-item>
      <a-form-item
        label="What interests you"
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
      return {
        checkNick: false,
        form: this.$form.createForm(this, {name: 'dynamic_rule'}),
      }
    }
  }
</script>
<style scoped lang="less">
.form {
  margin-top: 20px;
  .button {
    text-align: center;
  }
}
</style>


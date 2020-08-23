<template>
  <div class="form">
    <a-form :form="form" @submit="handleSubmit" :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }" labelAlign="left">
      <a-form-item
        label="userName"
      >
        <a-input
          v-decorator="[
          'userName',
          { rules: [{ required: true, message: 'Please input your name' }] },
        ]"
          placeholder="Please input your name"
        />
      </a-form-item>
      <a-form-item label="Gender">
        <a-radio-group
          v-decorator="[
            'gender',
            { rules: [{ required: true, message: 'Please Choose your Gender' }] },
          ]"
        >
          <a-radio value="female">
            Female
          </a-radio>
          <a-radio value="male">
            Male
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="Nationality"
      >
        <a-input
          v-decorator="[
          'nationality',
          { rules: [{ required: true, message: 'Please input your nationality' }] },
        ]"
          placeholder="Please input your nationality"
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
          format="YYYY-MM-DD"
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
          'city',
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
          'interesting',
          { rules: [{ required: true, message: 'Please choose your interests' }] },
        ]"
          placeholder="Please choose your live now"
        >
          <a-row>
            <a-col :span="12">
              <a-checkbox value="daily">
                daily & Life
              </a-checkbox>
            </a-col>
            <a-col :span="12">
              <a-checkbox value="food & drinks">
                food & drinks
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
            <a-col :span="12">
              <a-checkbox value="others">
                others
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
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
import moment from 'moment';

  export default {
    data () {
      return {
        checkNick: false,
        form: this.$form.createForm(this, {name: 'dynamic_rule'}),
      }
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.handleEdit(values);
          } else {
            return false;
          }
        });
      },
      handleEdit (values) {
        debugger;
        values.birthday =  moment(values.birthday).format('YYYY-MM-DD');
        this.$Server({
          url: '/user/update-profile',
          method: 'POST',
          data: {
            userId: this.$store.state.userId || '',
            ...values,
          }
        }).then(res => {
          this.$emit('ok')
        })
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


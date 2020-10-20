<template>
  <div class="form">
    <van-form @submit="onSubmit">
      <van-field
        v-model="form2.userName"
        name="userName"
        label="userName"
        placeholder="Please choose a username"
        :rules="[{ required: true, message: 'Please input your name' }]"
      />
      <van-field
        name="Gender"
        label="Gender"
        placeholder="Please Choose your Gender"
        :rules="[{ required: true, message: 'Please Choose your Gender' }]"
      >
        <template #input>
          <van-radio-group v-model="form2.Gender" direction="horizontal">
            <van-radio name="Female">Female</van-radio>
            <van-radio name="Male">Male</van-radio>
            <van-radio name="OTHER" style="padding: 20px 0">OTHER</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="form2.Nationality"
        name="Nationality"
        label="Nationality"
        placeholder="What is your nationality?"
        :rules="[{ required: true, message: 'Please input your nationality' }]"
      />
      <van-field
        readonly
        clickable
        name="birthday"
        :value="form2.birthday"
        label="Birthday"
        placeholder="Please choose your Birthday"
        @click="showPicker = true"
        :rules="[{ required: true, message: 'Please choose your Birthday' }]"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        v-model="form2.email"
        name="email"
        label="Email"
        placeholder="Please input your Email"
        :rules="[{ required: true, message: 'Please write your Email' }]"
      />
      <van-field
        v-model="form2.city"
        name="city"
        label="Where do you live now"
        placeholder="Where do you live now:E.g. Beijing"
        :rules="[{ required: true, message: 'Please input your live now' }]"
      />
      <van-field
        name="interesting"
        label="What interests you"
        :rules="[{ required: true, message: 'Please Choose your interests' }]"
      >
        <template #input>
          <van-checkbox-group v-model="form2.interesting" direction="horizontal">
            <van-checkbox name="Daily life" shape="square" style="margin-bottom: 15px">Daily life</van-checkbox>
            <van-checkbox name="Food & Drinks" shape="square" style="margin-bottom: 15px">Food & Drinks</van-checkbox>
            <van-checkbox name="Travel" shape="square" style="margin-bottom: 15px">Travel</van-checkbox>
            <van-checkbox name="Language" shape="square" style="margin-bottom: 15px">Language</van-checkbox>
            <van-checkbox name="Shopping" shape="square" style="margin-bottom: 15px">Shopping</van-checkbox>
            <van-checkbox name="Events" shape="square">Events</van-checkbox>
            <van-checkbox name="Other" shape="square">Other</van-checkbox>
          </van-checkbox-group>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          submit
        </van-button>
      </div>
    </van-form>
<!--    <a-form :form="form" @submit="handleSubmit" :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }" labelAlign="left">-->
<!--      <a-form-item>-->
<!--        <a-col :span="24" class="button">-->
<!--          <a-button type="primary" html-type="submit">-->
<!--            Save-->
<!--          </a-button>-->
<!--        </a-col>-->
<!--      </a-form-item>-->
<!--    </a-form>-->
  </div>
</template>
<script>
import moment from 'moment';
  export default {
    data () {
      return {
        checkNick: true,
        form: this.$form.createForm(this, {name: 'profile'}),
        form2: {
          userName: '',
          birthday: ''
        },
        minDate: new Date(2020, 0, 1),
        maxDate: new Date(2025, 10, 1),
        showPicker: false
      }
    },
    mounted() {
      this.getInfo();
    },
    methods: {
      onConfirm(time) {
        this.form2.birthday = moment(time).format('YYYY-MM-DD');
        this.showPicker = false;
      },
      onSubmit(values) {
        console.log('submit', values);
        this.handleEdit(values);
      },
      getInfo() {
        this.$Server({
          url: '/user/profile',
          method: 'get',
          params: {
            userId: this.$store.state.userId
          }
        }).then(res => {
          if (res.code == 0) {
            const data = res.data
            this.$store.commit('setUserInfo', data)
            this.form = {
              birthday: data.birthday || '1990-09-04',
              city: data.city,
              country: data.country,
              email: data.email,
              gender: data.gender,
              interesting: data.interesting,
              nationality: data.nationality,
              userName: data.userName
            }
          } else {
          }
        })
      },
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
        values.birthday =  moment(values.birthday).format('YYYY-MM-DD');
        this.$Server({
          url: '/user/update-profile',
          method: 'POST',
          data: {
            userId: this.$store.state.userId || '',
            ...values,
          }
        }).then(res => {
          if(res.code === '0') {
            this.$toast(res.msg);
            this.$emit('ok')
          } else {
            this.$toast(res.msg);
          }
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


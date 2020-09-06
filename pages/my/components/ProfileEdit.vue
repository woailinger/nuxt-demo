<template>
  <div class="form">
    <a-form :form="form" @submit="handleSubmit" :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }" labelAlign="left">
      <a-form-item
        label="Username"
      >
        <a-input
          v-decorator="[
          'userName',
          {
            rules: [{ required: true, message: 'Please input your name' }]
          },
        ]"
          placeholder="Please choose a username"
        />
      </a-form-item>
      <a-form-item label="Gender">
        <a-radio-group
          v-decorator="[
            'gender',
            {
              rules: [{ required: true, message: 'Please Choose your Gender' }]
            },
          ]"
        >
          <a-radio value="FEMALE">
            Female
          </a-radio>
          <a-radio value="MALE">
            Male
          </a-radio>
          <a-radio value="OTHER">
            Other
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="Nationality"
      >
        <a-input
          v-decorator="[
          'nationality',
          {
            rules: [{ required: true, message: 'Please input your nationality' }]
          },
        ]"
          placeholder="What is your nationality?"
        />
      </a-form-item>
      <a-form-item
        label="Birthday"
      >
        <a-date-picker
          v-decorator="[
          'birthday',
          {
            initialValue: '1990-09-04',
            rules: [{ required: checkNick, message: 'Please choose your Birthday' }]
          },
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
          {
            rules: [{ required: true, message: 'Please input your Email' }]
          },
        ]"
          placeholder="Please write your Email"
        />
      </a-form-item>
      <a-form-item
        label="Where do you live now"
      >
        <a-input
          v-decorator="[
          'city',
          {
            rules: [{ required: true, message: 'Please input your live now' }]
          },
        ]"
          placeholder="Where do you live now:E.g. Beijing"
        />
      </a-form-item>
      <a-form-item
        label="What interests you"
      >
        <a-checkbox-group
          v-decorator="[
          'interesting',
          {
            rules: [{ required: false, message: 'Please choose your interests' }]
          },
        ]"
          placeholder="Please choose your live now"
        >
          <a-row>
            <a-col :span="12">
              <a-checkbox value="Daily life">
                Daily life
              </a-checkbox>
            </a-col>
            <a-col :span="12">
              <a-checkbox value="Food & Drinks">
                Food & Drinks
              </a-checkbox>
            </a-col>
            <a-col :span="12">
              <a-checkbox value="Travel">
                Travel
              </a-checkbox>
            </a-col>
            <a-col :span="12">
              <a-checkbox value="Language">
                Language
              </a-checkbox>
            </a-col>
            <a-col :span="12">
              <a-checkbox value="Shopping">
                Shopping
              </a-checkbox>
            </a-col>
            <a-col :span="12">
              <a-checkbox value="Events">
                Events
              </a-checkbox>
            </a-col>
            <a-col :span="12">
              <a-checkbox value="Other">
                Other
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
//    asyncData ({ req, $Server, redirect, store }) {
//      $Server({
//        url: '/user/profile',
//        method: 'get',
//        params: {
//          userId: store.state.userId
//        }
//      }).then(res => {
//        if (res.code == 0) {
//          // 重定向到登录页面
////        redirect('/login');
//        } else {
//          return {
//            data: res.data
//          }
//        }
//      })
//    },
    data () {
      return {
        checkNick: true,
        form: this.$form.createForm(this, {name: 'profile'})
      }
    },
    mounted() {
      this.getInfo();
    },
    methods: {
      getInfo() {
        const { setFieldsValue } = this.form;
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
            setFieldsValue({
              birthday: data.birthday || '1990-09-04',
              city: data.city,
              country: data.country,
              email: data.email,
              gender: data.gender,
              interesting: data.interesting,
              nationality: data.nationality,
              userName: data.userName
            })
          } else {
            // 错误 使用mock数据
//            setFieldsValue({
//              birthday: null || '1990-09-04',
//              city: null,
//              country: null,
//              email: "798406168@qq.com",
//              gender: null,
//              interesting: [],
//              nationality: null,
//              userName: "test"
//            })
          }
          // mock
//          this.$store.commit('setUserInfo', {
//            birthday: null || '1990-09-04',
//            city: null,
//            country: null,
//            email: "798406168@qq.com",
//            gender: null,
//            interesting: [],
//            nationality: null,
//            userName: "test",
//            avatar: null
//          });
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
            this.$message.success(res.msg);
            this.$emit('ok')
          } else {
            this.$message.error(res.msg);
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


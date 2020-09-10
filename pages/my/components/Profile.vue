<template>
  <div class="container">
    <div class="title">Profile</div>
    <div class="avatar">
      <img :src="$store.state.userInfo.avatar || imgDataUrl" alt="">
      <span class="edit" @click="toggleShow">Edit</span>
      <client-only>
        <avatar field="avatar"
                :withCredentials="true"
                method="POST"
                @crop-success="cropSuccess"
                @crop-upload-success="cropUploadSuccess"
                @crop-upload-fail="cropUploadFail"
                v-model="show"
                :width="300"
                :height="300"
                url="//ashago-api-dev.cc2dbe1fd91f042528f96dc27c2dba5fe.cn-zhangjiakou.alicontainer.com/user/upload-avatar"
                img-format="png"
                langType="en"
                :params="{userId: $store.state.userId}"
        />
      </client-only>
    </div>
    <ProfileEdit @ok="toggleEdit" />
    <!--<ul class="info" v-else>-->
      <!--<li class="item">-->
        <!--<span class="name">Name</span>-->
        <!--<span class="value">{{ info.userName }}</span>-->
      <!--</li>-->
      <!--<li class="item">-->
        <!--<span class="name">Gender</span>-->
        <!--<span class="value">Female</span>-->
      <!--</li>-->
      <!--<li class="item">-->
        <!--<span class="name">Nationality</span>-->
        <!--<span class="value">{{ info.infonationality }}</span>-->
      <!--</li>-->
      <!--<li class="item">-->
        <!--<span class="name">Age</span>-->
        <!--<span class="value">{{ info.age }}</span>-->
      <!--</li>-->
      <!--<li class="item">-->
        <!--<span class="name">Email </span>-->
        <!--<span class="value">{{ info.email }}</span>-->
      <!--</li>-->
      <!--<li class="item">-->
        <!--<span class="name">Where do you live now</span>-->
        <!--<span class="value">{{ info.city }}</span>-->
      <!--</li>-->
      <!--<li class="item">-->
        <!--<span class="name">What interests you</span>-->
        <!--<span class="value">{{ info.interesting }}</span>-->
      <!--</li>-->
      <!--<li class="button">-->
        <!--<a-button type="primary" @click="toggleEdit">Edit</a-button>-->
      <!--</li>-->
    <!--</ul>-->
  </div>
</template>
<script>
import ProfileEdit from './ProfileEdit.vue';
export default {
//  asyncData ({ req, $Server, redirect, store }) {
//    $Server({
//      url: '/user/profile',
//      method: 'get',
//      params: {
//        userId: store.state.userId
//      }
//    }).then(res => {
//      if (res.code == 0) {
//        // 重定向到登录页面
////        redirect('/login');
//      } else {
//        return {
//          data: res.data
//        }
//      }
//    })
//  },
  components: {
    ProfileEdit
  },
  data () {
    return {
      imgDataUrl: require('~/assets/img/Asha-Go-dark-circle-logo-no-text.png'),
      show: false,
      isEdit: false,
      info: {
        nationality: 'Chinese',
        email: '798406168@qq.com',
        subscribed: '',
        city: 'Shange Hai',
        userName: 'return',
        requiredCompleted: '',
        interesting: 'daily life, food& drinks',
        avatarImg: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        age: 30
      }
    }
  },
  mounted() {
//    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$Server({
        url: '/user/profile',
        method: 'get',
        params: {
          userId: this.$store.state.userId
        }
      }).then(res => {
        if (res.code == 0) {
           this.info = res.data
        } else {
          return {
            data: res.info.data
          }
        }
      })
    },
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field){
      console.log('-------- crop success --------');
      this.imgDataUrl = imgDataUrl;
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess(jsonData, field){
      console.log('-------- upload success --------');
      console.log(jsonData);
      console.log('field: ' + field);
      this.$store.commit('setUserInfo', {
        ...this.$store.state.userInfo,
        avatar: jsonData.data.avatar
      })
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field){
      console.log('-------- upload fail --------');
      console.log(status);
      console.log('field: ' + field);
    },
    toggleEdit () {
      this.isEdit = !this.isEdit;
    }
  }
}
</script>
<style scoped lang="less">
  .container {
    margin-top:50px;
    margin-left: 30px;
    color: #8D050B;
    width: 500px;
    .title {
      font-size: 22px;
      font-weight: 600;
    }
    .avatar {
      text-align: center;
      position: relative;
      img {
        width: 100px;
        height: 100px;
      }
      .edit {
        position: absolute;
        bottom: 0;
        display: inline-block;
        padding: 5px 10px;
        border: 1px solid #ccc;
        margin-left: 20px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
    .info {
      list-style: none;
      padding: 0;
      .item {
        line-height: 60px;
        font-size: 18px;
        display: flex;
        justify-content: space-between;
      }
      .button {
        line-height: 100px;
        text-align: center;
      }
    }
  }
</style>

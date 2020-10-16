<template>
  <div>
      <div class="h5-header">
        <div class="menu-container">
            <van-icon class="menu" size="6vh" name="wap-nav" @click="showPopup"/>
            <img class="header-logo" src="../assets/img/Asha-Go-dark-circle-logo-no-text.png" alt="logo">
            <span class="login">
              <a-button @click="signHandler" v-show="!loginFlag" class="button">Login</a-button>
              <span v-show="!!loginFlag">
                <!-- <a-avatar :src="$store.state.userInfo.avatar || avatarImg" @click="goInfo"></a-avatar> -->
                <!-- <span class="user-name">{{$store.state.userInfo.userName || userName}}</span> -->
                <icon-font type="iconexit" class="logout-icon" @click="logoutHandler"/>
              </span>
            </span>
            <van-popup v-model="show" position="top left" class="popup">
              <nuxt-link to="/h5" class="menu-item">
                <a-icon type="home" class="icon"/> Home
              </nuxt-link>
              <nuxt-link to="/category/daily?category=daily" class="menu-item">
                <icon-font type="iconDaily" /> Daily Life
              </nuxt-link>
              <nuxt-link to="/category/food?category=food" class="menu-item">
                <icon-font type="iconfood" class="icon"/>Food & Drinks
              </nuxt-link>
              <nuxt-link to="/category/travel?category=travel" class="menu-item">
                <icon-font type="iconfeiji" class="icon"/>Travel
              </nuxt-link>
              <nuxt-link to="/category/language?category=language" class="menu-item">
                <icon-font type="iconlanguage" class="icon"/>Language
              </nuxt-link>
              <nuxt-link to="/community" class="menu-item">
                <icon-font type="iconcommunity" class="icon"/>Community
              </nuxt-link>
              <nuxt-link to="/service" class="menu-item">
                <icon-font type="iconicon_service" class="icon"/>Service
              </nuxt-link>
              <nuxt-link to="/contactUs" class="menu-item">
                <icon-font type="iconwoshou" class="icon"/>About Us
              </nuxt-link>
            </van-popup>
        </div>
          <!-- <a-input-search class ='search' placeholder="search" v-model="searchValue" enter-button @search="onSearch" @pressEnter="onSearch"/> -->
      </div>
      <div class="content">
        <Nuxt />
      </div>
      <div class="h5-fotter">
        <view>
          <van-cell :title="item.text" v-for="(item, index) in footData" :key="index" is-link/>
          <div class="copyright">Copyright © 2020 Asha Go Inc. All rights reserved.</div>
        </view>
      </div>
  </div>
</template>
<script>
const Cookie = process.client ? require('js-cookie') : undefined
import { Icon } from 'ant-design-vue';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2118142_fev5ry0wqpp.js',
});
export default {
   components: {
    IconFont,
  },
  data() {
    return {
      searchValue: '',
      avatarImg: require('~/assets/img/Asha-Go-dark-circle-logo-no-text.png'),
      userName: '',
      loginFlag: false,
      mobile: false,
      show: false,
      list: ['Daily Life', 'Food & Drinks', 'Travel', 'Language', 'Community', 'Service', 'About Us'],
      loading: false,
      finished: false,
      footData: [
        {
          text: '我们是谁 who we are',
          link: '/aboutUs'
        },
        {
          text: '商业合作 Business inquiries',
          link: '/contactUs'
        },
        {
          text: '投稿 Write for us',
          link: '/contactUs'
        },
        {
          text: '用户协议 User agreement',
          link: '/agreement'
        },
      ]
    }
  },
  mounted() {
    // window.addEventListener("scroll",()=>{
    //   let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //     let offsetTop = document.querySelector('#menuContainer').offsetTop;
    //     if (scrollTop > offsetTop) {
    //         document.querySelector('#menuContainer').style.position="fixed";
    //         document.querySelector('#menuContainer').style.top="0";
    //     } else {
    //         document.querySelector('#menuContainer').style.position="";
    //         document.querySelector('#menuContainer').style.top="";
    //     }
    // })
    if(this.$store.state.token){
        this.getUserInfo();
        this.loginFlag = true;
    } else {
      this.loginFlag = false;
    }
  },
  methods:{
    goHome() {
      this.$router.push('/');
    },
    showPopup () {
      this.show = true;
    },
    signHandler() {
      this.$router.push('/login');
    },
    logoutHandler() {
      // 清空登陆态
      // this.$router.push('/login');
      this.loginFlag = false;
      Cookie.set('_t', '');
      Cookie.set('userId', '');
      this.$store.commit('setToken', '');
      this.$store.commit('setUserId', '');
      console.log('logout', 'success');
    },
    goInfo() {
      this.$router.push('/my');
    },
    getUserInfo() {
      this.$Server({
          url: '/user/profile',
          method: 'get',
          params: {
            userId: this.$store.state.userId || '',
          }
        }).then(res => {
          if (res.code == 0) {
            // 设置全局个人信息
            this.$store.commit('setUserInfo', res.data)
          }
        }).finally(data => {
          this.loading = false;
        });
    },
    onSearch() {
      this.$router.push({ path: '/article/search',  query: {
        keyWord: this.searchValue
      }});
    }
  }
}
</script>

<style lang="less">
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.h5-header {
  .menu-container {
  overflow: hidden;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #8d040c;
  color: #fff;
  .header-logo {
    margin: 0 auto;
    height: 6rem;
  }
  .van-popup--top {
    width: auto;
  }
  .logout-icon {
     width: 10rem;
     height: 10rem;
  }
  .icon {
    margin-right: 0.5rem;
  }
  .menu {
    a:hover {
      color: #ccc;
    }
    position: absolute;
    left: 2rem
  }
  .login{
    position: absolute;
    right: 0.5rem;
    color: #fff;
    .button {
       background: #8d040c;
      color: #fff
    }
  }
  .popup {
    background-color: #8d040c;
    height: 100%;
  }
  .menu-item {
    margin: 0 20px;
    color: #fff;
    width: 100%;
    display: block;
    font-size: 1.5rem;
    line-height: 6rem
  }
}

  .search {
    margin-right: 40px ;
    width: 200px;
    font-size: 16px;
    color: #fff;
    .ant-input {
      border: none;
      color: #fff;
      border-bottom: 1px solid #fff;
      background-color: #8d040c;
      border-radius: 0px;
    }
    .ant-btn-primary {
      background-color: #8d040c;
      border: none;
      border-radius: 0px;
    }
  }
}


.content {
  display: block;
  height: 100%;
  overflow: hidden;
}
.h5-fotter {
  margin-bottom: 5rem;
  color: #fff;
  background-color: #8d040c;
  .van-cell {
    background-color: #8d040c;
    color: #fff;
  }
  .copyright {
    text-align: center;
    vertical-align: middle;
    line-height: 5rem
  }
}
</style>

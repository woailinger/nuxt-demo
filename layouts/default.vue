<template>
  <div>
      <div class="header">
        <div class="header-container">
          <span class="header-left pointer" @click="goHome">
            <img class="header-logo" src="../assets/img/Asha-Go-dark-circle-logo-no-text.png" alt="logo">
            <span class="logo-desc ">
              <span>ASHA GO</span>
              <span class="desc">Your China Platform</span>
            </span>
          </span>
          <span class="header-right pointer">
            <a-button @click="signHandler" v-show="!loginFlag">Sign up / Login</a-button>
            <span v-show="!!loginFlag">
              <a-avatar :src="$store.state.userInfo.avatar || avatarImg" @click="goInfo"></a-avatar>
              <span class="user-name">{{$store.state.userInfo.userName || userName}}</span>
              <a-button type="link" @click="logoutHandler" ghost>Logout</a-button>
            </span>
          </span>
        </div>
        <div class="menu-container" id="menuContainer">
          <nav class="menu">
            <nuxt-link to="/category/daily?category=daily" class="menu-item">Daily Life</nuxt-link>
            <nuxt-link to="/category/food?category=food" class="menu-item">Food & Drinks</nuxt-link>
            <!-- <nuxt-link to="/pageb" class="menu-item">Shopping</nuxt-link> -->
            <nuxt-link to="/category/travel?category=travel" class="menu-item">Travel</nuxt-link>
            <nuxt-link to="/category/language?category=language" class="menu-item">Language</nuxt-link>
            <nuxt-link to="/category/community?category=community" class="menu-item">Community</nuxt-link>
            <nuxt-link to="/category/service?category=service" class="menu-item">Service</nuxt-link>
            <a-dropdown>
              <a class="ant-dropdown-link menu-item" @click="e => e.preventDefault()">
                About Us <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <nuxt-link to="/aboutUs" class="menu-item">Our Team</nuxt-link>
                </a-menu-item>
                <a-menu-item>
                  <nuxt-link to="/contactUs" class="menu-item">Contact Us</nuxt-link>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </nav>
          <a-input-search class ='search' placeholder="search" v-model="searchValue" enter-button @search="onSearch" @pressEnter="onSearch"/>
        </div>
      </div>
      <div class="content">
        <Nuxt />
      </div>
      <div class="footer">
        <div class="footer-container">
          <div class="connet">
          <ul class="footer-link">
            <li class="nav-item">
              <nuxt-link to="/aboutUs" class="nav-link">
                <p>Who are we</p>
                <span>我们是谁</span>
              </nuxt-link>
            </li>
            <li class="nav-item">
               <nuxt-link to="/contactUs" class="nav-link">
                <p>Business inquiries </p>
                <span>商业合作</span>
               </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/contactUs" class="nav-link">
                <p>Write for us</p>
                <span>投稿</span>
              </nuxt-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">
                <p>User agreement</p>
                <span>用户协议</span>
              </a>
            </li>
          </ul>
          <div class="footer-social">
            <!-- <a href=" https://www.youtube.com/channel/UCrWdKovbA8LkG3TKOYURihQ" target="_blank">
              <a-icon type="facebook" class="social-icon"/>
            </a> -->
            <a href=" https://www.facebook.com/ashagoplatform/" target="_blank">
              <a-icon type="facebook" class="social-icon"/>
            </a>
            <a href="https://www.linkedin.com/company/asha-go" target="_blank">
              <a-icon type="linkedin" class="social-icon"/>
              <!-- <a-icon type="twitter" /> -->
            </a>
            <a href="https://www.instagram.com/asha_go/" target="_blank">
              <a-icon type="instagram" class="social-icon"/>
            </a>
            <a-icon type="wechat" class="social-icon"/>
            <a-icon type="mail" class="social-icon"/>
            <span class="mail-desc"> &nbsp;&nbsp;&nbsp;Email: info@ashago.com</span>
          </div>
          </div>
          <div class="copyright">Copyright © 2020 Asha Go Inc. All rights reserved.</div>
        </div>
      </div>
  </div>
</template>
<script>
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  data() {
    return {
      searchValue: '',
      avatarImg: require('~/assets/img/Asha-Go-dark-circle-logo-no-text.png'),
      userName: '',
      loginFlag: false
    }
  },
  mounted() {
    window.addEventListener("scroll",()=>{
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let offsetTop = document.querySelector('#menuContainer').offsetTop;
        console.log(offsetTop,scrollTop, 'xxx====');
        if (scrollTop > offsetTop) {
            document.querySelector('#menuContainer').style.position="fixed";
            document.querySelector('#menuContainer').style.top="0";
        } else {
            document.querySelector('#menuContainer').style.position="";
            document.querySelector('#menuContainer').style.top="";
        }
    })
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

.header {
  background-color: #fff;
  margin: 0px;
  padding: 0px;
  // position: fixed;
  // top:0px;
  width: 100%;
  z-index: 999;
}
.menu-container {
  width: 100%;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #8d040c;
  color: #fff;
  .menu {
    line-height: 40px;
    a:hover {
      color: #ccc;
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
.ant-dropdown-menu {
  background-color: #8d040c;
  .ant-dropdown-menu-item > a {
    color: #fff;
  }
  .ant-dropdown-menu-item:hover {
    background-color: #8d040c;
    color: #cccccc;
  }
}
.header-container {
  height: 100px;
  width: 100%;
  font-size: 22px;
  margin-top: 10px;
  margin-left: 30px;
  color: #ac4448;
  display: flex;
  justify-content:space-between;
  .header-left {
    vertical-align: middle;
    display: flex;
    .logo-desc {
      margin-top: -18px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin-left: 20px;
      .desc {
        font-size: 14px;
        margin-top: 5px;
      }
    }

  }
  .header-right {
     align-self: center;
     margin-right: 140px;
     .ant-btn {
       color: #ac4448;
       border-color: #ac4448;
       margin-top: -15px;
     }
     .user-name {
       font-size: 16px;
     }
  }
  .header-logo {
    object-position: 50% 50%;
    width: 84px;
    height: 80px;
    object-fit: contain
  }
}
.menu-item {
  margin-left: 30px;
  color:#fff;
}

.content {
  display: block;
  height: 100%;
  overflow: hidden;
}

.footer {
  padding: 0px;
  margin-top: 10px;
  .footer-container {
    background-color: #8d040c;
    color: #fff;
    padding: 2rem 0;
    position: relative;
    bottom: 0;
    .connet {
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
    }
    .footer-link {
      margin-left: 25px;
      list-style: none;
      display: inline-block;
      .nav-item {
        display: inline-block;
        padding-left: 25px;
        .nav-link {
          font-size: 16px;
          color: #fff;
          margin-right: 50px;
          p {
            padding-bottom: 10px;
          }
        }
      }
    }
    .footer-social {
      display: inline-flex;
      margin-right: 50px;
      .mail-desc {
        height: 40px;
        line-height: 40px;
      }
      .social-icon {
        color: #fff;
        margin-left: 30px;
        svg {
          height: 40px;
          width: 40px;
        }
      }
    }
    .copyright {
        width: 100%;
        font-size: 18px;
        line-height: 18px;
        text-align: center;
        margin-top: 40px;
    }
  }
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

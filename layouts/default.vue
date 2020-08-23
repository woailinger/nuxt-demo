<template>
  <div>
      <div class="header">
        <div class="header-container">
          <span class="header-left" @click="goHome">
            <img class="header-logo" src="../assets/img/Asha-Go-dark-circle-logo-no-text.png" alt="logo">
            <span class="logo-desc">
              <span>ASHA GO</span>
              <span class="desc">Your China Platform</span>
            </span>
          </span>
          <span class="header-right">
            <a-button @click="signHandler" v-show="!loginFlag">Sign in / Login</a-button>
            <span v-show="!!loginFlag">
              <a-avatar :src="avatarImg" @click="goInfo"></a-avatar>
              <span>{{userName}}</span>
              <a-button type="link" @click="logoutHandler" ghost>Logout</a-button>
            </span>
          </span>
        </div>
        <div class="menu-container">
          <nav class="menu">
            <nuxt-link to="/" class="menu-item">Daily Life</nuxt-link>
            <nuxt-link to="/my" class="menu-item">Food & Drinks</nuxt-link>
            <!-- <nuxt-link to="/pageb" class="menu-item">Shopping</nuxt-link> -->
            <nuxt-link to="/pageb" class="menu-item">Travel</nuxt-link>
            <nuxt-link to="/pageb" class="menu-item">Language</nuxt-link>
            <nuxt-link to="/pageb" class="menu-item">Community</nuxt-link>
            <nuxt-link to="/pageb" class="menu-item">Service</nuxt-link>
            <a-dropdown>
              <a class="ant-dropdown-link menu-item" @click="e => e.preventDefault()">
                About Us <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <nuxt-link to="/pageb" class="menu-item">Our Team</nuxt-link>
                </a-menu-item>
                <a-menu-item>
                  <nuxt-link to="/pageb" class="menu-item">Contact Us</nuxt-link>
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
          <ul class="footer-link">
            <li class="nav-item">
              <a class="nav-link" href="">
                <p>About Us</p>
                <span>关于我们</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">
                <p>Contact Us </p>
                <span>联系我们</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">
                <p>Join Us</p>
                <span>加入我们</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">
                <p>Disclaimer</p>
                <span>声 明</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">
                <p>Privacy</p>
                <span>用户协议</span>
              </a>
            </li>
          </ul>
          <div class="footer-social">
            <a-icon type="facebook" class="social-icon"/>
            <a-icon type="twitter" class="social-icon"/>
            <a-icon type="instagram" class="social-icon"/>
            <a-icon type="wechat" class="social-icon"/>
            <a-icon type="mail" class="social-icon"/>
            <span class="mail-desc"> &nbsp;&nbsp;email:info@ashago.com</span>
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
      avatarImg: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      userName: '',
      loginFlag: false
    }
  },
  mounted() {
    console.log(this.$store.state.token, '-----------');
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
      this.$router.push('/login');
      Cookie.set('_t', '');
      this.$store.commit('setToken', '');
      this.$store.commit('setUserId', '');
      console.log('logout', 'success');
    },
    goInfo() {
      this.$router.push('/my');
    },
    getUserInfo() {
      this.$Server({
          url: '/user-profile',
          method: 'get',
          data: {
            userId: this.$store.userId,
          }
        }).then(res => {
          if (res.code == 0) {
            // 设置全局个人信息
          }
        }).finally(data => {
          this.loading = false;
        });
    },
    onSearch() {
      console.log('test');
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
  position: fixed;
  top:0px;
  width: 100%;
  z-index: 999;
}
.menu-container {
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
    }
  }
}
.ant-dropdown-menu {
  background-color: #ac4448;
  .ant-dropdown-menu-item > a {
    color: #fff;
  }
  .ant-dropdown-menu-item:hover {
    background-color: #ac4448;
    color: #cccccc;
  }
}
.header-container {
  height: 100px;
  width: 100%;
  font-size: 22px;
  margin-top: 30px;
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
  margin-top: 170px ;
}

.footer {
  padding: 0px;
  .footer-container {
    height: 180px;
    background-color: #8d040c;
    color: #fff;
    padding: 3rem 0;
    position: relative;
    bottom: 0;
    .footer-link {
      list-style: none;
      display: inline;
      .nav-item {
        display: inline-block;
        width: 120px;
        .nav-link {
          font-size: 16px;
          color: #fff;
          margin-right: 50px;
        }
      }
    }
    .footer-social {
      display: inline-flex;
      .mail-desc {
        height: 40px;
        line-height: 40px;
      }
      .social-icon {
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
        margin-top: 50px;
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

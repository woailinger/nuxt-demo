<template>
  <div>
    <a-layout>
      <a-layout-header class="header">
        <div class="header-contanier">
          <img class="header-logo" src="../assets/img/Asha-Go-dark-circle-logo-no-text.png" alt="logo">
          &nbsp;&nbsp;ASHA GO
        </div>
        <nav class="menu">
          <nuxt-link to="/" class="menu-item">Daily Life</nuxt-link>
          <nuxt-link to="/pagea" class="menu-item">Food & Drinks</nuxt-link>
          <nuxt-link to="/pageb" class="menu-item">Shopping</nuxt-link>
          <nuxt-link to="/pageb" class="menu-item">Travel</nuxt-link>
          <nuxt-link to="/pageb" class="menu-item">Community</nuxt-link>
          <nuxt-link to="/pageb" class="menu-item">Services</nuxt-link>
          <nuxt-link to="/pageb" class="menu-item">Services</nuxt-link>
          <nuxt-link to="/edit" class="menu-item">About Us</nuxt-link>
        </nav>
      </a-layout-header>
      <a-layout-content>
        <Nuxt />
      </a-layout-content>
      <a-layout-footer>
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
      </a-layout-footer>
    </a-layout>
  </div>
</template>

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
  height: 200px;
  background-color: #fff;
  margin: 0px;
  padding: 0px;
}
.menu {
  background-color: #8d040c;
  color: #fff;
}
.header-contanier {
  height: 100px;
  width: 100%;
  font-size: 22px;
  margin-top: 30px;
  margin-left: 30px;
  color: #ac4448;

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

.ant-layout-footer {
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

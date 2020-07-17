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
        Content
        <Nuxt />
      </a-layout-content>
      <a-layout-footer>
          <footer class="footer red dp-footer-wrap" itemscope="itemscope" itemtype="http://schema.org/WPFooter">
              <div class="container dp-footer">
                <div class="row">
                  <div class="col-6">
                    <ul class="nav justify-content-between">
                      <li class="nav-item">
                        <a class="nav-link" href="">
                          <p>关于我们</p>
                          <span>About Us</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="">
                          <p>联系我们 </p>
                          <span>Contact Us</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="">
                          <p>加入我们</p>
                          <span>Join Us</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="">
                          <p>声 明</p>
                          <span>Disclaimer</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="">
                          <p>用户协议</p>
                          <span>Privacy</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="dp-foot-social">
                    <div class="dp-foot-icon dp-foot-icon-wechat">
                      <div class="dp-foot-pop dp-foot-pop-wechat">
                        <p>ASHA GO</p>
                      </div>
                      <i class="icon-wechat"></i>
                    </div>
                    <div class="dp-foot-icon dp-foot-icon-weibo">
                      <div class="dp-foot-pop dp-foot-pop-weibo">
                        <div class="dp-foot-pop-weibo-item dp-foot-pop-weibo-item-main">
                          <p>@ASHA GO</p>
                        </div>
                      </div>
                      <i class="icon-weibo"></i>
                    </div>
                    <div class="dp-foot-icon dp-foot-icon-app">
                      <a href="">
                        <i class="icon-phone"></i>
                      </a>
                    </div>
                    <!-- Begin MailChimp Signup Form -->
                    <div id="mc_embed_signup">
                      <div id="mce-responses" class="clear">
                        <div class="response" id="mce-error-response" style="display:none"></div>
                        <div class="response" id="mce-success-response" style="display:none"></div>
                      </div>
                    </div>

                  </div>
                </div>
                <div class="copyright">Copyright © 2020 Asha Go Inc. All rights reserved.</div>
              </div>
            </footer>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style>
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
  height: 400px;
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
}
.header-logo {
    object-position: 50% 50%;
    width: 84px;
    height: 80px;
    object-fit: contain
  }
.menu-item {
  margin-left: 30px;
  color:#fff;
}

.footer {
    color: #fff;
    padding: 3rem 0;
    /* margin-top: 15px;*/
    position: relative;
    bottom: 0;
}

.footer .nav-link {
    color: #fff;
    padding: 0;
}
.footer .footer-img {
  width: 180px;
  height: 150px;
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

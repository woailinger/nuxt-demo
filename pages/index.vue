<template>
  <div class="container">
    <a-carousel arrows dots-class="slick-dots slick-thumb" autoplay>
      <a slot="customPaging" slot-scope="props">
        <img :src="getImgUrl(props.i)" />
      </a>
      <div v-for="item in 4" :key="item">
        <img :src="baseUrl + 'abstract0' + item + '.jpg'" />
      </div>
    </a-carousel>
    <!-- <a-button @click="logout" v-if="$store.state.token">登出</a-button>
    <a-button v-else>
      <nuxt-link to="/login">请登录</nuxt-link>
    </a-button> -->
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined;
const baseUrl =
  'https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/components/vc-slick/assets/img/react-slick/';
export default {
  mounted() {
    // 初始化fbjssdk
    window.fbAsyncInit = function() {
      FB.init({
        appId            : '2816565075139161',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v7.0'
      });
    };
    console.log('fbAsync----')
    window.fbAsyncInit();
  },
  data() {
    return {
      baseUrl
    }
  },
  methods: {
    getImgUrl(i) {
      return `${baseUrl}abstract0${i + 1}.jpg`;
    },
    logout () {
      Cookie.remove('_t');
      this.$store.commit('setToken', null);
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped lang="less">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .ant-carousel  .slick-dots {
    height: auto;
  }
  .ant-carousel  .slick-slide img {
    border: 5px solid #fff;
    display: block;
    margin: auto;
    max-width: 80%;
  }
  .ant-carousel  .slick-thumb {
    bottom: -45px;
  }
  .ant-carousel  .slick-thumb li {
    width: 60px;
    height: 45px;
  }
  .ant-carousel  .slick-thumb li img {
    width: 100%;
    height: 100%;
    filter: grayscale(100%);
  }
  .ant-carousel  .slick-thumb li.slick-active img {
    filter: grayscale(0%);
  }
}
</style>

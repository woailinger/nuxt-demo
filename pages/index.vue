<template>
  <div class="container">
    <a-button @click="logout">登出</a-button>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
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
  methods: {
    logout () {
      Cookie.remove('token')
      this.$store.commit('setToken', null)
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>

<template>
  <div class="container">
    <a-button @click="logout">登出</a-button>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
export default {
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

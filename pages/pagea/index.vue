<template>
  <div>我是页面aaaaa<a-button>哈哈</a-button></div>
</template>
<script>
  export default {
    head() {
      return {
        title: '页面AAA',
        meta: [{ name: "description", hid: "description", content: "这是页面aaaa"}],
        link: [{ rel: "favicon", href: "favicon.ico" }]
      }
    },
    middleware: 'tokenenticated',
  }
</script>
<style>

</style>

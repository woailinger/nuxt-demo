<template>
  <div>page aaaaa<a-button>haha</a-button></div>
</template>
<script>
  export default {
    head() {
      return {
        title: '页面AAA',
        meta: [{ name: "description", hid: "description", content: "page aaaa"}],
        link: [{ rel: "favicon", href: "favicon.ico" }]
      }
    },
    middleware: 'tokenenticated',
  }
</script>
<style>

</style>

<template>
<div>
  <a-menu
      style="width: 256px"
      :default-selected-keys="['1']"
      :mode="mode"
      :theme="theme"
    >
      <a-menu-item key="1">
        <a-icon type="mail" />
        Navigation One
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="calendar" />
        Navigation Two
      </a-menu-item>
  </a-menu>
</div>
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
    data() {
      return {
        mode: 'inline',
        theme: 'light'
      }
    }
  }
</script>
<style>

</style>

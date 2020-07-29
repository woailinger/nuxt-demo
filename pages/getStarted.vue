<template>
  <a-result
    style="background: #fff"
    status="success"
    title="Registration Successful"
    sub-title="If you have verified the email link we sent you"
  >
    <template #extra>
      <a-button type="primary">
        <nuxt-link to="/login">Get Started</nuxt-link>
      </a-button>
    </template>
  </a-result>
</template>
<script>
  export default {
    middleware: 'notTokenenticated',
    data() {
      return {};
    },
  };
</script>

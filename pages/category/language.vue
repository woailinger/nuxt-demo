<template>
  <category-list type="Language" />
</template>

<script>
import CategoryList from './list'
export default {
  layout(context) {
        return context.isMobile ? 'h5' : 'default';
  },
  components: {CategoryList}
}
</script>

<style scoped>
</style>
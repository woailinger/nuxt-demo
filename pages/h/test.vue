
<template>
  <section class="container">
    <!-- <van-cell is-link @click="showPopup">展示弹出层</van-cell>
    <van-popup v-model="show" position="left" :style="{ width: '30%' }" /> -->
  </section>
</template>

<script>
  export default {
    name: 'h5-index',
    validate(obj) {
        console.log(obj, '----');
    },
    data () {
      return {
          show: false,
      }
    },
    mounted() {
    },
    methods: {
     showPopup () {
         this.show = true;
     }
    }
  }
</script>

<style lang="less">
  
</style>

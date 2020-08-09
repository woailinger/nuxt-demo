<template>
  <div class="container" >
      <!-- <div class="search-container">
        <a-input-search class ='search' placeholder="input search text" enter-button @search="onSearch" @pressEnter="onSearch"/>
    </div> -->
    <a-spin tip="Loading..." v-show="loadingFlag">
    </a-spin>
    <div v-show="!loadingFlag">
        <a-divider>ARTICLE</a-divider>
        <p class="card-container">
        <a-card hoverable class="card" v-for="(item, index) in latestData" :key="'lastest'+ index">
            <img
            class="card-img"
            slot="cover"
            alt="example"
            src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3651348508,1599316688&fm=26&gp=0.jpg"
            />
            <a-card-meta title="China">
            </a-card-meta>
        </a-card>
        </p>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined;
const baseUrl = '../assets/img/bg';
export default {
  watch: {
      '$route.query'(newValue) {
          console.log(newValue, '---');
          this.loadingFlag = true;
          this.getData(newValue);
      }
  },
  data() {
    return {
        baseUrl,
        loadingFlag: true,
        latestData: [
            {},
            {},
            {},
            {},
            {},
            {},
        ],
    }
  },
  mounted() {
      this.getData(this.$route.query.keyWord);
  },
  methods: {
      getData(key) {
        this.$Server({
            url: 'article/articleList',
            method: 'post',
            data: {
                key: key,
            }
        }).then(res => {
            this.loadingFlag = false;
        }).finally(() => {
            this.loadingFlag = false;
        })
      }
  }
}
</script>

<style scoped lang="less">
.container {
  margin: 0 auto;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  .card-container {
    display: flex;
    flex-wrap: wrap;
    .card {
      margin-left: 50px;
      margin-bottom: 20px;
    }
    .card-img  {
      width: 350px;
      height: 200px;
    }
  }
}
</style>

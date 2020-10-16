<template>
  <div class="container">
    <div class="title">Articles liked</div>
    <client-only>
      <div class="articlelist" :bordered="false">
        <a-card :bordered="false" >
          <a-list
            size="large"
            :bordered="false"
            :pagination="pagination"
          >
            <a-list-item :key="i" v-for="(item, i) in likeData">
              <div class="listcover">
                <img style="margin: -10px 0" shape="square" :src="item.cover" />
              </div>
              <a class="categoryContent" href="#">
                <a-list itemLayout="vertical">
                  <a-list-item>
                    <div class="content">
                      <div
                        class="detail"
                        max-width="9%;"
                        style="word-break:break-all;"
                      >{{item.title}}</div>
                      <div class="author">
                        <a-avatar
                          style="margin:10px;"
                          size="small"
                          :src="item.avatar"
                        />{{item.slots[0]}}
                        <a-divider type="vertical" />
                        <em>{{item.slots[2]}}</em>
                      </div>
                    </div>
                  </a-list-item>
                </a-list>
              </a>
            </a-list-item>
          </a-list>
        </a-card>
      </div>
    </client-only>
  </div>
</template>
<script>
export default {
  layout: "blank",
  data () {
    return {
      likeData: [],
      pagination: {
        showQuickJumper: true,
        pageSize: 5,
        total: 10,
        onChange: page => this.getData(page)
      }
    }
  },
  asyncData ({ req, $Server, redirect, store }) {
    $Server({
      url: '/like/list',
      methods: 'GET',
      params: {
        userId: store.state.userId,
        likeTargetType: 'BLOG'
      }
    }).then((res) => {
      return {
        searchData: res.data
      }
    })
  },
  created() {
    this.getLikeList();
  },
  methods: {
    getLikeList (){
      this.$Server({
        url: '/like/list',
        methods: 'GET',
        params: {
          userId: this.$store.state.userId,
          likeTargetType: 'BLOG'
        }
      }).then((res) => {
        this.likeData = res.data.likeList;
        this.pagination.total = this.likeData.length;
      })
    }
  }
}
</script>
<style scoped lang="less">
.container {
  color: #8D050B;
  min-height: 100vh;
  padding: 20px;
  .title {
    font-size: 30px;
    line-height: 80px;
    font-weight: 600;
  }
  .detail {
    width: 300px;
    margin-bottom: 35px;
    margin-left: 10px;
  }
  .listcover {
    padding-right: 30px;
    height: 140px;
    img {
      height: 110px
    }
  }
  .extra{
    width: 272px;
    height: 1px;
  }
  .content {
    margin-top: 0px;
  }
}
</style>

<template>
  <div class="container">
    <div class="title">Articles liked</div>
    <client-only>
      <div class="articlelist" :bordered="false" :body-style="{padding: '24px',margin: '15%'}">
        <a-card :bordered="false" :body-style="{padding: '24px',margin: '0px 15%'}">
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
                    <!-- <a-list-item-meta :title="item.title">
                      <div slot="description">
                        <a-tag :key="index + 's'" v-for="(it, index) in item.tags" >{{it}}</a-tag>
                      </div>
                    </a-list-item-meta> -->
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
  data () {
    return {
      likeData: [],
      searchData: [{
        imgUrl: '/assets/img/blog-details/1.jpg',
        avator: '',
        title: 'BeiJing BeiJing BeiJing',
        desc: 'This is your blog post. To really engage your site visitors we suggest you blog about subjects that are related to your site or business. Blogging is really great for SEO, so we recommend including keywords that relate to your',
        tags: ['Foods', 'Travel'],
        date: '2020-01-21',
        author: 'Jemma Admin',
        commentNum: '46',
        likeNum: '31'
      }],
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
      parmas: {
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
      })
    }
  }
}
</script>
<style scoped lang="less">
  .container {
    color: #8D050B;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    justify-content: flex-start;
    .title {
      font-size: 30px;
      line-height: 80px;
      font-weight: 600;
    }
    .detail {
      width: 300px;
    }
    .listcover {
      padding-right: 30px;
      height: 140px;
      img {
        height: 140px
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

<template>
  <div class="container">
    <div class="title">Articles liked</div>
    <client-only>
      <div class="articlelist" :bordered="false" :body-style="{padding: '24px',margin: '15%'}">
        <a-card :bordered="false" :body-style="{padding: '24px',margin: '0px 15%'}">
          <a-list
            size="large"
            :bordered="false"
            :pagination="{showQuickJumper: true, pageSize: 5, total: 20}"
          >
            <a-list-item :key="i" v-for="(item, i) in searchData">
              <div class="listcover">
                <img style="height: 200px; margin: -10px 0" shape="square" :src="item.imgUrl" />
              </div>
              <a-list-item-meta>
                <a slot="title"></a>
              </a-list-item-meta>

              <a class="categoryContent" href="#">
                <a-list itemLayout="vertical">
                  <a-list-item>
                    <a-list-item-meta :title="item.title">
                      <div slot="description">
                        <a-tag :key="index + 's'" v-for="(it, index) in item.tags" >{{it}}</a-tag>
                      </div>
                    </a-list-item-meta>
                    <div class="content">
                      <div
                        class="detail"
                        max-width="9%;"
                        style="word-break:break-all;"
                      >{{item.desc}}</div>
                      <div class="author">
                        <a-avatar
                          style="margin:10px;"
                          size="small"
                          :src="item.avatar"
                        />{{item.author}}
                        <a-divider type="vertical" />
                        <em>{{item.date}}</em>
                      </div>
                    </div>
                    <span slot="actions">
                        <a-icon style="margin-right: 8px" type="heart-o" />
                        {{item.likeNum}}
                      </span>
                    <span slot="actions">
                        <a-icon style="margin-right: 8px" type="message" />
                        {{item.commentNum}}
                      </span>
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
      }]
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
        this.searchData = res.data;
      })
    }
  }
}
</script>
<style scoped lang="less">
  .container {
    color: #8D050B;
    width: 900px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    .title {
      font-size: 30px;
      line-height: 80px;
      font-weight: 600;
    }
    .listcover {
      padding-right: 30px;
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

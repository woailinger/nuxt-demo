<template>
  <div>
    <div class="container">
     <div class="search">
       <a-input-search placeholder="search word" v-model="keyWord" @search="onSearch" />
     </div>
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
  </div>
</template>
<script>
export default {
    data() {
        return {
            keyWord: '',
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
    created() {
        console.log(this.$route.query.keyWord, 'test--');
        this.keyWord = this.$route.query.keyWord || '';
        this.getData();
    },
    methods:{
        onSearch() {
            this.getData();
        },
        getData() {
            this.$Server({
                url: '',
                methods: 'GET',
                parmas: {
                    keyWord: this.keyWord
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
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  .search {
    width: 100%;
    height: 200px;
    text-align: centrn;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598185639523&di=cb00f236c80e6ceb49f40d19081350ed&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Fback_pic%2F03%2F69%2F47%2F1057b4f83767ce8.jpg%2521%2Fwatermark%2Ftext%2FOTDorr7orqE%3D%2Ffont%2Fsimkai%2Falign%2Fsoutheast%2Fopacity%2F20%2Fsize%2F50");
    .ant-input-affix-wrapper {
      width: 40%;
      height: 40px;
    }
  }
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
</style>

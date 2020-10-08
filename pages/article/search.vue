<template>
  <div>
    <div class="page-search">
     <div class="search">
       <a-input-search placeholder="search" v-model="keyWord" @search="onSearch" size="large"/>
     </div>
      <client-only>
        <div class="article-list" :bordered="false" >
          <a-card :bordered="false" :body-style="{padding: '24px',margin: '0px 15%', 'min-width': '160px'}">
            <a-list
              size="large"
              :bordered="false"
              :pagination="pagination"
            >
              <a-list-item :key="i" v-for="(item, i) in searchData" @click="goDetail(item.blogId)">
                <div class="listcover">
                  <img style="height: 200px; margin: -10px 0" shape="square" :src="item.img" />
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
                        >{{item.content}}</div>
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
                        {{item.likes}}
                      </span>
                      <span slot="actions">
                        <a-icon style="margin-right: 8px" type="message" />
                        {{item.comment}}
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
            city: '',
            searchData: [{
                img: '/assets/img/blog-details/1.jpg',
                avator: '',
                title: 'BeiJing BeiJing BeiJing',
                content: 'This is your blog post. To really engage your site visitors we suggest you blog about subjects that are related to your site or business. Blogging is really great for SEO, so we recommend including keywords that relate to your',
                tag: ['Foods', 'Travel'],
                date: '2020-01-21',
                author: 'Jemma Admin',
                comment: '46',
                likes: '31'
            }],
            pagination: {
              showQuickJumper: true,
              pageSize: 10,
              total: 1,
              onChange: page => this.getData(page)
          }
      }
    },
    created() {
        this.keyWord = this.$route.query.keyWord || '';
        this.city =  this.$route.query.city || ''
        if (this.city) {
          this.getCityData();
        } else {
          this.getData();
        }
    },
    watch: {
      '$route.query' (val, oldval) {
        this.keyWord = val.keyWord;
      }
    },
    methods:{
        onSearch() {
            this.getData();
        },
        goDetail(blogId){
          this.$router.push({
            path: '/blog/detail',
            query: {
              blogId: blogId
            }
          })
        },
        getCityData(page){
          this.$Server({
            url: "/blog/get-blog-list",
            method: "post",
            data: {
              city: this.city
            },
            transformRequest: [
              function(data) {
                let ret = "";
                for (let it in data) {
                  ret +=
                    encodeURIComponent(it) +
                    "=" +
                    encodeURIComponent(data[it]) +
                    "&";
                }
                ret = ret.substring(0, ret.lastIndexOf("&"));

                console.log(ret, "---");
                return ret;
              }
            ],
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then(res => {
            this.searchData = res.dataList || [];
            this.pagination.total = this.searchData.length;
          })
          .finally(() => {
            this.loadingFlag = false;
          });
        },
        getData(page) {
            this.$Server({
                url: '/es/search-content',
                method: 'GET',
                params: {
                  content: this.keyWord,
                  page: page || 0
                },
                transformRequest: [
                  function(data) {
                    let ret = "";
                    for (let it in data) {
                      ret +=
                        encodeURIComponent(it) +
                        "=" +
                        encodeURIComponent(data[it]) +
                        "&";
                    }
                    ret = ret.substring(0, ret.lastIndexOf("&"));
                    return ret;
                  }
                ],
            }).then((res) => {
                this.searchData = res.dataList;
                this.pagination.total = this.searchData.length;
            })
        }
    }
}
</script>
 <style scoped lang="less">
.page-search {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  .search {
    width: 100%;
    height: 400px;
    text-align: centrn;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("../../assets/img/search.jpg");
    background-size: cover;
    .ant-input-affix-wrapper {
      margin-top: -10%;
      width: 40%;
    }
  }
  .article-list {
       color: red;
      .ant-card-body {
         min-width: 160px;
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
    .detail {
      max-height: 120px;
      overflow: hidden;
      word-wrap:break-word;
    }
  }
}

</style>

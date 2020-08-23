<template>
  <div class="container">
    <!-- <div class="search-container">
        <a-input-search class ='search' placeholder="input search text" enter-button @search="onSearch" @pressEnter="onSearch"/>
    </div>-->
    <div style="margin-bottom:30px">
      <a-row :gutter="16">
        <a-row type="flex" justify="space-around" align="middle">
          <a-col :span="12" justify="center">
            <h1 class="title wow fadeInLeft" data-wow-delay=".5s">DAILY LIFE</h1>
            <h5>Articles about daily life</h5>
            <p>Articles about daily life.Such as aaaaaaaaaaaaaaaaaaaaaaaaaabalsdhasdhasjkdasdgasdjhas</p>
          </a-col>
          <a-col :span="12" justify="center">
            <img
              src="https://ashago.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20China%20website%202020/Food%26Drinks/The%20most%20famous%20Chinese%20tea/%E9%A6%96%E9%A1%B5%E5%B0%81%E9%9D%A2%E5%9B%BE%E7%89%87.jpg?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=1001596708617&Signature=v0f%2BqrXbk%2BuRURvYNs8muA%2BeRuA%3D"
              alt="images"
              style="height:200px"
            >
          </a-col>
        </a-row>
      </a-row>
    </div>
    <div></div>
    <client-only>
      <a-spin tip="Loading..." v-show="loadingFlag"></a-spin>
      <div v-show="!loadingFlag">
      <div class="articlelist" :bordered="false" :body-style="{padding: '24px',margin: '15%'}">
        <a-card :bordered="false" :body-style="{padding: '24px',margin: '0px 15%'}">
          <div class="tag-list">
            <a-card :bordered="true">
              <h2>
                <a-icon type="schedule" style="margin-right: 1%"/>Hot Tags
              </h2>
              <a-divider/>
              <div>
                <a-button class="tag-btn">Travel Tips</a-button>
                <a-button class="tag-btn">Food</a-button>
              </div>
            </a-card>
          </div>
          <a-list
            size="large"
            :bordered="false"
            :pagination="{showQuickJumper: true, pageSize: 5, total: latestData.length}"
          >
            <a-list-item v-for="(item, index) in latestData"
            :key="'lastest'+ index">
              <div class="listcover">
                <img style="height: 200px; margin: -10px 0" shape="square" v-bind:src="item.img">
              </div>
              <a-list-item-meta>
                <a slot="title"></a>
              </a-list-item-meta>

              <a class="categoryContent" href="#">
                <a-list itemLayout="vertical">
                  <a-list-item>
                    <a-list-item-meta v-bind:title="item.title">
                      <div slot="description">
                        <a-tag>Travel Tips</a-tag>
                        <a-tag>Food</a-tag>
                      </div>
                    </a-list-item-meta>
                    <div class="content">
                      <div
                        class="detail"
                        max-width="9%;"
                        style="word-break:break-all;"
                      >This is your blog post. To really engage your site visitors we suggest you blog about subjects that are related to your site or business. Blogging is really great for SEO, so we recommend including keywords that relate to your...</div>
                      <div class="author">
                        <a-avatar
                          style="margin:10px;"
                          size="small"
                          src="https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/pic/citis/IMG_0209.PNG"
                        />Jem Admin
                        <a-divider type="vertical"/>1 min read
                        <a-divider type="vertical"/>
                        <em>2018-08-05 22:23</em>
                      </div>
                    </div>
                    <span slot="actions">
                      <a-icon style="margin-right: 8px" type="heart-o"/>156
                    </span>
                    <span slot="actions">
                      <a-icon style="margin-right: 8px" type="message"/>4
                    </span>
                  </a-list-item>
                </a-list>
              </a>
            </a-list-item>
          </a-list>
        </a-card>
      </div></div>
    </client-only>
  </div>
</template>

<script>
//const Cookie = process.client ? require('js-cookie') : undefined;
const baseUrl = "../assets/img/bg";
const params = new URLSearchParams();
params.append("blogId", "493251007427682304");
export default {
  watch: {
    "$route.query"(newValue) {
      console.log(newValue, "Newvalue");
      this.loadingFlag = true;
      this.getData(newValue);
    }
  },
  data() {
    return {
      baseUrl,
      loadingFlag: true,
      latestData: [{}, {}, {}, {}, {}, {}]
    };
  },
  mounted() {
    this.getData(this.$route.query.blogId, function(data) {
      console.log(data, "DA");
    });
  },
  methods: {
    getData(key, callback) {
      this.$Server({
        url: "http://localhost:8080/blog/get-blog-list",
        method: "post",
        data: {
          blogId: key
        },
        transformRequest: [
          function(data) {
            let ret = "";
            for (let it in data) {
              // 如果 data[it] 是一个对象, 需要先使用 JSON.stringify, 再使用 encode
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
      })
        .then(res => {
          this.loadingFlag = false;
          this.latestData = res.dataList;
          console.log(res.dataList, "LIST");
          callback(res.dataList);
        })
        .finally(() => {
          this.loadingFlag = false;
        });
    }
  }
};
</script>
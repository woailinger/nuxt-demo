<template>
  <div>
    <div class="container category-list">
      <div class="exception">
        <div class="img">
          <img :src="config[type].img" style="height:260px">
        </div>
        <div class="content">
          <h1>{{config[type].title}}</h1>
          <div class="desc">{{config[type].desc}}</div>
          <div class="action">
            <p>{{config[type].content}}</p>
          </div>
        </div>
      </div>
      <client-only>
        <div class="articlelist" :bordered="false">
          <a-card :bordered="false">
            <a-spin tip="Loading..." v-show="loadingFlag"></a-spin>
            <div v-show="!loadingFlag" v-if="latestData">
              <div class="tag-list">
                <a-card :bordered="true">
                  <h2>
                    <a-icon type="schedule" style="margin-right: 1%"/>Hot Tags
                  </h2>
                  <a-divider/>
                  <div>
                     <a-button
                      style="margin-bottom: 2%"
                      class="tag-btn"
                      v-for="(tagName, tagIndex) in allTagList"
                      :key="'lastest'+ tagIndex"
                      v-bind:href="'/category/bloglist?tag='+tagName"
                    >{{tagName}}</a-button>
                  </div>
                </a-card>
              </div>
              <a-list size="large" :bordered="false">
                <a-list-item v-for="(item, index) in latestData" :key="'lastest'+ index">
                  <div class="listcover">
                    <img
                      shape="square"
                      v-bind:src="item.img"
                    >
                  </div>
                  <a-list-item-meta>
                    <a slot="title"></a>
                  </a-list-item-meta>

                  <a class="categoryContent" v-bind:href="'/blog/detail?blogId='+ item.blogId">
                    <a-list itemLayout="vertical">
                      <a-list-item>
                        <a-list-item-meta v-bind:title="item.title">
                          <div slot="description">
                            <a-tag
                              v-for="(tagName, tagIndex) in tagList[index]"
                              :key="'lastest'+ tagIndex"
                            >{{tagName}}</a-tag>
                          </div>
                        </a-list-item-meta>
                        <div class="content">
                          <div
                            class="detail"
                            max-width="9%;"
                            style="word-break:break-all;"
                          >{{item.content.substring(0,200)}}...</div>
                          <div class="author">
                            <a-avatar
                              style="margin:10px;"
                              size="small"
                              v-bind:src="item.avatar"
                            />
                            {{item.author}}
                            <a-divider type="vertical"/>
                            {{item.time}} read
                          </div>
                        </div>
                        <span slot="actions">
                          <a-icon style="margin-right: 8px" type="heart-o"/>
                          {{item.likes}}
                        </span>
                        <span slot="actions">
                          <a-icon style="margin-right: 8px" type="message"/>
                          {{item.comment}}
                        </span>
                      </a-list-item>
                    </a-list>
                  </a>
                </a-list-item>
              </a-list>
            </div>
          </a-card>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
import { HeartOutlined } from "@ant-design/icons";
import Config from "./categoryConfig";
const Cookie = process.client ? require("js-cookie") : undefined;
const latestData = [];
const tagList = [[]];
const config = Config;
const allTagList = [];
export default {
  name: "CategoryList",
  props: ["type"],
  watch: {
    "$route.query"(newValue) {
      console.log(newValue, "Newvalue");
      this.loadingFlag = true;
      this.getData(newValue);
    }
  },
  data() {
    return {
      loadingFlag: true,
      latestData,
      tagList,
      comments: [],
      config: Config,
      submitting: false,
      value: "",
      allTagList
    };
  },
  mounted() {
    this.getData(this.$route.query.category);
  },
  methods: {
    getData(key, callback) {
      this.$Server({
        //url: "http://localhost:8080/blog/get-blog-list",
        url: "/blog/get-blog-list",
        method: "post",
        data: {
          category: key
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
      })
        .then(res => {
          this.loadingFlag = false;
          this.latestData = res.dataList;
          this.allTagList = res.data.split(",");
          if (res.dataList) {
            for (var k = 0; k < res.dataList.length; k++) {
              //this.latestData.tagList[k] = res.dataList[k].tag.split(",");
              tagList[k] = res.dataList[k].tag.split(",");
            }
          }
          console.log(res.dataList, "LIST");
          console.log(tagList, "Tag");
        })
        .finally(() => {
          console.log(config, "Config");
          this.loadingFlag = false;
        });
    },
    handleChange(e) {
      this.value = e.target.value;
    }
  }
};
</script>
 <style scoped lang="less">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  padding: 5% 0px;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
.listcover {
  padding-right: 30px;
  @media (max-width: 992px) {
    padding: 0px;
  }
  img {
    height: 200px; 
    margin: -10px 0;
    @media (max-width: 992px) {
      height: 100%;
      width: 100%;
    }
  }
}
.extra {
  width: 272px;
  height: 1px;
}
.content {
  margin-top: 0px;
}
.tag-btn {
  margin-right: 10px;
}
.tag-list {
  margin-bottom: 5%;
}
.cover {
  margin-left: 10%;
}
.exception {
  align-items: center;
  text-align: center;
  margin-bottom: 3%;
  .img {
    @media (max-width: 992px) {
      width: 100%;
      padding: 0;
    }
    display: inline-block;
    padding-right: 52px;
    zoom: 1;
    img {
      height: 360px;
      max-width: 430px;
    }
  }
  .content {
    display: inline-block;
    width: 35%;
    text-align: left;
    @media (max-width: 992px) {
      width: 100%;
      padding: 3rem;
      padding-bottom: 0;
    }
    h1 {
      color: #434e59;
      font-size: 60px;
      font-weight: 600;
      line-height: 60px;
      margin-bottom: 24px;
    }
    p {
      font-size: 18px;
      line-height: 20px;
      margin-bottom: 24px;
      text-align: left;
    }
    .desc {
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 16px;
    }
  }
}
.articlelist {
  padding: 24px;
  margin: 0px 15%;
  @media (max-width: 992px) {
    padding: 0px;
    margin: 0px;
  }
}
</style>

<template>
  <div>
    <div class="container category-list">
      <div style="margin-bottom:30px">
        <a-row :gutter="16">
          <a-row type="flex" justify="space-around" align="middle">
            <a-col :span="10" justify="center" class="cover">
              <h1 class="title wow fadeInLeft" data-wow-delay=".5s">{{config[type].title}}</h1>
              <h3>{{config[type].desc}}</h3>
              <p>{{config[type].content}}</p>
            </a-col>
            <a-col :span="10" justify="center">
              <img :src="config[type].img" alt="images" style="height:200px">
            </a-col>
          </a-row>
        </a-row>
      </div>
      <client-only>
        <div class="articlelist" :bordered="false" :body-style="{padding: '24px',margin: '15%'}">
          <a-card :bordered="false" :body-style="{padding: '24px',margin: '0px 15%'}">
            <a-spin tip="Loading..." v-show="loadingFlag"></a-spin>
            <div v-show="!loadingFlag" v-if="latestData">
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
              >
                <a-list-item v-for="(item, index) in latestData" :key="'lastest'+ index">
                  <div class="listcover">
                    <img
                      style="height: 200px; margin: -10px 0"
                      shape="square"
                      v-bind:src="item.img"
                    >
                  </div>
                  <a-list-item-meta>
                    <a slot="title"></a>
                  </a-list-item-meta>

                  <a class="categoryContent" href="#">
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
                              src="https://ashago.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20China%20website%202020/Food%26Drinks/The%20most%20famous%20Chinese%20tea/%E9%A6%96%E9%A1%B5%E5%B0%81%E9%9D%A2%E5%9B%BE%E7%89%87.jpg?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=1001596708617&Signature=v0f%2BqrXbk%2BuRURvYNs8muA%2BeRuA%3D"
                            />
                            {{item.author}}
                            <a-divider type="vertical"/>
                            {{item.time}} read
                            <a-divider type="vertical"/>
                            <em>{{item.date}}</em>
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
const legacySystemHTML = "";
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
      legacySystemHTML,
      tagList,
      comments: [],
      config: Config,
      submitting: false,
      value: ""
    };
  },
  mounted() {
    this.getData(this.$route.query.category);
  },
  methods: {
    getData(key, callback) {
      this.$Server({
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
          if (res.dataList){
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
  padding: 100px 0px;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
.listcover {
  padding-right: 30px;
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
</style>

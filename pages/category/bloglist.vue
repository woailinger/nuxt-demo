<template>
  <div class="blog-list">
    <client-only>
        <div class="articlelist" :bordered="false">
          <a-card :bordered="false">
            <a-spin tip="Loading..." v-show="loadingFlag"></a-spin>
            <div v-show="!loadingFlag" v-if="latestData">
              
              <a-list size="large" :bordered="false">
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
                          >{{item.content.substring(0,200)}}...</div>
                          <div class="author">
                            <a-avatar
                              style="margin:10px;"
                              size="small"
                              :src="item.avatar"
                            />
                            {{item.author}}
                            <a-divider type="vertical"/>
                            {{item.time}} read
                          </div>
                        </div>
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
</template>
<script>
import { HeartOutlined } from "@ant-design/icons";
import Config from "./categoryConfig";
const Cookie = process.client ? require("js-cookie") : undefined;
const latestData = [];
const tagList = [[]];
const config = Config;
export default {
  name: "BlogList",
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
      value: ""
    };
  },
  mounted() {
    this.getData(this.$route.query.tag);
  },
  methods: {
    getData(key, callback) {
      this.$Server({
        //url: "http://localhost:8080/es/search-tag",
        url: "/es/search-tag",
        method: "get",
        params: {
          tag: key
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
.articlelist {
  padding: 24px;
  margin: 0px 15%;
  @media (max-width: 992px) {
    padding: 0px;
    margin: 0px;
  }
}
</style>
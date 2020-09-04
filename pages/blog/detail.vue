<template>
  <div class="container">
    <div>
      <a-spin tip="Loading..." v-show="loadingFlag"></a-spin>
      <div v-show="!loadingFlag" v-if="latestData">
        <a-card style="margin: 24px 0px" :body-style="{padding: '60px'}">
          <div style="margin-bottom: 60px">
            <a-avatar style="margin:10px;" size="small" :src="latestData.avatar"/>
            {{latestData.author}}
            <a-divider type="vertical"/>
            {{latestData.time}} read
            <a-divider type="vertical"/>
            <em>{{latestData.date}}</em>
          </div>
          <div v-html="legacySystemHTML"></div>
          <div>
            <a-button class="tag" v-for="(item, index) in tagList" :key="'lastest'+ index">{{item}}</a-button>
          </div>
          <a-divider/>
          <div class="socialmedia">
            <a-row>
              <a-col :span="12">
                <h2>
                  <a
                    target="_blank"
                    v-bind:href="'http://www.facebook.com/sharer.php?u='+ encodeURIComponent(currentUrl)"
                  >
                    <a-icon type="facebook" style="margin-right: 12px"/>
                  </a>
                  <a
                    target="_blank"
                    v-bind:href="'http://twitter.com/share?url='+ encodeURIComponent(currentUrl)"
                  >
                    <a-icon type="twitter" style="margin-right: 12px"/>
                  </a>
                  <a
                    target="_blank"
                    v-bind:href="'https://www.linkedin.com/shareArticle?url='+ encodeURIComponent(currentUrl)"
                  >
                    <a-icon type="linkedin" style="margin-right: 12px"/>
                  </a>
                  <a @click="copyUrl">
                    <a-icon type="link" style="margin-right: 12px"/>
                  </a>
                </h2>
              </a-col>

              <div style="float: right;">
                <a-col style="float: right;">
                  <h2>{{latestData.city}}</h2>
                </a-col>
              </div>
            </a-row>
          </div>
          <a-divider/>
          <div class="salesCard" style="margin-bottom: 48px">
            <a-row>
              <a-col :span="6">{{latestData.views}} views</a-col>
              <div style="float: right;">
                <a-col style="float: right;">
                  {{latestData.likes}}
                  <a id="like">
                    <a-icon type="heart" v-show="likeIcon" theme="filled" @click="cancelLike"/>
                    <a-icon type="heart" v-show="!likeIcon" theme="outlined" @click="postLike"/>
                  </a>
                </a-col>
              </div>
            </a-row>
          </div>
          <div style="padding-top: 50px;padding-bottom: 50px">
            <div class="normal-content">
              <p>Related Posts</p>
            </div>
            <a-row :gutter="[8,40]">
              <a-col :span="6" v-for="(item, index) in latestRealatedBlog" :key="'related'+ index">
                <a v-bind:href="'/blog/detail?blogId='+ item.blogId">
                  <a-card>
                    <img slot="cover" alt="example" :src="item.img">
                    <a-card-meta>
                      <div style="height: 54px; white-space: normal;" slot="title">{{item.title}}</div>
                    </a-card-meta>
                  </a-card>
                </a>
              </a-col>
            </a-row>
          </div>
          <a-comment v-for="(item, index) in commentsData" :key="'related'+ index">
            <a slot="author">{{item.author}}</a>
            <a-avatar slot="avatar" :src="item.avatar" alt="Han Solo"/>
            <p slot="content">{{item.content}}</p>
          </a-comment>
          <div>
            <a-list
              v-if="comments.length"
              :data-source="comments"
              :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`"
              item-layout="horizontal"
            >
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-comment
                  :author="item.author"
                  :avatar="item.avatar"
                  :content="item.content"
                  :datetime="item.datetime"
                />
              </a-list-item>
            </a-list>
            <a-comment>
              <div slot="content">
                <a-form-item>
                  <a-textarea :rows="4" :value="value" @change="handleChange"/>
                </a-form-item>
                <a-form-item>
                  <a-button
                    html-type="submit"
                    :loading="submitting"
                    style="float: right;"
                    type="primary"
                    @click="handleSubmit"
                  >Add Comment</a-button>
                </a-form-item>
              </div>
            </a-comment>
          </div>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
import { HeartOutlined } from "@ant-design/icons";

import { constants } from "zlib";
import { connect } from "tls";
import { log } from "util";
import { parse } from "querystring";
import copy from "copy-to-clipboard";

const Cookie = process.client ? require("js-cookie") : undefined;
const latestData = {};
const commentsData = {};
const latestRealatedBlog = [];
const legacySystemHTML = "";
const blogId = "";
const currentUrl = "";
export default {
  watch: {
    "$route.query"(newValue) {
      console.log(newValue, "Newvalue");
      this.loadingFlag = true;
      this.getData(newValue);
    }
  },
  created() {
    this.getData(this.$route.query.blogId, function(data) {
      console.log(data, "DA");
    });
    this.getComments(this.$route.query.blogId);
    this.getLike(this.$route.query.blogId);
  },
  data() {
    return {
      loadingFlag: true,
      latestData,
      latestRealatedBlog,
      legacySystemHTML,
      tagList: [],
      comments: [],
      submitting: false,
      value: "",
      blogId,
      commentsData,
      likeIcon: false,
      currentUrl
    };
  },
  mounted() {
    this.currentUrl = location.href;
  },
  methods: {
    getData(key, callback) {
      this.$Server({
        //url: "http://localhost:8080/blog/get-blog-info",
        url: "/blog/get-blog-info",
        method: "post",
        data: {
          blogId: key
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

          this.latestData = res.data;
          this.latestRealatedBlog = res.dataList;
          this.legacySystemHTML = res.data.html;
          this.tagList = res.data.tag.split(",");
          this.blogId = key;
          console.log(res.data, "DATA");
          console.log(res.dataList, "DATALIST");
        })
        .finally(() => {
          this.loadingFlag = false;
        });
    },
    getComments(key) {
      this.$Server({
        //url: 'http://localhost:8080/comment/list',
        url: "/comment/list",
        method: "get",
        data: {
          blogId: key
        }
      })
        .then(res => {
          if (res.code == 0) {
            this.commentsData = res.data.comments;
            console.log(res.data.comments, "comment");
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          this.$message.waring(err);
        });
    },
    getLike(key) {
      if (this.$store.state.userId) {
        this.$Server({
          //url: 'http://localhost:8080/like/like-or-not',
          url: "/like/like-or-not",
          method: "get",
          params: {
            likeTargetId: key,
            likeTargetType: "BLOG",
            userId: this.$store.state.userId
          }
        })
          .then(res => {
            console.log(res, "get like res");
            this.likeIcon = res.data.likeOrNot;
          })
          .catch(err => {
            console.log(err, "err");
          });
      }
    },
    cancelLike() {
      this.$Server({
        //url: 'http://localhost:8080/comment/post',
        url: "/like/cancel",
        method: "post",
        data: {
          likeTargetId: this.blogId,
          likeTargetType: "BLOG",
          userId: this.$store.state.userId
        }
      })
        .then(res => {
          console.log(res, "cancel like res");
          this.likeIcon = false;
        })
        .catch(err => {
          console.log(err, "err");
        });
    },
    postLike() {
      this.$Server({
        //url: 'http://localhost:8080/comment/post',
        url: "/like/post",
        method: "post",
        data: {
          likeTargetId: this.blogId,
          likeTargetType: "BLOG",
          userId: this.$store.state.userId
        }
      })
        .then(res => {
          console.log(res, "post like res");
          this.likeIcon = true;
        })
        .catch(err => {
          console.log(err, "err");
        });
    },
    handleSubmit() {
      if (!this.value) {
        return;
      }
      this.loading = true;
      this.$Server({
        //url: 'http://localhost:8080/comment/post',
        url: "/comment/post",
        method: "post",
        data: {
          blogId: this.blogId,
          userId: this.$store.state.userId,
          content: this.value
        }
      })
        .then(res => {
          console.log(res, "handle submit res");
          this.getComments(this.blogId);
        })
        .catch(err => {
          console.log(err, "err");
        });
    },
    copyUrl() {
      copy(this.currentUrl);
    },
    handleChange(e) {
      this.value = e.target.value;
    }
  }
};
</script>
<style scoped lang="less">
.container {
  margin: 0 15%;
  min-height: 100vh;
  display: flex;
  padding: 50px 0px;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
.tag {
  margin-right: 10px;
}
.normal-content {
  align-items: center;
  text-align: center;
  display: inline-block;
  text-align: left;
  p {
    font-size: 20px;
    line-height: 20px;
    margin-bottom: 20px;
    text-align: left;
  }
}
</style>
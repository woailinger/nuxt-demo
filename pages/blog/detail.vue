<template>
  <div class="container">
    <div>
        <a-spin tip="Loading..." v-show="loadingFlag"></a-spin>
      <div v-show="!loadingFlag" v-if="latestData">
        <a-card style="margin: 24px 0px" :body-style="{padding: '60px'}">
          <div style="margin-bottom: 60px">
            <a-avatar
              style="margin:10px;"
              size="small"
              :src="latestData.avatar"
            />
            {{latestData.author}}
            <a-divider type="vertical"/>
            {{latestData.time}} read
            <a-divider type="vertical"/>
            <em>2018-08-05 22:23</em>
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
                  <a-icon type="facebook" style="margin-right: 12px"/>
                  <a-icon type="twitter" style="margin-right: 12px"/>
                  <a-icon type="linkedin" style="margin-right: 12px"/>
                  <a-icon type="link" style="margin-right: 12px"/>
                </h2>
              </a-col>

              <div style="float: right;">
                <a-col style="float: right;">
                  <h2 >{{latestData.city}}</h2>
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
                  <a-icon type="heart"/>
                </a-col>
              </div>
            </a-row>
          </div>
          <div style="padding-top: 50px;padding-bottom: 50px">
            <div class="related-post mt-50">
              <h2 class="mb-30">Related Posts</h2>
            </div>
            <a-row :gutter="[48,40]">
                <a-col  :span="6" v-for="(item, index) in latestRealatedBlog" :key="'related'+ index">
                    <a-card>
                  <img
                    slot="cover"
                    alt="example"
                    :src="item.img"
                  >
                  <a-card-meta :title="item.title" :description="item.content.substr(0,15)"></a-card-meta>
                </a-card>
                </a-col>
            </a-row>
            <!--<a-row :gutter="16">
              <a-col :span="8">
                <a-card hoverable style="width: 300px">
                  <img
                    slot="cover"
                    alt="example"
                    src="https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/pic/citis/IMG_0209.PNG"
                  >
                  <a-card-meta title="Card title" description="This is the tag"></a-card-meta>
                </a-card>
              </a-col>
              <a-col :span="8">
                <a-card hoverable style="width: 300px">
                  <img
                    slot="cover"
                    alt="example"
                    src="https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/pic/citis/IMG_0209.PNG"
                  >
                  <a-card-meta title="Card title" description="This is the tag"></a-card-meta>
                </a-card>
              </a-col>
              <a-col :span="8">
                <a-card hoverable style="width: 300px">
                  <img
                    slot="cover"
                    alt="example"
                    src="https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/pic/citis/IMG_0209.PNG"
                  >
                  <a-card-meta title="Card title" description="This is the tag"></a-card-meta>
                </a-card>
              </a-col>
            </a-row>-->
          </div>
          <a-comment>
            <span slot="actions" key="comment-nested-reply-to">Reply to</span>
            <a slot="author">Han Solo</a>
            <a-avatar
              slot="avatar"
              src="https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/pic/citis/IMG_0209.PNG"
              alt="Han Solo"
            />
            <p
              slot="content"
            >We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).</p>
            <a-comment>
              <span slot="actions">Reply to</span>
              <a slot="author">Han Solo</a>
              <a-avatar
                slot="avatar"
                src="https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/pic/citis/IMG_0209.PNG"
                alt="Han Solo"
              />
              <p slot="content">
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure).
              </p>
              <a-comment>
                <span slot="actions">Reply to</span>
                <a slot="author">Han Solo</a>
                <a-avatar
                  slot="avatar"
                  src="https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/pic/citis/IMG_0209.PNG"
                  alt="Han Solo"
                />
                <p slot="content">
                  We supply a series of design principles, practical patterns and high quality design
                  resources (Sketch and Axure).
                </p>
              </a-comment>
              <a-comment>
                <span slot="actions">Reply to</span>
                <a slot="author">Han Solo</a>
                <a-avatar
                  slot="avatar"
                  src="https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/pic/citis/IMG_0209.PNG"
                  alt="Han Solo"
                />
                <p slot="content">
                  We supply a series of design principles, practical patterns and high quality design
                  resources (Sketch and Axure).
                </p>
              </a-comment>
            </a-comment>
          </a-comment>
          <a-comment>
            <span slot="actions">Reply to</span>
            <a slot="author">Han Solo</a>
            <a-avatar
              slot="avatar"
              src="https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/pic/citis/IMG_0209.PNG"
              alt="Han Solo"
            />
            <p
              slot="content"
            >We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).</p>
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
              <a-avatar
                slot="avatar"
                src="https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/pic/citis/IMG_0209.PNG"
                alt="Han Solo"
              />
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
import moment from "moment";
import { constants } from "zlib";
import { connect } from 'tls';

const Cookie = process.client ? require("js-cookie") : undefined;
const baseUrl = "../assets/img/bg";
const params = new URLSearchParams();
const latestData = {};
const latestRealatedBlog = [];
const legacySystemHTML = "";
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
      latestData,
      latestRealatedBlog,
      legacySystemHTML,
      tagList: [],
      comments: [],
      submitting: false,
      value: "",
      moment,
      rawHtml: "testBlog.html"
    };
  },
  mounted() {
    this.getData(this.$route.query.blogId, function(data) {
      //this.latestData = data;
      console.log(data, "DA");
    });
  },
  methods: {
    getData(key, callback) {
      this.$Server({
        url: "/blog/get-blog-info",
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

          this.latestData = res.data;
          this.latestRealatedBlog = res.dataList;
          this.legacySystemHTML = res.data.html;
          this.tagList = res.data.tag.split(",");
          console.log(res.data, "DATA");
          console.log(res.dataList, "DATALIST");
        })
        .finally(() => {
          this.loadingFlag = false;
        });
    },
    handleSubmit() {
      if (!this.value) {
        return;
      }

      this.submitting = true;

      setTimeout(() => {
        this.submitting = false;
        this.comments = [
          {
            author: "Han Solo",
            avatar: "assets/img/blog-details/avatar-1.jpg",
            content: this.value,
            datetime: moment().fromNow()
          },
          ...this.comments
        ];
        this.value = "";
      }, 1000);
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
</style>
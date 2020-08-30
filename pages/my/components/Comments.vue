<template>
  <div class="container">
    <div class="title">Your comments</div>
    <a-list
      class="comment-list"
      :header="`${commentsData.length} replies`"
      item-layout="horizontal"
      :data-source="commentsData"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-comment :author="item.author" :avatar="item.avatar">
          <template slot="actions">
            <span>
              comment on  {{item.blogName}}
            </span>
          </template>
          <p slot="content">
            {{ item.content }}
          </p>
          <a-tooltip slot="datetime" :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
            <span>{{ item.datetime.fromNow() }}</span>
          </a-tooltip>
        </a-comment>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  data () {
    return {
      commentsData: [
        {
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          datetime: moment().subtract(1, 'days'),
          blogId: '',
          blogName: 'beijing City',
        },
        {
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          datetime: moment().subtract(2, 'days'),
          blogId: '',
          blogTitle: 'shanghai City',
        },
      ],
      moment
    }
  },
  created() {
    this.getComments();
  },
  asyncData ({ req, $Server, redirect, store }) {
    $Server({
      url: '/comment/list',
      method: 'GET',
      parmas: {
        userId: store.state.userId
      }
    }).then(res => {
      if (res.code == 0) {
        // 重定向到登录页面
//        redirect('/login');
      } else {
        return {
          data: res.data.comments
        }
      }
    })
  },
  methods: {
    getComments() {
      this.$Server({
      url: '/comment/list',
      method: 'GET',
      parmas: {
        userId: this.$store.state.userId
      }
    }).then(res => {
      if (res.code == 0) {
        this.commentsData = res.data.comments
      } else {
        this.$message.error(res.msg);
      }
    })
    }
  }
}
</script>
<style scoped lang="less">
  .container {
    color: #8D050B;
    width: 900px;
    .title {
      font-size: 30px;
      line-height: 80px;
      font-weight: 600;
    }
    .comments{
      .item {
        display: flex;
        margin-bottom: 20px;
        align-items: center;
        .delete {
          width: 150px;
          height: 100px;
          line-height: 100px;
          text-align: center;
          border-radius: 5px;
          background: #e7e6e6;
          margin-left: 50px;
          cursor: pointer;
        }
        .item-content {
          flex: 1;
          border: 1px solid #8D050B;
          border-radius: 5px;
          padding: 5px 10px;
          display: flex;
          align-items: center;
          .pic {
            width: 150px;
            height: 100px;
            border: 1px solid #ccc;
            margin-right: 15px;
          }
          .desc {
            flex: 1;
            .title {
              font-size: 18px;
              display: flex;
              justify-content: space-between;
              line-height: 30px;
              font-weight: 500;
            }
            .time {
              font-size: 14px;
              color: black;
              font-weight: 500;
              line-height: 30px;
              border-bottom: 1px solid #ccc;
            }
            .desc-content {
              font-size: 14px;
              color: black;
              .desc-content-item {
                font-weight: 400;
                line-height: 20px;
                .desc-content-item-title {
                }
                .desc-content-item-where {
                  color: #8D050B;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

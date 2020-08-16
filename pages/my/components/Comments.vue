<template>
  <div class="container">
    <div class="title">Your comments</div>
    <a-list
      class="comment-list"
      :header="`${data.length} replies`"
      item-layout="horizontal"
      :data-source="data"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-comment :author="item.author" :avatar="item.avatar">
          <template slot="actions">
            <span v-for="action in item.actions">{{ action }}</span>
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
    <!--<ul class="comments">-->
      <!--<li class="item">-->
        <!--<div class="item-content">-->
          <!--<img src="" alt="" class="pic">-->
          <!--<div class="desc">-->
            <!--<div class="title">-->
              <!--<span class="name">[POSTPONED] HOT & Spicy Festival 2020</span>-->
              <!--<span class="star"><a-icon type="star" theme="filled" /></span>-->
            <!--</div>-->
            <!--<div class="time">Jun 25 11:00 am - 08:00 pm</div>-->
            <!--<div class="desc-content">-->
              <!--<div class="desc-content-item">-->
                <!--<span class="desc-content-item-title">Where:</span>-->
                <!--<span class="desc-content-item-where">Galaxy Soho</span>-->
              <!--</div>-->
              <!--<div class="desc-content-item">-->
                <!--<span class="desc-content-item-title">POSTPONED:</span>-->
                <!--<span>&ndash;&gt; My love is like the grasses,Hidden in the deep mountains.Though its abundance increase,There is none that knows.</span>-->
              <!--</div>-->
              <!--<div class="desc-content-item">-->
                <!--<span class="desc-content-item-title">Is it free?:</span>-->
                <!--<span>Not free</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="delete">Delete Comment</div>-->
      <!--</li>-->
      <!--<li class="item">-->
        <!--<div class="item-content">-->
          <!--<img src="" alt="" class="pic">-->
          <!--<div class="desc">-->
            <!--<div class="title">-->
              <!--<span class="name">[POSTPONED] HOT & Spicy Festival 2020</span>-->
              <!--<span class="star"><a-icon type="star" /></span>-->
            <!--</div>-->
            <!--<div class="time"></div>-->
            <!--<div class="desc-content">-->
              <!--<div class="desc-content-item">-->
                <!--<span class="desc-content-item-title">Where:</span>-->
                <!--<span class="desc-content-item-where">Galaxy Soho</span>-->
              <!--</div>-->
              <!--<div class="desc-content-item">-->
                <!--<span class="desc-content-item-title">POSTPONED:</span>-->
                <!--<span>&ndash;&gt; My love is like the grasses,Hidden in the deep mountains.Though its abundance increase,There is none that knows.</span>-->
              <!--</div>-->
              <!--<div class="desc-content-item">-->
                <!--<span class="desc-content-item-title">Is it free?:</span>-->
                <!--<span>Not free</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="delete">Delete Comment</div>-->
      <!--</li>-->
    <!--</ul>-->
    <!--<div class="title">Articles liked</div>-->
    <!--<ul class="comments">-->
      <!--<li class="item">-->
        <!--<div class="item-content">-->
          <!--<img src="" alt="" class="pic">-->
          <!--<div class="desc">-->
            <!--<div class="title">-->
              <!--<span class="name">[POSTPONED] HOT & Spicy Festival 2020</span>-->
              <!--<span class="star"><a-icon type="star" theme="filled" /></span>-->
            <!--</div>-->
            <!--<div class="time">Jun 25 11:00 am - 08:00 pm</div>-->
            <!--<div class="desc-content">-->
              <!--<div class="desc-content-item">-->
                <!--<span class="desc-content-item-title">Where:</span>-->
                <!--<span class="desc-content-item-where">Galaxy Soho</span>-->
              <!--</div>-->
              <!--<div class="desc-content-item">-->
                <!--<span class="desc-content-item-title">POSTPONED:</span>-->
                <!--<span>&ndash;&gt; My love is like the grasses,Hidden in the deep mountains.Though its abundance increase,There is none that knows.</span>-->
              <!--</div>-->
              <!--<div class="desc-content-item">-->
                <!--<span class="desc-content-item-title">Is it free?:</span>-->
                <!--<span>Not free</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="delete">Delete</div>-->
      <!--</li>-->
      <!--<li class="item">-->
        <!--<div class="item-content">-->
          <!--<img src="" alt="" class="pic">-->
          <!--<div class="desc">-->
            <!--<div class="title">-->
              <!--<span class="name">[POSTPONED] HOT & Spicy Festival 2020</span>-->
              <!--<span class="star"><a-icon type="star" /></span>-->
            <!--</div>-->
            <!--<div class="time"></div>-->
            <!--<div class="desc-content">-->
              <!--<div class="desc-content-item">-->
                <!--<span class="desc-content-item-title">Where:</span>-->
                <!--<span class="desc-content-item-where">Galaxy Soho</span>-->
              <!--</div>-->
              <!--<div class="desc-content-item">-->
                <!--<span class="desc-content-item-title">POSTPONED:</span>-->
                <!--<span>&ndash;&gt; My love is like the grasses,Hidden in the deep mountains.Though its abundance increase,There is none that knows.</span>-->
              <!--</div>-->
              <!--<div class="desc-content-item">-->
                <!--<span class="desc-content-item-title">Is it free?:</span>-->
                <!--<span>Not free</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="delete">Delete</div>-->
      <!--</li>-->
      <!--<li class="item">-->
        <!--<div class="item-content">-->
          <!--<img src="" alt="" class="pic">-->
          <!--<div class="desc">-->
            <!--<div class="title">-->
              <!--<span class="name">[POSTPONED] HOT & Spicy Festival 2020</span>-->
              <!--<span class="star"><a-icon type="star" /></span>-->
            <!--</div>-->
            <!--<div class="time"></div>-->
            <!--<div class="desc-content">-->
              <!--<div class="desc-content-item">-->
                <!--<span class="desc-content-item-title">Where:</span>-->
                <!--<span class="desc-content-item-where">Galaxy Soho</span>-->
              <!--</div>-->
              <!--<div class="desc-content-item">-->
                <!--<span class="desc-content-item-title">POSTPONED:</span>-->
                <!--<span>&ndash;&gt; My love is like the grasses,Hidden in the deep mountains.Though its abundance increase,There is none that knows.</span>-->
              <!--</div>-->
              <!--<div class="desc-content-item">-->
                <!--<span class="desc-content-item-title">Is it free?:</span>-->
                <!--<span>Not free</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="delete">Delete</div>-->
      <!--</li>-->
    <!--</ul>-->
  </div>
</template>
<script>
import moment from 'moment';
export default {
  data () {
    return {
      data: [
        {
          actions: ['Reply to'],
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          datetime: moment().subtract(1, 'days'),
        },
        {
          actions: ['Reply to'],
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          datetime: moment().subtract(2, 'days'),
        },
      ],
      moment
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

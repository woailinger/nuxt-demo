<template>
  <div class="container">
    <div class="search">
      <span class="conent">
        <div class="desc">ASHA GO</div>
        <div class="desc">Your China Platform</div>
        <div class="desc remark">Life in China should be easy and exciting</div>
        <a-input-search placeholder="search" v-model="keyWord" @search="search" class="input-search" size="large"/>
      </span>
    </div>
    <client-only>
      <swiper
        ref="carousel"
        class="swiper pointer"
        :options="swiperOptions"
      >
        <swiper-slide v-for="(item, index) in bannerData" :key="'banner'+ index">
          <span @click="goDetail(item.blogId)">
            <img :src="item.cover" :alt="'banner'+index" >
          </span>
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
      </swiper>
     </client-only>
     <div class="city-container">
       <a-card hoverable :bordered="false" class="card-city" v-for="(item, index) in cityData" :key="'city'+ index" @click="search(item.name)">
         <img
          class="card-img"
          slot="cover"
          alt="example"
          :src="item.url"
        />
      </a-card>
     </div>
    <a-divider class="categoryTitle"> Recent Blog</a-divider>
    <client-only>
    <div class="article-list" :bordered="false" >
       <div
          v-infinite-scroll="handleInfiniteOnLoad"
          :infinite-scroll-disabled="busy"
          :infinite-scroll-distance="10">
          <a-card :bordered="false" class="card-container">
            <a-list
              size="large"
              :bordered="false">
              <a-list-item :key="i" v-for="(item, i) in recentData" @click="goDetail(item.blogId)">
                <div class="list-cover">
                  <img  shape="square" :src="item.cover" />
                </div>
                <!-- <a-list-item-meta>
                  <a slot="title"></a>
                </a-list-item-meta> -->

                <a class="categoryContent" href="#">
                  <a-list itemLayout="vertical">
                    <a-list-item>
                      <a-list-item-meta :title="item.title">
                        <!-- <div slot="description">
                          <a-tag :key="index + 's'" v-for="(it, index) in item.tags" >{{it}}</a-tag>
                        </div> -->
                      </a-list-item-meta>
                      <div class="content">
                        <!-- <div
                          class="detail"
                          max-width="9%;"
                        >{{item.content}}</div> -->
                        <div class="author">
                          <a-avatar
                            style="margin:10px;"
                            size="small"
                            :src="item.avatar"
                          />{{item.author}}
                          <em>{{item.date}}</em>
                          <span slot="actions">
                            <a-icon style="margin-right: 8px" type="heart-o" />
                            {{item.likes}}
                          </span>
                          <span slot="actions">
                            <a-icon style="margin-right: 8px" type="message" />
                            {{item.comment}}
                          </span>
                        </div>
                      </div>
                    </a-list-item>
                    <div v-if="loading && !busy" class="demo-loading-container">
                      <a-spin />
                    </div>
                  </a-list>
                </a>
              </a-list-item>
            </a-list>
          </a-card>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined;
const baseUrl = '../assets/img/bg';
export default {
  computed: {
  },
  layout: 'h5',
  asyncData(context) {
     if (!context.isMobile) {
       context.redirect('/')
     }
  },
  data() {
    return {
      baseUrl,
      keyWord: '',
      recentData: [],
      loading: false,
      busy: false,
      index: 0,

      swiperOptions: {
          loop: true,
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 10,
          effect: 'fade',
          autoplay: {
            delay: 2000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            clickable: true,
            renderBullet(index, className) {
              return `<span class="${className} swiper-pagination-bullet-custom">${index + 1}</span>`
            }
          },
        },
        bannerData: [],

        cityData: [
          {name: 'All China', url: 'https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/pic/citis/IMG_0207.PNG'},
          {name: 'Beijing', url: 'https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/pic/citis/IMG_0209.PNG'},
          {name: 'Shanghai', url: 'https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/pic/citis/IMG_0210.PNG'},
          {name: 'Shenzhen', url: 'https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/pic/citis/IMG_0208.PNG'},
          {name: 'Hong Kong', url: 'https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/pic/citis/IMG_0211.PNG'},
        ]
    }
  },
  mounted() {
    // 初始化fbjssdk
    window.fbAsyncInit = function() {
      FB.init({
        appId            : '2816565075139161',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v7.0'
      });
    };
    console.log('fbAsync----')
    window.fbAsyncInit();
    console.log('Current Swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  },
  created() {
    // let categoryList = ['daily', 'food', 'travel']
    // categoryList.forEach(item => {
    //   this.getData(item);
    // });
    this.getRecentData(0);
  },

  methods: {
    getImgUrl(i) {
      return `${baseUrl}abstract0${i + 1}.jpg`;
    },
    getRecentData(index) {
      this.$Server({
        methods: "GET",
        url: "/blog/get-recent-blog",
        query: {
          index: index || 0
        }
      }).then((res) => {
          if(res.code === '0'){
          this.recentData = this.recentData.concat(res.data.recentBlogs);
        }
      });
    },
    handleInfiniteOnLoad() {
      getRecentData(this.index + 1);
    },
    getRecommend() {
      this.$Server({
        method: "GET",
        url: "/recommend/list"
      }).then((res) => {
        if(res.code === '0'){
          this.bannerData = res.data.recommendList;
        }
      });
    },
    search(value) {
      this.$router.push({
        path: '/article/search',
        query: {
          keyWord: value
        }
      })
    },
    goDetail(blogId) {
      this.$router.push({
        path: '/blog/detail',
        query: {
          blogId: blogId
      }});
    },
    logout () {
      Cookie.remove('_t');
      this.$store.commit('setToken', null);
      this.$router.push('/login');
    },
    getData(category) {
      this.$Server({
        url: "/blog/get-blog-list",
        method: "post",
        data: {
          category: category,
          recommend: true
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
          this.categoryData[category+ 'Data'] = res.dataList || [];
        })
        .finally(() => {
          this.loadingFlag = false;
        });
    },
  }
}
</script>

<style scoped lang="less">
.container {
  margin: 0 auto;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  .search {
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    height: 33rem;
    text-align: center;
    color: #fff;
    background: url("../../assets/img/search.jpg");
    background-size: cover;
    .conent {
      display: inline-block;
      margin: 6rem 0;
      .input-search {
        width: 80%;
      }
    }
    .desc {
      display: block;
      font-size: 2.8rem;
      font-weight: 10;
      margin-bottom: 1rem ;
    }
    .remark {
      font-size: 1.2rem;
    }
  }
  .more {
    font-size: 1.6rem;
  }
  .ant-divider-inner-text {
    margin: 26px 0px;
  }
  .city-container {
    display: flex;
    margin-top: 1.3rem;
    margin-bottom: 25px;
    justify-content: space-around;
    flex-wrap: wrap;
    .card-img  {
      width: 10rem;
      height: 10rem;
    }
  }
  .card-container {
      min-width: 16rem;
      .list-cover {
        img {
          width: 28rem;
          margin: -10px 0;
        }
      }
      .ant-list-split {
        .ant-list-item {
          border-bottom: none;
          justify-content: center;
        }
      }
  }
  .category {
    position: relative;
    .categoryTitle {
      margin-bottom: 28px;
      font-size: 22px;
      cursor: pointer;
      a {
        color: #000;
      }
    }
    .more {
        position:absolute;
        bottom: 10px;
        right: 40px;
    }
    .card-container {
      padding: 1rem;
      min-width: 160px;
      margin-left: 1.2rem;
      display: flex;
      justify-content: space-around;
      .ant-list-split {
        .ant-list-item {
          border-bottom: none;
        }
      }
      .ant-list-item-meta-title {
        font-size: 1.5rem;
      }
      .ant-card {
          border-radius: 15px;
      }
      .card {
        margin-bottom: 50px;
        width: 360px;
        .card-img {
          width: 358px;
          height: 238px;
        }
        .ant-card-cover img {
          border-radius: 15px 15px 0 0;
        }
      }
      .ant-list-split {
        .ant-list-item {
          border-bottom: none;
        }
      }
    }
  }


  .ant-carousel  .slick-dots {
    height: auto;
  }
  .ant-carousel  .slick-slide {
    text-align: center;
    height: 160px;
    line-height: 160px;
    background: #364d79;
    img {
      border: 5px solid #fff;
      display: block;
      margin: auto;
      max-width: 80%;
    }
  }

  .ant-carousel  .slick-thumb {
    bottom: -45px;
  }
  .ant-carousel  .slick-thumb li {
    width: 60px;
    height: 45px;
  }
  .ant-carousel  .slick-thumb li img {
    width: 100%;
    height: 100%;
    filter: grayscale(100%);
  }
  .ant-carousel  .slick-thumb li.slick-active img {
    filter: grayscale(0%);
  }
  .swiper {
    width: 100%;
    // height: 400px;
    .swiper-slide {
      text-align: center;
      font-size: 38px;
      font-weight: 700;
      background-color: #eee;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: 100%;
      }
      .text {
        // -webkit-text-stroke: 1px #502626;
        text-shadow: 2px 2px #423a3a;
        // text-stroke: 1px #502626;
        position: absolute;
        top: 80%;
        color: white;
        font-size: 27px;
        width: 40%;
        left: 5%;
        line-height: 20px;
        text-align: left;
      }
    }
    .swiper-pagination {
      > .swiper-pagination-bullet {
        background-color: red;
      }
    }
  }
}
</style>

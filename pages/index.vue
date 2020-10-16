<template>
  <div class="container">
    <client-only>
      <swiper
        ref="carousel"
        class="swiper pointer"
        :options="swiperOptions"
        @ready="onSwiperRedied"
        @clickSlide="onSwiperClickSlide"
        @slideChangeTransitionStart="onSwiperSlideChangeTransitionStart"
      >
        <swiper-slide v-for="(item, index) in bannerData" :key="'banner'+ index">
          <span @click="goDetail(item.blogId)">
            <img :src="item.cover" :alt="'banner'+index" >
            <div class="text">
              <p>{{item.recommendTitle}}</p>
            </div>
          </span>
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      </swiper>
     </client-only>
     <div class="city-container">
       <a-card hoverable :bordered="false" class="card-city" v-for="(item, index) in cityData" :key="'city'+ index" @click="search(item.name, 'city')">
         <img
          class="card-img"
          slot="cover"
          alt="example"
          :src="item.url"
        />
      </a-card>
     </div>
      <div class="category" v-for="(item, index) in categoryData" :key="'categoryData' + index">
        <a-divider class="categoryTitle">
          <nuxt-link :to="'/category/' + categoryDesc[index].text+ '?category='+ categoryDesc[index].text" >
            {{categoryDesc[index].title}}
          </nuxt-link>
        </a-divider>
        <nuxt-link :to="'/category/' + categoryDesc[index].text+ '?category='+ categoryDesc[index].text" class="more">MORE&nbsp;&nbsp;<a-icon type="double-right" /></nuxt-link>
        <p class="card-container" v-for="i in Math.ceil(item.length/3)" :key="i">
          <a-card hoverable
                  class="card"
                  v-for="j in 3"
                  :key="'lastest'+ i + j"
                  @click="goDetail(item[(i-1)*3 + j -1].blogId)">
            <template v-if="((i-1)*3 + j -1) < item.length">
              <img
                class="card-img"
                slot="cover"
                alt="example"
                :src="item[(i-1)*3 + j - 1].img"
              />
              <a-card-meta :title="item[(i-1)*3 + j -1].title"></a-card-meta>
            </template>
          </a-card>
        </p>
      </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined;
const baseUrl = '../assets/img/bg';
export default {
  computed: {
  },
  asyncData(context) {
     if (context.isMobile) {
       context.redirect('/h5/')
     }
  },
  data() {
    return {
      baseUrl,
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
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        bannerData: [],
        categoryData: {
          dailyData: [],
          foodData: [],
          travelData: [],
        },
        categoryDesc: {
          dailyData: {
            text: 'daily',
            title: 'Daily Life'
          },
          foodData: {
            text: 'food',
            title: 'Food & Drinks'
          },
          travelData: {
            text: 'travel',
            title: 'Travel'
          }
        },
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
    let categoryList = ['daily', 'food', 'travel']
    categoryList.forEach(item => {
      this.getData(item);
    });
    this.getRecommend();
  },



  methods: {
    getImgUrl(i) {
      return `${baseUrl}abstract0${i + 1}.jpg`;
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
    search(value, type) {
      let query = {};
      if (type == 'city') {
          query = {
            city : value
          }
      } else {
        query = {
          keyWord: value
        }
      }
      this.$router.push({
        path: '/article/search',
        query: query
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
    onSwiperRedied(swiper) {
        console.log('Swiper redied!', swiper)
    },
    onSwiperSlideChangeTransitionStart() {
      console.log('SwiperSlideChangeTransitionStart!')
    },
    onSwiperClickSlide(index, reallyIndex) {
      console.log('Swiper click slide!', reallyIndex)
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
    .card-img  {
      width: 150px;
      height: 150px;
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
      display: flex;
      justify-content: space-around;
      padding: 0px 60px;
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
        width: 50%;
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

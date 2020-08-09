<template>
  <div class="container">
        <!-- <img src="../assets/img/bg1.jpg" alt="banner"> -->
    <client-only>
      <swiper
        ref="carousel"
        class="swiper"
        :options="swiperOptions"
        @ready="onSwiperRedied"
        @clickSlide="onSwiperClickSlide"
        @slideChangeTransitionStart="onSwiperSlideChangeTransitionStart"
      >
        <swiper-slide v-for="(item, index) in bannerData" :key="'banner'+ index">
          <img :src="item.url" :alt="'banner'+index">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
     </client-only>
     <div class="city-container">
       <!-- <a-card hoverable class="card-city" v-for="(item, index) in cityData" :key="'city'+ index"> -->
       <a-card hoverable class="card-city" :bordered="false">
        <img
          class="card-img"
          slot="cover"
          alt="example"
          src="../assets/img/china.jpg"
        />
      </a-card>
       <a-card hoverable class="card-city" :bordered="false">
        <img
          class="card-img"
          slot="cover"
          alt="example"
          src="../assets/img/bj.jpg"
        />
      </a-card>
       <a-card hoverable class="card-city" :bordered="false">
        <img
          class="card-img"
          slot="cover"
          alt="example"
          src="../assets/img/sh.jpg"
        />
      </a-card>
       <a-card hoverable class="card-city" :bordered="false">
        <img
          class="card-img"
          slot="cover"
          alt="example"
          src="../assets/img/sz.jpg"
        />
      </a-card>
       <a-card hoverable class="card-city" :bordered="false">
        <img
          class="card-img"
          slot="cover"
          alt="example"
          src="../assets/img/hk.jpg"
        />
      </a-card>
     </div>
    <a-divider>Daily life</a-divider>
     <p class="card-container">
       <a-card hoverable class="card" v-for="(item, index) in latestData" :key="'lastest'+ index">
        <img
          class="card-img"
          slot="cover"
          alt="example"
          :src="item.url"
        />
        <a-card-meta :title="item.title">
        </a-card-meta>
      </a-card>
     </p>
     <a-divider>Food & Drinks</a-divider>
     <p class="card-container">
       <a-card hoverable class="card" v-for="(item, index) in FoodData" :key="'lastest'+ index">
        <img
          class="card-img"
          slot="cover"
          alt="example"
          :src="item.url"
        />
        <a-card-meta :title="item.title">
        </a-card-meta>
      </a-card>
     </p>
     <a-divider>Travel</a-divider>
     <p class="card-container">
       <a-card hoverable class="card" v-for="(item, index) in travelData" :key="'lastest'+ index">
        <img
          class="card-img"
          slot="cover"
          alt="example"
          :src="item.url"
        />
        <a-card-meta :title="item.title">
        </a-card-meta>
      </a-card>
     </p>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined;
const baseUrl = '../assets/img/bg';
export default {
  computed: {
  },
  data() {
    return {
      baseUrl,
      swiperOptions: {
          loop: true,
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 30,
          effect: 'fade',
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
        bannerData: [
          {url: 'https://ashago.oss-cn-zhangjiakou.aliyuncs.com/pic/Asha%20Go%20China%20%E7%BD%91%E7%AB%99/%E9%A6%96%E9%A1%B5%C2%B7%E6%8E%A8%E8%8D%90%E6%96%87%E7%AB%A0%E5%9B%BE%E7%89%87/Why%20you%20should%20travel%20solo%20in%20China%3F.jpg?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=1001596680668&Signature=hPF7JwcXJKQMKCNIrA7dQlc4EjA%3D'},
          {url: 'https://ashago.oss-cn-zhangjiakou.aliyuncs.com/pic/Asha%20Go%20China%20%E7%BD%91%E7%AB%99/%E9%A6%96%E9%A1%B5%C2%B7%E6%8E%A8%E8%8D%90%E6%96%87%E7%AB%A0%E5%9B%BE%E7%89%87/Growing%20up%20as%20a%20woman%20in%20China.jpg?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=10001596680748&Signature=DlzO1xezIyFbfGSr%2ByXZZA5r2T8%3D'},
          {url: 'https://ashago.oss-cn-zhangjiakou.aliyuncs.com/pic/Asha%20Go%20China%20%E7%BD%91%E7%AB%99/%E9%A6%96%E9%A1%B5%C2%B7%E6%8E%A8%E8%8D%90%E6%96%87%E7%AB%A0%E5%9B%BE%E7%89%87/Is%20China%20a%20safe%20country%20for%20travellers%3F.jpg?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=1001596680589&Signature=WgIwceOyTF72KoylS3cc51Lofmc%3D'},
          {url: 'https://ashago.oss-cn-zhangjiakou.aliyuncs.com/pic/Asha%20Go%20China%20%E7%BD%91%E7%AB%99/%E9%A6%96%E9%A1%B5%C2%B7%E6%8E%A8%E8%8D%90%E6%96%87%E7%AB%A0%E5%9B%BE%E7%89%87/Movies%20to%20improve%20your%20Chinese.jpg?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=1001596680861&Signature=8n3YpM9IZV3PxWU9mP5aFQ7YnuM%3D'},
          {url: 'https://ashago.oss-cn-zhangjiakou.aliyuncs.com/pic/Asha%20Go%20China%20%E7%BD%91%E7%AB%99/%E9%A6%96%E9%A1%B5%C2%B7%E6%8E%A8%E8%8D%90%E6%96%87%E7%AB%A0%E5%9B%BE%E7%89%87/The%20most%20famous%20Chinese%20curse%20words.jpg?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=10001596680801&Signature=0BeqluMlivFZDO5qLhnzej%2F63No%3D'}
        ],
        latestData: [
          {
            title: 'How to get a taxi in China',
            url: 'https://ashago.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20China%20website%202020/Daily%20Life/How%20to%20get%20a%20taxi%20in%20China/%E5%B0%81%E9%9D%A2%E5%9B%BE%E7%89%87.jpg?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=1001596705905&Signature=EcIU64C6E%2BgsGPYSkA%2F25BYtc2w%3D'
          },
          {
            title: 'Where to watch movies and TV shows',
            url: 'https://ashago.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20China%20website%202020/Daily%20Life/Where%20to%20watch%20movies%20and%20TV%20shows/%E5%B0%81%E9%9D%A2%E5%9B%BE%E7%89%87.jpg?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=1001596706248&Signature=2Ros7G5w4Vcx39cj5ikWpypM9GU%3D'
          },
          {
            title: 'Where to live in Beijing: an introduction to Beijing’s many districts',
            url: 'https://ashago.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20China%20website%202020/Daily%20Life/Where%20to%20live%20in%20Beijing%3A%20an%20introduction%20to%20Beijing%E2%80%99s%20many%20districts/%E5%B0%81%E9%9D%A2%E5%9B%BE%E7%89%87.JPG?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=100001596704295&Signature=dOceRxzvRpAYbxNtCk32SessHWM%3D'
          },
          {
            title: 'How to use Alipay',
            url: 'https://ashago.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20China%20website%202020/Daily%20Life/How%20to%20use%20Alipay/%E5%B0%81%E9%9D%A2%E5%9B%BE%E7%89%87%E7%A4%BA%E4%BE%8B.jpg?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=1001596707604&Signature=gDRDuq9wVup2drqJQDzvzQQ4Sp0%3D'
          },
          {
            title: ' How to use Wechat',
            url: 'https://ashago.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20China%20website%202020/Daily%20Life/How%20to%20use%20Wechat/%E5%9B%BE%E7%89%87%E7%A4%BA%E4%BE%8B.jpg?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=1001596708293&Signature=9npI%2FURfxVV%2FV0PpWWtd86SMZhc%3D'
          },
          {
            title: 'How to order from JD',
            url: 'https://ashago.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20China%20website%202020/Daily%20Life/How%20to%20order%20from%20JD/%E5%B0%81%E9%9D%A2%E5%9B%BE%E7%89%87%E7%A4%BA%E4%BE%8B.jpg?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=1001596707090&Signature=0BHAYzIUAPO7%2BJw615MtKVuAvBk%3D'
          },
        ],
        FoodData: [
          {
            title: 'An introduction to Chinese alcohol',
            url: 'https://ashago.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20China%20website%202020/Food%26Drinks/An%20introduction%20to%20Chinese%20alcohol/%E5%B0%81%E9%9D%A2%E5%9B%BE%E7%89%87.jpg?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=10001596703048&Signature=gBFrTL4RkY2XhsAIQSUQ30%2B%2FShs%3D'
          },
          {
            title: 'What is the spiciest food in China?',
            url: 'https://ashago.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20China%20website%202020/Food%26Drinks/What%20to%20Order%20in%20a%20Traditional%20Beijing%20Mutton%20Hotpot%20Restaurant%3F/%E5%B0%81%E9%9D%A2%E5%9B%BE%E7%89%87.jpg?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=1001596703145&Signature=BseZuqJffIeSVdBERZx6hwlVuMk%3D'
          },
          {
            title: 'What to Order in a Traditional Beijing Mutton Hotpot Restaurant?',
            url: 'https://ashago.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20China%20website%202020/Food%26Drinks/What%20to%20order%20in%20a%20Chaoshan%20(Guangdong)%20Beef%20Hotpot%20restaurant%3F/%E5%B0%81%E9%9D%A2%E5%9B%BE%E7%89%87.jpg?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=10001596703532&Signature=lPq0nIJzCWnlQj5o3Jjx9JowlfQ%3D'
          },
          {
            title: 'What to order in a Cantonese Beef Hotpot restaurant?',
            url: 'https://ashago.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20China%20website%202020/Food%26Drinks/The%20most%20exotic%20fruit%20in%20China/%E5%B0%81%E9%9D%A2%E5%9B%BE%E7%89%87.jpg?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=100001596705279&Signature=UHVnzpuPAsVTpXT%2Fc8K4o5iNGE0%3D'
          },
          {
            title: 'The most exotic fruit in China',
            url: 'https://ashago.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20China%20website%202020/Food%26Drinks/The%20most%20exotic%20fruit%20in%20China/%E5%B0%81%E9%9D%A2%E5%9B%BE%E7%89%87.jpg?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=100001596705279&Signature=UHVnzpuPAsVTpXT%2Fc8K4o5iNGE0%3D'
          },
          {
            title: 'The most famous Chinese tea',
            url: 'https://ashago.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20China%20website%202020/Food%26Drinks/The%20most%20famous%20Chinese%20tea/%E9%A6%96%E9%A1%B5%E5%B0%81%E9%9D%A2%E5%9B%BE%E7%89%87.jpg?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=1001596708617&Signature=v0f%2BqrXbk%2BuRURvYNs8muA%2BeRuA%3D'
          },
        ],
        travelData: [
          {
            title: 'Weekend getaways from Shanghai',
            url: 'https://ashago.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20China%20website%202020/Travel/Weekend%20getaways%20from%20Shanghai/%E5%B0%81%E9%9D%A2%E5%9B%BE%E7%89%87.jpg?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=1001596702894&Signature=aaIpQ6VfkCp%2FmdwFf7h8u0Kv1Js%3D'
          },
          {
            title: 'Beijing best weekend getaways',
            url: 'https://ashago.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20China%20website%202020/Travel/Beijing%20best%20weekend%20getaways/%E5%B0%81%E9%9D%A2%E5%9B%BE%E7%89%87.jpg?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=1001596705048&Signature=ZVwl5tij8UaZj4PUVBSgtOjLoy4%3D'
          },
          {
            title: 'Best HK staycations',
            url: 'https://ashago.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20China%20website%202020/Travel/Best%20HK%20staycations/Best%20HK%20staycations.jpg?OSSAccessKeyId=LTAI4FcWHUa9TfvGA9oMY3fE&Expires=10001596702782&Signature=cdYJ3igLmiBjt1m1Wb0M5y%2BLkTQ%3D'
          },
        ],
        cityData: [
          {name: 'china', url: '../assets/img/china.jpg'},
          {name: 'beijing', url: '../assets/img/bj.jpg'},
          {name: 'shanghai', url: '../assets/img/sh.jpg'},
          {name: 'shenzhen', url: '../assets/img/sz.jpg'},
          {name: 'hongkong', url: '../assets/img/hk.jpg'},
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
 
 
  
  methods: {
    getImgUrl(i) {
      return `${baseUrl}abstract0${i + 1}.jpg`;
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
    }
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
  .city-container {
    display: flex;
    margin-top: 10px ;
    .card-city {
      margin-left: 80px;
    }
    .card-img  {
      width: 150px;
      height: 150px;
    }
  }
  .card-container {
    display: flex;
    flex-wrap: wrap;
    .card {
      margin-left: 50px;
      margin-bottom: 20px;
      width: 350px;
    }
    .card-img  {
      width: 350px;
      height: 200px;
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
    height: 300px;
    width: 100%;
    .swiper-slide {
      text-align: center;
      font-size: 38px;
      font-weight: 700;
      background-color: #eee;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .swiper-pagination {
      > .swiper-pagination-bullet {
        background-color: red;
      }
    }
  }
}
</style>

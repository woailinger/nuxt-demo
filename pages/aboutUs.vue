<template>
  <div class="container">
    <div class="story">
      <div class="title">What is Asha Go?</div>
        <p>Asha Go is an online peer-to-peer marketplace for services in China. We have three aims:</p>
        <p>1) To make life in China easier for you. We do this by providing our customers with access to reliable, competent and high-quality service providers in China. We make the service market transparent and accessible with fixed prices.</p>
        <p>2) To create opportunity for local people. We aim to empower locals and connect them with an international market. We help service providers by providing consultancy and advice on how to create or improve services.</p>
        <p>3) To improve relations between China and the world. We aim to provide accurate, up to date and unbiased information on living, working and traveling in China.</p>
      </div>
    <div class="story">
        <div class="title">Our story</div>
        <p>Asha GO was founded in 2020 on the premise that living in China should be easy and exciting. Based in Shanghai, the aim of the Asha Go platform is to make the market of local service providers in China both transparent and accessible to expats.</p>
        <p>Whether you’re looking for a driver, cleaner or childcare services, or looking to open a bank account in China, we aim to help you be independent and confident in establishing your new life in China. We also aim to promote a better understanding between the East and West through up to date and unbiased information. </p>
    </div>
    <div class="person">
        <div class="person-card" v-for="(item, index) in personData" :key="index">
           <img :src="item.img" alt=""  class="image"/>
           <div class="content">
              <span class="name">{{item.name}}</span>
              <span class="title"> {{item.title}}</span>
              <div class="desc">{{item.desc}}</div>
           </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
   data() {
     return {
        personData: [
          {img: 'https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20Website%201.0/About%20Us%20page/images%20on%20website/Zixuan_meitu.jpg', name: 'ZIXUAN (CHLOE) WANG', title: 'Co-founder', desc: 'Zixuan Wang worked at the United Nations in Beijing for three years before pairing up with Jemma to launch Asha Go. She holds two masters degrees: one from the University of Oxford and the other from the London School of Economics.', },
          {img: 'https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20Website%201.0/About%20Us%20page/images%20on%20website/Jemma%E7%9A%84%E5%89%AF%E6%9C%AC_meitu.jpg', name: 'JEMMA ZOE ROGERS', title: 'Co-founder', desc: 'Jemma has a master in Chinese from the University of Oxford and a masters in International Law from the China University of Political Science and Law. She is fluent in English and Mandarin. She is also learning Spanish and Russian.', },
          {img: 'https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20Website%201.0/About%20Us%20page/images%20on%20website/%E5%8D%8E%E9%93%AE%E7%9A%84%E5%89%AF%E6%9C%AC_meitu.jpg', name: 'HUA ZHENG', title: 'Co-founder', desc: 'Huazheng is Asha Gos technical director. He is in charge of maintaining the technical side of the Asha Go website, app and mini-app.', },
          {img: 'https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/Asha%20Go%20Website%201.0/About%20Us%20page/images%20on%20website/%E9%99%86huanhuan%E7%9A%84%E5%89%AF%E6%9C%AC_meitu.jpg', name: 'HUANHUAN', title: 'Co-founder', desc: 'Huanhuan is responsible for all things creative at Asha Go. She is a talented artist who studied art and design at Zhejiang University. She also has a masters degree in international fashion and marketing from Coventry University.' },
        ]
     }
   },
}
</script>
<style lang="less" scoped>
  .container {
    color: #8d040c;
    .story {
      margin: 0 auto;
      width: 60%;
      .title {
       font-size: 20px;
       margin-top: 50px ;
      }
      font-size: 16px;
      line-height: 30px;
      text-align: center;
      p {
        margin-top: 25px;
      }
    }
    .person{
      padding: 100px;
      width: 80%;
      margin: 0 auto;
      .person-card {
        vertical-align: top;
        margin-bottom: 100px;
        margin-left: 20px;
        height: 400px;
         display: inline-block;
        .image {
          display: inline-block;
          height: 400px;
        }
        .content {
          display: inline-block;
          width: 280px;
          height: 400px;
          margin-left: 20px;
          .name {
            font-size: 22px;
            font-weight: 400;
            line-height: 60px;
            color: #ccc;
          }
          .title {
            display: block;
            font-size: 20px;
            line-height: 60px;
            text-align: left;
          }
          .desc {
            font-size: 16px;
            line-height: 30px;

          }
        }
      }
    }
  }
</style>

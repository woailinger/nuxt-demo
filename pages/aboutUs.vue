<template>
  <div class="container">
    <div class="story">
        <div class="title">Our story</div>
        <p>Asha GO was founded in 2020 on the premise that living in China should be easy and exciting. Based in Shanghai, the aim of the Asha Go platform is to make the market of local service providers in China both transparent and accessible to expats.</p>
        <p>Whether you’re looking for a driver, cleaner or childcare services, or looking to open a bank account in China, we aim to help you be independent and confident in establishing your new life in China. We also aim to promote a better understanding between the East and West through up to date and unbiased information. </p>
    </div>
      <!-- <a-col :span="16">
        <div><h1>Our service</h1></div>
        <p>Asha Go is an information site on all things regarding living, working and studying in China.....</p>
      </a-col> -->
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
          {img: 'https://static.wixstatic.com/media/12e1b7_ad1f236072464e7e80d5e7ec3d215d22~mv2.jpg/v1/fill/w_560,h_1080,fp_0.37_0.29,q_85,usm_0.66_1.00_0.01/12e1b7_ad1f236072464e7e80d5e7ec3d215d22~mv2.webp', name: 'ZIXUAN (CHLOE) WANG', title: 'Co-founder', desc: 'Zixuan Wang worked at the United Nations in Beijing for three years before pairing up with Jemma to launch Asha Go. She holds two masters degrees: one from the University of Oxford and the other from the London School of Economics.', },
          {img: 'https://static.wixstatic.com/media/12e1b7_ad1f236072464e7e80d5e7ec3d215d22~mv2.jpg/v1/fill/w_560,h_1080,fp_0.37_0.29,q_85,usm_0.66_1.00_0.01/12e1b7_ad1f236072464e7e80d5e7ec3d215d22~mv2.webp', name: 'ZIXUAN (CHLOE) WANG', title: 'Co-founder', desc: 'Zixuan Wang worked at the United Nations in Beijing for three years before pairing up with Jemma to launch Asha Go. She holds two masters degrees: one from the University of Oxford and the other from the London School of Economics.', },
          {img: 'https://static.wixstatic.com/media/12e1b7_ad1f236072464e7e80d5e7ec3d215d22~mv2.jpg/v1/fill/w_560,h_1080,fp_0.37_0.29,q_85,usm_0.66_1.00_0.01/12e1b7_ad1f236072464e7e80d5e7ec3d215d22~mv2.webp', name: 'ZIXUAN (CHLOE) WANG', title: 'Co-founder', desc: 'Zixuan Wang worked at the United Nations in Beijing for three years before pairing up with Jemma to launch Asha Go. She holds two masters degrees: one from the University of Oxford and the other from the London School of Economics.', },
          {img: 'https://static.wixstatic.com/media/12e1b7_ad1f236072464e7e80d5e7ec3d215d22~mv2.jpg/v1/fill/w_560,h_1080,fp_0.37_0.29,q_85,usm_0.66_1.00_0.01/12e1b7_ad1f236072464e7e80d5e7ec3d215d22~mv2.webp', name: 'ZIXUAN (CHLOE) WANG', title: 'Co-founder', desc: 'Zixuan Wang worked at the United Nations in Beijing for three years before pairing up with Jemma to launch Asha Go. She holds two masters degrees: one from the University of Oxford and the other from the London School of Economics.', },
        ]
     }
   },
}
</script>
<style lang="less" scoped>
  .container {
    .person{
      padding: 100px;
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
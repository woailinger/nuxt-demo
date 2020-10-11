<template>
  <div id="community">
    <a-row>
      <a-col :span="24">
        <div style="height:60px"></div>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="6" />
      <a-col :span="14">
        <div style="height:60px">
          <h1
            style="text-align:left;color:#990000;font-size:40px;line-height:30px;font-family:Arial;"
          >Welcome to join Asha Go community!</h1>
        </div>
      </a-col>
      <a-col :span="4" />
    </a-row>

    <a-row>
      <a-col :span="6" />
      <a-col :span="14">
        <div style="height:20px"></div>
        <p
          style="text-align:left;color:#990000;font-size:16px;line-height:30px;font-family:Arial;"
        >One of the biggest challenging parts of living in a foreign country is loneliness and lack of a sense of belonging.</p>
        <p
          style="text-align:left;color:#990000;font-size:16px;line-height:30px;font-family:Arial;"
        >You are not alone! Here you can join our online peer supporting groups and attend our social activities.</p>
        <p
          style="text-align:left;color:#990000;font-size:16px;line-height:30px;font-family:Arial;"
        >As always, our aim is to make your life in China easy and exciting!</p>
      </a-col>
      <a-col :span="4" />
    </a-row>

<a-row>
      <a-col :span="24">
        <div style="height:60px"></div>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="8" />      
      <a-col :span="7">
        <p style="text-align:left;color:#990000;font-size:16px;line-height:30px;font-family:Arial;">
          Asha Go expats supporting and social group
          (scan QR code with Wechat)
        </p>
        <div
          style="width:100%;height:480px;background:url(https://ashago-resource.oss-cn-zhangjiakou.aliyuncs.com/pic/community/asha.jpg)"
        ></div>
      </a-col>
      <a-col :span="11" />
    </a-row>
    <a-row>
      <a-col :span="24">
        <div style="height:60px"></div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  layout(context) {
        return context.isMobile ? 'h5' : 'default';
  },
}
</script>
<style>
#community {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #990000;
  margin-top: 10px;
  line-height: 15px;
  font-size: 15px;
}
</style>
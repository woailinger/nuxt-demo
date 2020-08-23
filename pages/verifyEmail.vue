<template>
  <div>
    <div class="modal-mask"></div>
    <div class="modal-wrap">
      <div class="modal">
        <div style="overflow: hidden;"></div>
        <div class="content">
          <a-result
            status="success"
            title="Verify Email!"
            sub-title="Verification Successful"
          >
            <template #extra>
              <a-button key="console" type="primary" block>
                <nuxt-link to="/">
                  Ok
                </nuxt-link>
              </a-button>
            </template>
          </a-result>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Utils from '@/tools/Utils.js';
  export default {
  layout: 'blank',
  middleware: 'notTokenenticated',
  async asyncData ({ req, $Server, redirect }) {
    await $Server({
      url: '/api/sendCode',
      method: 'post',
      data: {
        userName: Utils.Server_URL_Request(req, 'userName') || ''
      }
    }).then(res => {
      if (res.code == 0) {
        // 重定向到登录页面
       redirect('/login');
      }
    })
  }
}
</script>
<style lang="less">
.modal-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  background-color: rgba(0,0,0,.45);
}
  .modal-wrap {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    overflow: auto;
    outline: 0;
    .modal {
      width: 420px;
      transform-origin: -272px 460px;
      background: #fff;
      box-sizing: border-box;
      color: rgba(0,0,0,.65);
      font-size: 14px;
      font-variant: tabular-nums;
      /*line-height: 1.5;*/
      list-style: none;
      font-feature-settings: "tnum";
      position: relative;
      top: 100px;
      /*width: auto;*/
      margin: 0 auto;
      pointer-events: none;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0,0,0,.15);
      .content {
        position: relative;
        background-color: #fff;
        background-clip: padding-box;
        border: 0;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,.15);
        pointer-events: auto;
      }
    }
  }
</style>

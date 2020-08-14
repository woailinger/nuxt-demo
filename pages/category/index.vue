<template>
  <div>
    <div class="container">
      <div style="margin-bottom:30px">
      <a-row :gutter="16">
        <a-row type="flex" justify="space-around" align="middle">
          <a-col :span="12" justify="center">
            <h1 class="title wow fadeInLeft" data-wow-delay=".5s">DAILY LIFE</h1>
            <h5>Articles about daily life</h5>
            <p>Articles about daily life.Such as aaaaaaaaaaaaaaaaaaaaaaaaaabalsdhasdhasjkdasdgasdjhas</p>
          </a-col>
          <a-col :span="12" justify="center">
            <img src="assets/img/banner/1.jpg" alt="images" style="width: 500px; height:500px" />
          </a-col>
        </a-row>
      </a-row>
      </div>
      <client-only>
        <div class="articlelist" :bordered="false" :body-style="{padding: '24px',margin: '15%'}">
          <a-card :bordered="false" :body-style="{padding: '24px',margin: '0px 15%'}">
            <a-list
              size="large"
              :bordered="false"
              :pagination="{showQuickJumper: true, pageSize: 5, total: 20}"
            >
              <a-list-item :key="i" v-for="i in 5">
                <div class="listcover">
                  <img style="height: 200px; margin: -10px 0" shape="square" src="assets/img/blog-details/1.jpg" />
                </div>
                <a-list-item-meta>
                  <a slot="title"></a>
                </a-list-item-meta>

                <a class="categoryContent" href="#">
                  <a-list itemLayout="vertical">
                    <a-list-item>
                      <a-list-item-meta title="City Guide: Beijing">
                        <div slot="description">
                          <a-tag>traveltips</a-tag>
                          <a-tag>food</a-tag>
                        </div>
                      </a-list-item-meta>
                      <div class="content">
                        <div
                          class="detail"
                          max-width="9%;"
                          style="word-break:break-all;"
                        >This is your blog post. To really engage your site visitors we suggest you blog about subjects that are related to your site or business. Blogging is really great for SEO, so we recommend including keywords that relate to your...</div>
                        <div class="author">
                          <a-avatar
                            style="margin:10px;"
                            size="small"
                            src="assets/img/blog-details/avatar-2.jpg"
                          />Jem Admin
                          <a-divider type="vertical" />1 min read
                          <a-divider type="vertical" />
                          <em>2018-08-05 22:23</em>
                        </div>
                      </div>
                      <span slot="actions">
                        <a-icon style="margin-right: 8px" type="heart-o" />156
                      </span>
                      <span slot="actions">
                        <a-icon style="margin-right: 8px" type="message" />4
                      </span>
                    </a-list-item>
                  </a-list>
                </a>
              </a-list-item>
            </a-list>
          </a-card>
        </div>
      </client-only>
      <div class="articlelist">
        <a-card style="margin: 25% margin-top:0" :body-style="{padding: '24px',margin: '15%'}"></a-card>
      </div>
    </div>
  </div>
</template>
 <style scoped lang="less">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  padding: 150px 0px;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
.listcover {
  padding-right: 30px;
}
.extra{
    width: 272px;
    height: 1px;
}
.content {
  margin-top: 0px;
}
</style>

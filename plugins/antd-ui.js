import Vue from 'vue';
// import Antd from 'ant-design-vue/lib'
import Button from 'ant-design-vue/lib/button';
import Form from 'ant-design-vue/lib/form';
import Input from 'ant-design-vue/lib/input';
import Icon from 'ant-design-vue/lib/icon';
import Message from 'ant-design-vue/lib/message';
// import 'ant-design-vue/lib/button/style/css';
Vue.use(Button);
Vue.use(Form);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Message);
Vue.prototype.$message = Message;

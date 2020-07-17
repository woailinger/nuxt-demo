import Vue from 'vue';
// import Antd from 'ant-design-vue/lib'
import Button from 'ant-design-vue/lib/button';
import Form from 'ant-design-vue/lib/form';
import Input from 'ant-design-vue/lib/input';
import Icon from 'ant-design-vue/lib/icon';
import Message from 'ant-design-vue/lib/message';
import Checkbox from 'ant-design-vue/lib/checkbox';
import Layout from 'ant-design-vue/lib/Layout';

// import 'ant-design-vue/lib/button/style/css';
Vue.use(Button);
Vue.use(Form);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Message);
Vue.use(Checkbox);
Vue.use(Layout);
Vue.prototype.$message = Message;

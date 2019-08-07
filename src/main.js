import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios'


Vue.prototype.axios = axios;
Vue.config.productionTip = false;


Vue.filter('setWH', (url, args) => {
    return url.replace(/w\.h/, args)
});


import Scroller from './components/scroller'

Vue.component('Scroller', Scroller);

Vue.config.productionTip = false;

//引入element-ui模块
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

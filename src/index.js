import TlBanner from './Banner.vue'


// 如果vue是全局变量,使用自动全局安装。
if (typeof window !== 'undefined' && window.Vue) {
    Vue.component(TlBanner.name, TlBanner)
}

TlBanner.install = Vue => Vue.component(TlBanner.name, TlBanner);//注册组件
export default TlBanner
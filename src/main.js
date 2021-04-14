import Vue from 'vue';
import App from './App.vue';
import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';
import router from "./router";
import "./assets/iconfont.css"
import store from "./store";
NutUI.install(Vue);

Vue.mixin({
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$nextTick(() => {
                if (vm.pullingUp && vm.pullingDown) {
                    vm.$root.bs.on('pullingUp', () => {
                        vm.pullingUp()
                        vm.$root.bs.finishPullUp()
                    })
                    vm.$root.bs.on('pullingDown', () => {
                        vm.pullingDown()
                        vm.$root.bs.finishPullDown()
                    })
                }

            })
        })
    },
    updated () {
        if(this.$root.bs){
            this.$nextTick(() => {
                this.$root.bs.refresh();
            })
        }
    },
    beforeRouteLeave (to, from, next) {
        this.$root.bs.off('pullingUp')
        this.$root.bs.off('pullingDown')
        next()
    },
    methods: {
        onImgLoad () {
            this.$nextTick(() => {
                this.$root.bs.refresh();
            })
        },
    }
})
Vue.config.productionTip = false;

export default new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

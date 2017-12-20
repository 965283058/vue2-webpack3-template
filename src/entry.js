// import Vue from 'vue'
// import App from './App'
// import Cell from 'vt-cell'
// import http from 'vue-http'
// import router from './router'
// import picker from 'vt-picker'
// import datetimePicker from 'vt-datetime-picker'
// import Tree from 'vt-tree'

require("myDLL")

/*
let baseOn=Vue.prototype.$on
let baseOnce=Vue.prototype.$once
let baseEmit=Vue.prototype.$emit


Vue.prototype.$on=function () {
    var args=Array.prototype.slice.call(arguments,0)
    console.info('$on',args)
    baseOn.apply(this,args)
}
Vue.prototype.$once=function () {
    var args=Array.prototype.slice.call(arguments,0)
    console.info('$once',args)
    baseOnce.apply(this,args)
}

Vue.prototype.$emit=function () {
    var args=Array.prototype.slice.call(arguments,0)
    console.info(args)
    baseEmit.apply(this,args)
}

*/

Vue.use(http, {
    root: process.env.API_ROOT,
    timeout: 150000,
    loading: (bool) => {
         // Vue.loading(bool)
    },
    // error: (text) => Vue.alert({ text })
})
Vue.component('Cell', Cell)

Vue.component('Tree', Tree)

Vue.component('Picker', picker)
Vue.component('DatetimePicker', datetimePicker)



new Vue({
    router,
    ...App
}).$mount('#app')
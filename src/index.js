import Vue from 'vue'
import app from './app.vue'
import './config/rem'
import './image/done.svg'
import './style/init.less'
var root = document.createElement('div')
document.body.appendChild(root)
new Vue({
                render: (h) => h(app)
}).$mount(root)

import Vue from 'vue'
import Router from 'vue-router'
import CinemaRouter from './ciname'
import MineRouter from './mine'
import MovieRouter from './movie'
import AdminRouter from './admin'

Vue.use(Router);

export default new Router({
    mode: 'history',
    // base: process.env.BASE_URL,
    base: 'miaomiao',
    routes: [
        CinemaRouter,
        MineRouter,
        MovieRouter,
        AdminRouter,
        {
            path: '/*',
            redirect: '/movie'
        },
    ]
})

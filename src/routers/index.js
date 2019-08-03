import Vue from 'vue'
import Router from 'vue-router'
import CinemaRouter from './ciname'
import MineRouter from './mine'
import MovieRouter from './movie'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        CinemaRouter,
        MineRouter,
        MovieRouter,
        {
            path: '/*',
            redirect: '/movie'
        }

    ]
})

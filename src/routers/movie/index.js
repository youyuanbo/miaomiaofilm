export default {
    path: '/movie',
    component: () => import('@/views/movie'),
    children: [
        {
            path: 'city',
            component: () => import('@/components/city')
        },
        {
            path: 'nowPlaying',
            component: () => import('@/components/nowPlaying')
        },
        {
            path: 'comingSoon',
            component: () => import('@/components/comingSoon')
        },
        {
            path: 'search',
            component: () => import('@/components/search')
        },
        {
            //引入详情页，路由配置(传递参数：电影Id)
            path: 'detail/1/:movieId',
            components: {
                default: () => import('@/components/nowPlaying'),
                detail: () => import('@/views/movie/detail'),
            },
            props: {
                detail: true,
            }
        },
        {
            //引入详情页，路由配置(传递参数：电影Id)
            path: 'detail/2/:movieId',
            components: {
                default: () => import('@/components/comingSoon'),
                detail: () => import('@/views/movie/detail'),
            },
            props: {
                detail: true,
            }
        },
        {
            path: '/movie',
            redirect: '/movie/nowPlaying'
        }
    ]
}

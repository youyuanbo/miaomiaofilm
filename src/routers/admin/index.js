export default {
    path: '/admin',
    component: () => import('@/views/admin/'),
    children: [
        {
            path: 'user',
            component: () => import('@/views/admin/users.vue')
        },
        {
            path: 'movie',
            component: () => import('@/views/admin/movie.vue')
        },
        {
            path: 'cinema',
            component: () => import('@/views/admin/cinema.vue')
        },
        {
            path: '/admin',
            redirect: 'user',
        }
    ]
}

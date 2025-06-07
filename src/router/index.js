import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        name: '首页',
        path: '/index',
        component: () => import('../views/Index.vue')
    },
    {
        name: 'BookDetails',
        path: '/book/:isbn',
        component: () => import('../views/Book.vue')
    },
    {
        name: '管理',
        path: '/admin',
        component: () => import('../views/Admin.vue')
    },
    {
        name: '登录',
        path: '/login',
        component: () => import('../views/Login.vue')
    },
    {
        name: '个人中心',
        path: '/profile',
        component: () => import('../views/Profile.vue')
    },
    {
        name: 'App',
        path: '',
        redirect: '/index'
    }
]

const router = createRouter({
    routes,
    history: createWebHistory('/library/'),
});

export default router;
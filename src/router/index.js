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
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
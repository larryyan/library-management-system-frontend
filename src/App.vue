<!-- App.vue -->
<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'App',
    beforeRouteEnter(to, from, next) {
        // 在进入任何路由之前，重定向到 /index
        next({path: '/index'});
    },
};
</script>

<style>
/* 全局样式 */
</style>
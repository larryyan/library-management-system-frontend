<!-- UserInfo.vue -->
<template>
    <div class="user-info" @click="goToPersonal">
        <span>账号：{{ userId }}</span>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            userId: '',
        };
    },
    mounted() {
        this.getUserInfo();
    },
    methods: {
        async getUserInfo() {
            try {
                const accessToken = localStorage.getItem('access_token');
                if (accessToken) {
                    const response = await axios.get('http://127.0.0.1:5000/protected',
                        { headers: { Authorization: `Bearer ${accessToken}` } }
                    );
                    this.userId = response.data.logged_in_as;
                } else {
                    this.$router.push('/login');
                }
            } catch (error) {
                console.error('获取用户信息失败', error);
            }
        },
        goToPersonal() {
            this.$router.push('/profile');
        },
    },
};
</script>

<style scoped>
.user-info {
    cursor: pointer;
    color: #409eff;
    font-size: 16px;
    display: flex;
    justify-content: flex-end;
    border: 1px solid #ccc; /* 添加边框 */
    margin-left: auto; /* 整体居右 */
    width: 80px; /* 可选：设置宽度 */
    padding: 10px; /* 添加内边距 */
    border-radius: 5px; /* 添加边框半径 */
}
</style>
<template>
    <div class="login-container">
        <h2>登录</h2>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="uid">用户ID:</label>
                <input type="text" id="uid" v-model="uid" required>
            </div>
            <div class="form-group">
                <label for="password">密码:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button type="submit">登录</button>
        </form>
        <p v-if="error" class="error-message">{{ error }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            uid: '',
            password: '',
            error: '',
        };
    },
    mounted() {
        // 检查是否已登录
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            this.$router.push('/index');
        }
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://127.0.0.1:5000/login', {
                    uid: this.uid,
                    password: this.password,
                });
                const accessToken = response.data.access_token;
                // 保存 access_token 到本地存储或状态管理（如 Vuex）
                localStorage.setItem('access_token', accessToken);
                // 登录成功后的跳转或其他操作
                this.$router.push('/index');
            } catch (error) {
                if (error.response) {
                    // 处理服务器返回的错误信息
                    this.error = error.response.data.msg;
                } else {
                    // 处理其他网络错误
                    this.error = '网络错误，请稍后重试';
                }
            }
        },
    },
};
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
}

button[type="submit"] {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
}

.error-message {
    color: red;
    margin-top: 10px;
}
</style>
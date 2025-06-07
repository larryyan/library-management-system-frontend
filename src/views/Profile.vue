<!-- Profile.vue -->
<template>
    <div class="personal">
        <h2>个人信息</h2>
        <div class="info-container">
            <div class="info-item">
                <span class="label">用户ID：</span>
                <span class="value">{{ this.id }}</span>
            </div>
            <div class="info-item">
                <span class="label">姓名：</span>
                <span class="value">{{ reader.reader_name }}</span>
            </div>
            <div class="info-item">
                <span class="label">部门：</span>
                <span class="value">{{ reader.reader_department }}</span>
            </div>
            <div class="info-item">
                <span class="label">手机号：</span>
                <span class="value">{{ reader.reader_phone }}</span>
            </div>
        </div>
        <div class="button-container">
            <button class="logout-button" @click="logout">退出登录</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            reader: {
                reader_name: '',
                reader_department: '',
                reader_phone: '',
            },
            id: NaN,
        };
    },
    mounted() {
        this.getReaderInfo();
    },
    methods: {
        async getReaderInfo() {
            try {
                const accessToken = localStorage.getItem('access_token');
                if (!accessToken) {
                    this.$router.push('/login');
                }
                const response = await this.$axios.get('protected', {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                this.id = response.data.logged_in_as;
                const readerResponse = await this.$axios.get(`reader/${this.id}`);
                this.reader = readerResponse.data;
            } catch (error) {
                console.error('获取读者信息失败', error);
            }
        },
        editInfo() {
            this.$router.push('/edit-info');
        },
        logout() {
            localStorage.removeItem('access_token');
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
.personal {
    width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.info-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.info-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.label {
    font-weight: bold;
    color: #333;
    width: 80px;
}

.value {
    color: #666;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

button {
    padding: 10px 20px;
    margin: 0 10px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
}

.edit-button {
    background-color: #007bff;
    color: #fff;
    border: none;
}

.logout-button {
    background-color: #f0f0f0;
    color: #333;
    border: none;
}
</style>
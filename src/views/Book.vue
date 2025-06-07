<template>
    <div class="book-details-page">
        <div class="book-details">
            <button @click="goBack" class="navigation">返回</button>
            <h1 class="page-title">图书详情</h1>
            <div v-if="book" class="book-info-wrapper">
                <div class="book-info">
                    <h2>{{ book.book_title }}</h2>
                    <p>作者: {{ book.book_author }}</p>
                    <p>ISBN: {{ book.isbn }}</p>
                    <p>出版社: {{ book.book_publisher }}</p>
                    <p>类型: {{ book.book_type }}</p>
                </div>
                <div class="book-copies">
                    <h2>馆藏信息</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>馆藏地址</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="bookItem in book.books" :key="bookItem.id">
                                <td>{{ bookItem.id }}</td>
                                <td>{{ bookItem.book_address }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else class="loading">
                <p>加载中...</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BookDetails',
    data() {
        return {
            book: null
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    },
    mounted() {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            this.$router.push('/login');
        }
    },
    created() {
        const isbn = this.$route.params.isbn;
        this.$axios.get(`book/${isbn}`)
            .then(response => {
                this.book = response.data;
            })
            .catch(error => {
                console.error('获取图书详情失败:', error);
            });
    },
};
</script>

<style>

.book-details-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh; /* 设置页面高度占满视口 */
    background-color: #f5f5f5;
    color: #333; /* 深灰色文字 */
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Arial', sans-serif;
}

.book-details {
    background-color: #fff; /* 白色背景 */
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 1500px;
    text-align: center; /* 文字居中 */
}

.page-title {
    color: #3498db; /* 深蓝色标题 */
}

.navigation {
    display: block;
    text-align: left; /* 按钮文本居左 */
    background-color: #3498db; /* 按钮背景颜色 */
    color: #fff; /* 按钮文本颜色 */
    border: none; /* 移除边框 */
    padding: 10px 20px; /* 内边距 */
    margin-bottom: 1rem; /* 下边距 */
    border-radius: 5px; /* 边框半径 */
    cursor: pointer; /* 鼠标悬停时的样式 */
    font-size: 1.2rem; /* 字体大小 */
    text-decoration: none; /* 移除下划线 */
}

.navigation:hover {
    background-color: #2980b9; /* 鼠标悬停时的背景颜色 */
}

.book-info-wrapper {
    margin-top: 2rem;
}

.book-info, .book-copies {
    background-color: #f9f9f9; /* 淡灰色背景 */
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.book-copies h2 {
    color: #27ae60; /* 深绿色标题 */
    margin-bottom: 1rem;
}

.book-copies ul {
    list-style-type: none;
    padding: 0;
}

.book-copies li {
    background-color: #fff; /* 白色背景 */
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    background-color: #fff; /* 白色背景 */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.book-copies table {
    width: 100%;
    max-width: 800px; /* 可选：设置表格的最大宽度 */
    border-collapse: collapse;
    margin-top: 1rem;
}

.book-copies {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.book-copies th,
.book-copies td {
    padding: 0.8rem;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.book-copies th {
    background-color: #f2f2f2;
    font-weight: bold;
}

.book-copies tr:hover {
    background-color: #f5f5f5;
}
</style>

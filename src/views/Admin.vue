<template>
    <div class="container">
        <div class="sidebar">
            <h2>操作选项</h2>
            <ul>
                <li :class="{ active: currentTab === 'add-books' }" @click="currentTab = 'add-books'">图书入库</li>
                <li :class="{ active: currentTab === 'delete-books' }" @click="currentTab = 'delete-books'">图书删除</li>
                <li :class="{ active: currentTab === 'put-books' }" @click="currentTab = 'put-books'">图书位置修改</li>
                <li :class="{ active: currentTab === 'add-book-info' }" @click="currentTab = 'add-book-info'">图书信息录入</li>
                <li :class="{ active: currentTab === 'delete-book-info' }" @click="currentTab = 'delete-book-info'">图书信息删除</li>
                <li :class="{ active: currentTab === 'put-book-info' }" @click="currentTab = 'put-book-info'">图书信息修改</li>
            </ul>
        </div>
        <div class="content">
            <user-info></user-info>
            <div v-show="currentTab === 'add-books'" class="tab-content">
                <h2>馆藏书籍增加</h2>
                <form @submit.prevent="addBook">
                    <div v-for="(value, key) in bookFields" :key="key" class="form-group">
                        <label :for="key">{{ value.label }}</label>
                        <input type="text" :id="key" v-model="book[key]" required>
                    </div>
                    <button type="submit" class="btn-submit">添加图书</button>
                </form>
            </div>
            <div v-show="currentTab === 'delete-books'" class="tab-content">
                <h2>馆藏书籍删除</h2>
                <form @submit.prevent="deleteBook">
                    <div class="form-group">
                        <label for="deleteIsbn">书号：</label>
                        <input type="text" id="deleteIsbn" v-model="book_id" required>
                    </div>
                    <button type="submit" class="btn-submit">删除图书</button>
                </form>
            </div>
            <div v-show="currentTab === 'put-books'" class="tab-content">
                <h2>馆藏书籍修改</h2>
                <form @submit.prevent="updateBook">
                    <div class="form-group">
                        <label for="deleteIsbn">书号：</label>
                        <input type="text" id="deleteIsbn" v-model="book_id" required>
                    </div>
                    <div v-for="(value, key) in bookFields" :key="key" class="form-group">
                        <label :for="key">{{ value.label }}</label>
                        <input type="text" :id="key" v-model="book[key]" required>
                    </div>
                    <button type="submit" class="btn-submit">修改图书</button>
                </form>
            </div>
            <div v-show="currentTab === 'add-book-info'" class="tab-content">
                <h2>图书信息录入</h2>
                <form @submit.prevent="addBookInfo">
                    <div v-for="(value, key) in book_info_fields" :key="key" class="form-group">
                        <label :for="key">{{ value.label }}</label>
                        <input type="text" :id="key" v-model="book_info[key]" required>
                    </div>
                    <button type="submit" class="btn-submit">图书信息录入</button>
                </form>
            </div>
            <div v-show="currentTab === 'delete-book-info'" class="tab-content">
                <h2>图书信息删除</h2>
                <form @submit.prevent="deleteBookInfo">
                    <div class="form-group">
                        <label for="deleteIsbn">ISBN：</label>
                        <input type="text" id="deleteIsbn" v-model="isbn" required>
                    </div>
                    <button type="submit" class="btn-submit">图书信息删除</button>
                </form>
            </div>
            <div v-show="currentTab === 'put-book-info'" class="tab-content">
                <h2>图书信息修改</h2>
                <form @submit.prevent="updateBookInfo">
                    <div v-for="(value, key) in book_info_fields" :key="key" class="form-group">
                        <label :for="key">{{ value.label }}</label>
                        <input type="text" :id="key" v-model="book_info[key]" required>
                    </div>
                    <button type="submit" class="btn-submit">修改图书</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import UserInfo from "@/components/UserInfo.vue";

export default {
    name: 'Admin',
    mounted() {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            this.$router.push('/login');
        }
    },
    data() {
        return {
            currentTab: 'add-books',
            book: {
                isbn: '',
                book_address: '',
            },
            book_info: {
                isbn: '',
                book_title: '',
                book_author: '',
                book_publisher: '',
                book_type: '',
            },
            isbn: '',
            book_id: '',
            bookFields: {
                isbn: { label: 'ISBN：' },
                book_address: { label: '图书位置：' },
            },
            book_info_fields: {
                isbn: { label: 'ISBN：' },
                book_title: { label: '书名：' },
                book_author: { label: '作者：' },
                book_publisher: { label: '出版社：' },
                book_type: { label: '图书类型：' },
            },
        };
    },
    components: {
        UserInfo,
    },
    methods: {
        addBook() {
            axios.post('http://127.0.0.1:5000/book/', this.book)
                .then(response => {
                    console.log('添加图书成功:', response.data);
                    alert('添加图书成功');
                })
                .catch(error => {
                    console.error('添加图书失败:', error);
                    alert('添加图书失败');
                });
        },
        deleteBook() {
            axios.delete(`http://127.0.0.1:5000/book/${this.book_id}`)
                .then(response => {
                    console.log('删除图书成功:', response.data);
                    alert('删除图书成功');
                })
                .catch(error => {
                    console.error('删除图书失败:', error);
                    alert('删除图书失败');
                });
        },
        updateBook() {
            axios.put(`http://127.0.0.1:5000/book/${this.book_id}`, this.book)
                .then(response => {
                    console.log('更新图书成功:', response.data);
                    alert('更新图书成功');
                })
                .catch(error => {
                    console.error('更新图书失败:', error);
                    alert('更新图书失败');
                });
        },
        addBookInfo() {
            axios.post('http://127.0.0.1:5000/book_info/', this.book_info)
                .then(response => {
                    console.log('添加图书成功:', response.data);
                    alert('添加图书成功');
                })
                .catch(error => {
                    console.error('添加图书失败:', error);
                    alert('添加图书失败');
                });
        },
        deleteBookInfo() {
            axios.delete(`http://127.0.0.1:5000/book_info/${this.isbn}`)
                .then(response => {
                    console.log('删除图书成功:', response.data);
                    alert('删除图书成功');
                })
                .catch(error => {
                    console.error('删除图书失败:', error);
                    alert('删除图书失败');
                });
        },
        updateBookInfo() {
            const { isbn, ...bookData } = this.book_info;
            axios.put(`http://127.0.0.1:5000/book_info/${isbn}`, bookData)
                .then(response => {
                    console.log('更新图书成功:', response.data);
                    alert('更新图书成功');
                })
                .catch(error => {
                    console.error('更新图书失败:', error);
                    alert('更新图书失败');
                });
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    /* Adjust as needed */
    margin-top: 20px;
}

.sidebar {
    width: 200px;
    background-color: #f1f1f1;
    padding: 20px;
}

.sidebar ul {
    list-style-type: none;
    padding: 0;
}

.sidebar li {
    cursor: pointer;
    padding: 10px;
    transition: background-color 0.3s ease;
}

.sidebar li.active {
    background-color: #ddd;
}

.content {
    flex: 1;
    width: 500px;
    padding: 20px;
}

.tab-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 15px;
}

label {
    font-weight: bold;
}

input[type="text"] {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button.btn-submit {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-top: 10px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

button.btn-submit:hover {
    background-color: #45a049;
}
</style>
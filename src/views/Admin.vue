<template>
    <div class="container">
        <div class="sidebar">
            <h2>操作选项</h2>
            <ul>
                <li :class="{ active: currentTab === 'add' }" @click="currentTab = 'add'">图书增加</li>
                <li :class="{ active: currentTab === 'delete' }" @click="currentTab = 'delete'">图书删除</li>
                <li :class="{ active: currentTab === 'put' }" @click="currentTab = 'put'">图书修改</li>
            </ul>
        </div>
        <div class="content">
            <div v-show="currentTab === 'add'" class="tab-content">
                <h2>图书增加</h2>
                <form @submit.prevent="addBook">
                    <div v-for="(value, key) in bookFields" :key="key" class="form-group">
                        <label :for="key">{{ value.label }}</label>
                        <input type="text" :id="key" v-model="book[key]" required>
                    </div>
                    <button type="submit" class="btn-submit">添加图书</button>
                </form>
            </div>
            <div v-show="currentTab === 'delete'" class="tab-content">
                <h2>图书删除</h2>
                <form @submit.prevent="deleteBook">
                    <div class="form-group">
                        <label for="deleteIsbn">ISBN：</label>
                        <input type="text" id="deleteIsbn" v-model="isbn" required>
                    </div>
                    <button type="submit" class="btn-submit">删除图书</button>
                </form>
            </div>
            <div v-show="currentTab === 'put'" class="tab-content">
                <h2>图书修改</h2>
                <form @submit.prevent="updateBook">
                    <div v-for="(value, key) in bookFields" :key="key" class="form-group">
                        <label :for="key">{{ value.label }}</label>
                        <input type="text" :id="key" v-model="book[key]" required>
                    </div>
                    <button type="submit" class="btn-submit">修改图书</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Admin',
    data() {
        return {
            currentTab: 'add',
            book: {
                isbn: '',
                book_title: '',
                book_author: '',
                book_publisher: '',
                book_type: '',
                book_address: '',
            },
            isbn: '',
            bookFields: {
                isbn: { label: 'ISBN：' },
                book_title: { label: '书名：' },
                book_author: { label: '作者：' },
                book_publisher: { label: '出版社：' },
                book_type: { label: '图书类型：' },
                book_address: { label: '图书位置：' },
            },
        };
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
            axios.delete('http://127.0.0.1:5000/book/${this.isbn}')
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
            const { isbn, ...bookData } = this.book;
            axios.put(`http://127.0.0.1:5000/book/${isbn}`, bookData)
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
<!-- views/Admin.vue -->
<template>
    <div class="container">
        <div class="sidebar">
            <h2>操作选项</h2>
            <ul>
                <li :class="{ active: currentTab === 'add' }" @click="currentTab = 'add'">图书增加</li>
                <li :class="{ active: currentTab === 'delete' }" @click="currentTab = 'delete'">图书删除</li>
            </ul>
        </div>
        <div class="content">
            <div v-if="currentTab === 'add'">
                <h2>图书增加</h2>
                <!-- 图书增加表单 -->
                <form @submit.prevent="addBook">
                    <div>
                        <label for="isbn">ISBN：</label>
                        <input type="text" id="isbn" v-model="book.isbn" required>
                    </div>
                    <div>
                        <label for="title">书名：</label>
                        <input type="text" id="title" v-model="book.book_title" required>
                    </div>
                    <div>
                        <label for="author">作者：</label>
                        <input type="text" id="author" v-model="book.book_author" required>
                    </div>
                    <div>
                        <label for="publisher">出版社：</label>
                        <input type="text" id="publisher" v-model="book.book_publisher" required>
                    </div>
                    <div>
                        <label for="type">图书类型：</label>
                        <input type="text" id="type" v-model="book.book_type" required>
                    </div>
                    <div>
                        <label for="address">图书位置：</label>
                        <input type="text" id="address" v-model="book.book_address" required>
                    </div>
                    <button type="submit">添加图书</button>
                </form>
            </div>
            <div v-if="currentTab === 'delete'">
                <h2>图书删除</h2>
                <!-- 图书删除表单 -->
                <form @submit.prevent="deleteBook">
                    <div>
                        <label for="deleteIsbn">ISBN：</label>
                        <input type="text" id="deleteIsbn" v-model="isbn" required>
                    </div>
                    <button type="submit">删除图书</button>
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
            axios.delete(`http://127.0.0.1:5000/book/${this.isbn}`)
                .then(response => {
                    console.log('删除图书成功:', response.data);
                    alert('删除图书成功');
                })
                .catch(error => {
                    console.error('删除图书失败:', error);
                    alert('删除图书失败');
                });
        },
    },
};
</script>

<style>
.container {
    display: flex;
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
}

.sidebar li.active {
    background-color: #ddd;
}

.content {
    flex: 1;
    padding: 20px;
}
</style>
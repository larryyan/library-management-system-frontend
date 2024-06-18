<template>
    <div class="home">
        <h1>欢迎来到图书管理系统</h1>
        <div class="search-container">
            <input type="text" v-model="searchQuery" placeholder="搜索图书..."/>
            <button @click="searchBooks">搜索</button>
        </div>
        <div class="book-list">
            <h2>图书列表</h2>
            <table>
                <thead>
                <tr>
                    <th>标题</th>
                    <th>作者</th>
                    <th>ISBN</th>
                    <th>出版社</th>
                    <th>类型</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="book in books" :key="book.isbn">
                    <td>{{ book.book_title }}</td>
                    <td>{{ book.book_author }}</td>
                    <td>{{ book.isbn }}</td>
                    <td>{{ book.book_publisher }}</td>
                    <td>{{ book.book_type }}</td>
                    <td>
                        <button @click="jumpDetail(book.isbn)">详情</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Home',
    data() {
        return {
            searchQuery: '',
            books: []
        };
    },
    methods: {
        searchBooks() {
            // 根据搜索查询发送请求到后端 API 获取图书列表
            axios.get('http://127.0.0.1:5000/book_info/', {params: {query: this.searchQuery}})
                .then(response => {
                    if (response.data.status === 'success') {
                        this.books = response.data.results;
                    } else {
                        console.error('获取图书列表失败:', response.data.message);
                    }
                })
                .catch(error => {
                    console.error('获取图书列表失败:', error);
                });
        },
        jumpDetail(isbn) {
            // 跳转到图书详情页面
            this.$router.push({name: 'BookDetails', params: {isbn: isbn}});
        }
    },
    created() {
        // 在组件创建时获取图书列表
        this.searchBooks();
    }
};
</script>
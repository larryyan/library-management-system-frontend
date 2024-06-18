<!-- views/books.vue -->
<template>
    <div class="book-details">
        <h1>图书详情</h1>
        <div v-if="book">
            <p>标题: {{ book.book_title }}</p>
            <p>作者: {{ book.book_author }}</p>
            <p>ISBN: {{ book.isbn }}</p>
            <p>出版社: {{ book.book_publisher }}</p>
            <p>类型: {{ book.book_type }}</p>
            <h2>馆藏信息</h2>
            <ul>
                <li v-for="bookItem in book.books" :key="bookItem.id">
                    <p>馆藏地址: {{ bookItem.book_address }}</p>
                    <p>ID: {{ bookItem.id }}</p>
                </li>
            </ul>
        </div>
        <div v-else>
            <p>加载中...</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'BookDetails',
    data() {
        return {
            book: null
        };
    },
    created() {
        const isbn = this.$route.params.isbn;
        axios.get(`http://127.0.0.1:5000/book/${isbn}`)
            .then(response => {
                this.book = response.data;
            })
            .catch(error => {
                console.error('获取图书详情失败:', error);
            });
    }
};
</script>
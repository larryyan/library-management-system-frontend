<template>
    <div class="home-container">
        <div class="home">
            <h1 class="title">图书管理系统</h1>
            <div class="search-container">
                <input type="text" v-model="searchQuery" placeholder="搜索图书..." class="search-input" />
                <select v-model="selectedBookType" class="search-select">
                    <option value="">全部</option>
                    <option v-for="type in bookTypes" :value="type" :key="type">{{ type }}</option>
                </select>
                <button @click="searchBooks" class="search-button">搜索</button>
            </div>
            <div class="book-list">
                <h2 class="book-list-title">图书列表</h2>
                <table class="book-table">
                    <thead>
                        <tr>
                            <th class="book-th">标题</th>
                            <th class="book-th">作者</th>
                            <th class="book-th">ISBN</th>
                            <th class="book-th">出版社</th>
                            <th class="book-th">类型</th>
                            <th class="book-th">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="book in filteredBooks" :key="book.isbn" class="book-row">
                            <td class="book-title">{{ book.book_title }}</td>
                            <td class="book-author">{{ book.book_author }}</td>
                            <td class="book-isbn">{{ book.isbn }}</td>
                            <td class="book-publisher">{{ book.book_publisher }}</td>
                            <td class="book-type">{{ book.book_type }}</td>
                            <td>
                                <button @click="jumpDetail(book.isbn)" class="detail-button">详情</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
            selectedBookType: '',
            books: [],
            bookTypes: []
        };
    },
    computed: {
        filteredBooks() {
            let filteredBooks = this.books;
            if (this.searchQuery) {
                filteredBooks = filteredBooks.filter(book => {
                    return book.book_title.toLowerCase().includes(this.searchQuery.toLowerCase());
                });
            }
            if (this.selectedBookType) {
                filteredBooks = filteredBooks.filter(book => {
                    return book.book_type === this.selectedBookType;
                });
            }
            return filteredBooks;
        }
    },
    methods: {
        searchBooks() {
            axios.get('http://127.0.0.1:5000/book_info/')
                .then(response => {
                    if (response.data.status === 'success') {
                        this.books = response.data.results;
                        this.bookTypes = Array.from(new Set(this.books.map(book => book.book_type)));
                    } else {
                        console.error('获取图书列表失败:', response.data.message);
                    }
                })
                .catch(error => {
                    console.error('获取图书列表失败:', error);
                });
        },
        jumpDetail(isbn) {
            this.$router.push({name: 'BookDetails', params: {isbn: isbn}});
        }
    },
    created() {
        this.searchBooks();
    }
};
</script>

<style>
.home-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh; /* 设置页面高度占满视口 */
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
}
.home {
    max-width: 1200px;
    width: 90%;
    max-height: 100vh; /* 设置最大高度占满视口 */
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    overflow-y: auto; /* 添加垂直滚动 */
}

.title {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
}

.search-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.search-input {
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
    width: 300px;
}

.search-select {
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
    width: 150px;
}

.search-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
}

.book-list {
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    max-height: calc(100vh - 250px); /* 设置列表最大高度 */
    overflow-y: auto; /* 添加垂直滚动 */
}
.book-list-title {
    color: #333;
    margin-bottom: 10px;
}

.book-table {
    width: 100%;
    border-collapse: collapse;
}

.book-row {
    border-bottom: 1px solid #f1f1f1;
}

.book-row:hover {
    background-color: #f5f5f5;
}

.book-th {
    color: #8b4513; /* 棕色 */
}

.book-title {
    color: #8b4513; /* 棕色 */
}

.book-author {
    color: #8b4513; /* 棕色 */
}

.book-isbn {
    color: #8b4513; /* 棕色 */
}

.book-publisher {
    color: #8b4513; /* 棕色 */
}

.book-type {
    color: #8b4513; /* 棕色 */
}

.detail-button {
    background-color: #28a745;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}
</style>
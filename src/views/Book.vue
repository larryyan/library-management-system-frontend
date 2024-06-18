<template>
    <div class="book-details-page">
      <div class="book-details">
        <h1 class="page-title">图书详情</h1>
        <div class="navigation">
          <button @click="goBack">返回</button>
        </div>
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
            <ul>
              <li v-for="bookItem in book.books" :key="bookItem.id">
                <p>馆藏地址: {{ bookItem.book_address }}</p>
                <p>ID: {{ bookItem.id }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div v-else class="loading">
          <p>加载中...</p>
        </div>
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
    methods: {
      goBack() {
        this.$router.go(-1);
      }
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
  
  <style scoped>
  body{
    margin: 0;
    padding: 0;
  }
  .book-details-page {
    background-color: #f0f0f0; /* 浅灰色背景 */
    color: #333; /* 深灰色文字 */
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Arial', sans-serif;
    width: 100vw; /* 宽度占据整个视窗 */
    height: 100vh; /* 高度占据整个视窗 */
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
    margin-bottom: 1rem;
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
  </style>
  
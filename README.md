# Library Management System Frontend

本项目是图书管理系统的前端部分，基于 Vue 3 构建，旨在为图书馆管理、用户借阅、图书检索等功能提供现代化、响应式的 Web 界面。

## 项目特性

- 用户登录与登出
- 图书检索与展示
- 图书详情查看
- 用户个人信息管理
- 管理员后台（图书与用户管理）
- 响应式设计，适配多端

## 技术栈

- [Vue 3](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Axios](https://axios-http.com/)
- [Vite](https://vitejs.dev/)
- [Bootstrap](https://getbootstrap.com/)（样式框架）

## 快速开始

### 环境要求

- Node.js 12 及以上
- npm

### 安装与运行

1. 克隆仓库：

   ```bash
   git clone https://github.com/larryyan/library-management-system-frontend.git
   cd library-management-system-frontend
   ```

2. 安装依赖：

   ```bash
   npm install
   ```

3. 启动开发服务器：

   ```bash
   npm run dev
   ```

   默认访问地址为 [http://localhost:3001](http://localhost:3001)

### 构建生产包

```bash
npm run build
```

## 目录结构

```
├── public/               # 公共资源
├── src/                  # 源码目录
│   ├── assets/           # 静态资源
│   ├── components/       # 公共组件
│   ├── router/           # 路由配置
│   ├── views/            # 页面视图
│   ├── App.vue           # 根组件
│   └── main.js           # 入口文件
├── package.json          # 项目依赖与脚本
├── vite.config.js        # Vite 配置
└── ...
```

## 配置说明

- 前端 API 地址、超时时间等配置可在 `src/config.js` 中修改。
- 开发环境下，`/api` 请求会被代理到本地后端（详见 `vite.config.js`）。

## API 集成

前端通过 Axios 与后端 API 通信，接口定义与请求方法可在 `src/api/` 目录下维护。请确保接口格式与后端一致。

## 许可证

本项目基于 MIT License 开源，详见 LICENSE 文件。

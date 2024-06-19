# Library Management System Frontend

This is the frontend repository for the Library Management System, a web-based application for managing library resources, users, and transactions. The frontend is built using Vue.js, a progressive JavaScript framework for building user interfaces.

This project is an assignment for the course "Database Course Design". The back-end project address: https://github.com/larryyan/library-management-system-backend"

## Features

- User login and logout
- Book search and display
- Book details view
- User profile management
- Admin dashboard for managing books and users
- Responsive and user-friendly interface

## Technologies Used

- Vue.js
- Vue Router
- Vuex (state management)
- Axios (HTTP client)
- Bootstrap (CSS framework)

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/larryyan/library-management-system-frontend.git
   ```

2. Navigate to the project directory:

   ```
   cd library-management-system-frontend
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Start the development server:

   ```
   npm run serve
   ```

   The frontend application will be running at `http://localhost:8080`.

## Configuration

The frontend configuration can be found in the `src/config.js` file. You can modify the following settings:

- `BASE_URL`: The base URL of the backend API.
- `API_TIMEOUT`: The timeout value for API requests.

## Project Structure

The project structure follows the standard Vue.js project structure:

- `src/`: Contains the source code files.
  - `assets/`: Contains static assets such as images and fonts.
  - `components/`: Contains reusable Vue components.
  - `router/`: Contains the Vue Router configuration.
  - `views/`: Contains the main views or pages of the application.
  - `App.vue`: The root component of the application.
  - `main.js`: The entry point of the application.
- `public/`: Contains the public assets and the `index.html` file.
- `package.json`: Contains the project dependencies and scripts.

## API Integration

The frontend communicates with the backend API using Axios, a promise-based HTTP client. The API endpoints and request/response formats should match the backend API specification.

The API client configuration can be found in the `src/api/` directory, where you can define the API endpoints and request methods.


## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

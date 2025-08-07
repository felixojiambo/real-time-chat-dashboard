# Real-Time Chat Dashboard

This project is a mini full-stack application that simulates a real-time chat dashboard, built as a technical challenge. It features live message updates and typing indicators using a modern web stack.



## Features

-   **Real-Time Messaging**: New messages appear instantly without refreshing the page, powered by WebSockets.
-   **Live Typing Indicators**: See when other users are typing a message.
-   **Modern Tech Stack**: Built with React, Node.js, Express, and Socket.IO.
-   **Efficient Data Fetching**: Uses React Query to cache the initial message load, preventing redundant API calls.
-   **Styled UI**: A clean and simple interface built with Tailwind CSS.

---

## Tech Stack

-   **Frontend**:
    -   React.js (Vite)
    -   Tailwind CSS
    -   React Query
    -   Socket.IO Client
    -   Axios
-   **Backend**:
    -   Node.js
    -   Express
    -   Socket.IO
    -   CORS

---

## Setup and Installation

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.x or later recommended)
-   [npm](https://www.npmjs.com/)

### Instructions

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/felixojiambo/real-time-chat-dashboard.git](https://github.com/felixojiambo/real-time-chat-dashboard.git)
    cd real-time-chat-dashboard
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

---

## How to Run the Application

You will need to run the backend and frontend servers in two separate terminals.

1.  **Start the Backend Server:**
    Navigate to the `backend` directory and run:

    ```bash
    # From the /backend directory
    npm run dev
    ```
    The server will start on `http://localhost:4000`.

2.  **Start the Frontend Development Server:**
    Navigate to the `frontend` directory and run:

    ```bash
    # From the /frontend directory
    npm run dev
    ```
    The React application will be available at `http://localhost:5173`.

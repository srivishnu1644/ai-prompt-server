# 🤖 AI Prompt Generator - Backend

The server-side application for the AI Prompt Generator. Built with Node.js and Express, this API handles data management, AI integration, and serves requests for the React frontend.

🔗 **Frontend Repository:** [Click here to view the Client Code](https://github.com/srivishnu1644/ai-prompt-client)

## 🚀 Features

* **RESTful API:** Robust endpoints to create, read, update, and delete prompts.
* **Database Integration:** Connects to MongoDB for persistent data storage.
* **Secure Connections:** CORS configured to communicate safely with the frontend.
* **Environment Config:** Secure management of API keys and database URIs.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose
* **Utilities:** Cors, Dotenv, Nodemon

## 💻 How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/srivishnu1644/ai-prompt-server.git](https://github.com/srivishnu1644/ai-prompt-server.git)
    ```
    *(Note: Update the URL above if your backend repo name is different)*

2.  **Navigate to the project directory:**
    ```bash
    cd ai-prompt-server
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add your keys:
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    OPENAI_API_KEY=your_api_key_here
    ```

5.  **Start the server:**
    ```bash
    npm run dev
    ```

## 📬 Contact

Created by **Vishnu**

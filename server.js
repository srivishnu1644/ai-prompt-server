require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");

const authMiddleware = require("./authMiddleware");

const userRouter = require("./routes/users");
const promptRouter = require("./routes/promptRoutes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);

app.use("/api/prompts", authMiddleware, promptRouter);

app.get("/", (req, res) => {
  res.send("Hello from the AI Prompt Backend!");
});

app.use((err, req, res, next) => {
  console.error("----- SERVER ERROR -----");
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong on the server!" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

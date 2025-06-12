const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

const mongoURI = process.env.MONGO_URL || "mongodb://localhost:27017/tasks";

app.use(express.json());

// Simple root route for testing and health check
app.get("/", (req, res) => {
  res.send("Task Manager API is running.");
});

const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
});

// Connect to MongoDB and start server
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

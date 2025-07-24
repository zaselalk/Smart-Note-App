import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";




// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process with failure
  });

// Middleware to parse JSON requests
app.use(express.json());

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the Note App API");
});

// Import and use the note routes
import noteRouter from "./Routes/noteRoutes.js";
app.use("/api/notes", noteRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

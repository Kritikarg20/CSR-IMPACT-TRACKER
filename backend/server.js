import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

mongoose.set('strictQuery', true);

dotenv.config();

import authRoutes from "./routes/auth.js";

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

// Start server after DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start server only once
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.log(err));

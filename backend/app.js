import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";
import rateLimiting from "express-rate-limit";
import cors from "cors";
import connectDB from "./config/connectToDb.js";
import authRoute from "./routes/authRoute.js";
import usersRoute from "./routes/usersRoute.js";
import postsRoute from "./routes/postsRoute.js";
import commentsRoute from "./routes/commentsRoute.js";
import categoriesRoute from "./routes/categoriesRoute.js";
import { errorHandler, notFound } from "./middlewares/error.js";

// Connection to Database
connectDB();

// Init App
const app = express();

// Middlewares
app.use(express.json());

// Security Headers (helmet)
app.use(helmet());

// Prevent Http Param Pollution
app.use(hpp());

// Prevent XSS(Cross Site Scripting) Attacks
app.use(xss());

// Rate Limiting
app.use(rateLimiting({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max:200,
}));

// Cors Policy
app.use(cors({
  origin: "http://localhost:3000"
}));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/categories", categoriesRoute);

// Error Handler Middleware
app.use(notFound)
app.use(errorHandler);

// Running the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.MODE_ENV} mode on port ${PORT}`)
);

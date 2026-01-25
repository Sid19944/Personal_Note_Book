import express from "express";
const app = express();

import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config("./.env")

app.use(express.json());

console.log(process.env.FRONTEND_URL)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import UserRoute from "./src/routes/user.route.js";
app.use("/auth/v1/user", UserRoute);

import NoteRoute from "./src/routes/note.route.js";
app.use("/api/v1/note", NoteRoute);

// middleware for handle error
import { erroMiddleware } from "./src/utils/ErrorHandler.js";
app.use(erroMiddleware);

export default app;

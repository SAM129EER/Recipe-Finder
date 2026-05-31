import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import createCorsOptions from "./config/cors.js";
import authRoutes from "./features/auth/auth.routes.js";
import { errorHandler, notFoundHandler } from "./shared/middleware/error.middleware.js";

const app = express();

app.use(cors(createCorsOptions()));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ status: "ok", service: "recipe-finder-api" });
});

app.use("/api/users", authRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

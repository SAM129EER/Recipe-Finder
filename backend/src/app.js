import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
const app = express();

// middlewares
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000"
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman or server-to-server)
    if (!origin) return callback(null, true);

    // Allow whitelisted origins or any localhost/127.0.0.1 dev origin on any port
    if (
      allowedOrigins.includes(origin) ||
      /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
    ) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());


// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoutes);



export default app;

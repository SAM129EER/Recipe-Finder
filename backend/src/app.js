import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
const app = express();

// middlewares
app.use(cors());
app.use(express.json());


// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoutes);



export default app;

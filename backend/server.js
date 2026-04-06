import "./src/config/env.js"; // load env first
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

// connect DB first
await connectDB();

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

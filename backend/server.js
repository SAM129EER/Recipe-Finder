import "./src/config/env.js"; // load env first
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Start Express server immediately
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    // Connect to database in background
    connectDB();
  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
};

startServer();

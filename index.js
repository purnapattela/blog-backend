import app from "./src/app.js";
import mongoose from "mongoose";

async function startServer() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ DB connected");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at PORT: ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to DB or start server:", error.message);
    process.exit(1); 
  }
}

startServer();

import "dotenv/config";
import connectDB from "./Configs/db";
import app from "./app";

const Port = process.env.PORT || 4000;

async function startServer() {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not set (see .env.example)");
  await connectDB();
  app.listen(Port, () => console.log(`server running on 127.0.0.1:${Port}`));
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

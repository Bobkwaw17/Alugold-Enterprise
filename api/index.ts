import "dotenv/config";
import connectDB from "../backend/Configs/db";
import app from "../backend/app";

let databaseReady: Promise<void> | null = null;

export default async function handler(req: any, res: any) {
  if (!process.env.JWT_SECRET) {
    res.status(500).json({
      status: "error",
      data: { message: "JWT_SECRET is not configured" },
    });
    return;
  }

  if (!databaseReady) {
    databaseReady = connectDB();
  }

  try {
    await databaseReady;
    return app(req, res);
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: { message: "Database connection failed" },
    });
  }
}

import "dotenv/config";
import express, { NextFunction, Request, RequestHandler, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet"
import connectDB from "./Configs/db.js";

const app = express();
const Port = process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet())
// routes
const homeHandler: RequestHandler = (req: Request, res: Response) => {
  res.json({ status: "success", data: { message: "server is active" } });
};

const notFoundHandler: RequestHandler = (req: Request, res: Response) => {
  res.status(404).json({ status: "error", data: { message: "404 - not found" } });
};

const errorHandler = (
  err: Error & { status?: number },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
};

app.get("/", homeHandler);

app.use(notFoundHandler);

app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(Port, () => {
    console.log(`server running on 127.0.0.1:${Port}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

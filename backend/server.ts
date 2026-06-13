import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet"

const app = express();
const Port = process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet())
// routes
app.get("/", (req: Request, res: Response) => {
  res.json({ status: "success", data: { message: "server is active" } });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ status: "error", data: { message: "404 - not found" } });
});

app.use((err: Error & { status?: number }, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});

app.listen(Port, () => {
  console.log(`server running on 127.0.0.1:${Port}`);
});

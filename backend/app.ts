import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import authRoutes from "./Routes/authRoutes";
import bookingRoutes from "./Routes/bookingRoutes";
import quoteRoutes from "./Routes/quoteRoutes";
import userRoutes from "./Routes/userRoutes";
import newsletterRoutes from "./Routes/newsletterRoutes";
import projectRoutes from "./Routes/projectRoutes";
import contactRoutes from "./Routes/contactRoutes";
import serviceRoutes from "./Routes/serviceRoutes";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(",") ?? true }));
if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({ status: "success", data: { message: "server is active" } });
});

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);

app.use((_req, res) => {
  res.status(404).json({ status: "error", data: { message: "404 - not found" } });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  let status: number = err.status || 500;
  let message: string = err.message || "Internal server error";

  if (err.name === "ValidationError") status = 400;
  else if (err.name === "CastError") { status = 400; message = `Invalid ${err.path}`; }
  else if (err.code === 11000) { status = 409; message = "That value is already taken (e.g. time slot already booked)"; }
  else if (err.type === "entity.parse.failed") { status = 400; message = "Malformed JSON body"; }

  if (status >= 500) console.error(err.stack);
  res.status(status).json({ status: "error", data: { message: status >= 500 ? "Internal server error" : message } });
});

export default app;

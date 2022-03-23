import dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import { join } from "path";
import xss from "xss-clean";
import connectDB from "./db/connect.js";
import authenticateUser from "./middleware/authentication.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import authRouter from "./routes/auth.js";
import jobsRouter from "./routes/jobs.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "client", "build")));

  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/jobs", authenticateUser, jobsRouter);

  app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/jobs", authenticateUser, jobsRouter);
}

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

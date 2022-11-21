import express from "express";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import indexRouter from "./routes/index.js";
import userRouter from "./routes/users.js";
const app = express();

app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "frontend/build")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "food",
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", indexRouter);
app.use("/users", userRouter);

export default app;

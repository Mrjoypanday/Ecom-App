import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";
import catagoryRoute from "./routes/catagoryRoute.js";
import proudctRoute from "./routes/proudctRoute.js";
import bannerRoute from "./routes/bannerRoute.js";
import path from "path";
import { fileURLToPath } from "url";

//config
dotenv.config();

//databse
connectDB();
//obj
const app = express();
//middlwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", catagoryRoute);
app.use("/api/v1/product", proudctRoute);
app.use("/api/v1/banner", bannerRoute);

//rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 5053;

app.listen(PORT, () => {
  console.log(`port running on ${PORT}`);
});

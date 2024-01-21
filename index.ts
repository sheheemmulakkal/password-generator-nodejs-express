import express from "express";
import router from "./src/routes/router";
import dotenv from "dotenv";
import dbconnect from "./config/db.config";
import cors from "cors";

dotenv.config();
dbconnect();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(3000, () => {
  console.log("App running in port 3000...");
});

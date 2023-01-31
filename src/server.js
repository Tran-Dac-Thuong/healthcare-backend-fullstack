import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouter from "./router/web";
import connect from "./config/connectDB";
const cors = require("cors");
require("dotenv").config();

let app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
viewEngine(app);
initWebRouter(app);

connect();

let port = process.env.PORT || 6969;

app.listen(port, function () {
  console.log("Run OK at port " + port);
});

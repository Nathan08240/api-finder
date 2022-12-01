require("./db/mongoose");
require("./utils/redis");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const initRouter = require("./routes/index");
const cors = require("cors");

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    ];



app.use(cors({
    origin: allowedOrigins
}));


app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

initRouter(app);

console.log(`

███████ ██ ███    ██ ██████  ███████ ██████  
██      ██ ████   ██ ██   ██ ██      ██   ██ 
█████   ██ ██ ██  ██ ██. .██ █████   ██████  
██      ██ ██  ██ ██ ██ _ ██ ██      ██   ██ 
██      ██ ██   ████ ██████  ███████ ██   ██                                            
                                            
App running on http://localhost:${process.env.PORT}
`);

module.exports = app;

const express = require("express");
const { connection } = require("./config/db");
const { UserRoutes } = require("./routes/UserRoutes");
const { RestaurantRoutes } = require("./routes/RestaurantRoutes");
const { OrderRoutes } = require("./routes/OrderRoutes");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("Home Page");
});

app.use("/api", UserRoutes);
app.use("/api", RestaurantRoutes);
app.use("/api", OrderRoutes);

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
        console.log(`Example app listening on port ${process.env.PORT}!`);
    } catch (error) {
        console.log(error);
    }
});

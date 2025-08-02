if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
// const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

// app.use(cors({
//   origin: 'https://peernet.netlify.app', 
//   credentials: true
// }));

const MongoUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/peernet";

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MongoUrl);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is listening on port 3000");
})

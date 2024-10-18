const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path")
const connectDb = require("./config/db")
const router = require("./routes/rule.route")

require('dotenv').config();

const port = process.env.PORT || 3001;
// const mongoURI = process.env.MONGO_URI;

// Log to ensure environment variables are being loaded correctly
console.log("Loaded port:", port);
// console.log("MongoDB URI:", mongoURI);



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDb();


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


app.use(router)
// Add error handling for app.listen
app.listen(port, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log(`Server is running on http://localhost:${port}`);
    }
});

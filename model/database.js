//Import Modules
const mongoose = require("mongoose");
const configFile = require("../config/config");

//Route to database url
const db_url = configFile.connect_db;

//Connection to mongoose
mongoose.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected To Database.");
});

module.exports = mongoose;

const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
const path = require('path');
const apiRouter = require('./routes/api.js');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors(config.cors_options))

app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(process.env.PORT || 8080, (err) => {
    console.log(`server listening on ${process.env.PORT || 8080}`)
})


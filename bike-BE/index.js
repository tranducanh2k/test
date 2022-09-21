const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const port = process.env.PORT;
var cors = require('cors')

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/", require('./routes/authRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));

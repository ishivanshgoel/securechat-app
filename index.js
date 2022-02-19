require("dotenv").config();

const PORT = process.env.PORT || 3000;

require('./app/server')(PORT)
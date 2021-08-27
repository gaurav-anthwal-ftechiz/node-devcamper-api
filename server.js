const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const express = require("express");
const morgan = require("morgan");
const connectDb = require("./config/db");
const app = express();
const errorHandler = require('./middleware/error')

// body parser
app.use(express.json())

// Routes files
const bootcamps = require("./routes/bootcampRoute");
// Load env vars

// db connection
connectDb();

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);


app.use(errorHandler)

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => {
    process.exit(1);
  });
});

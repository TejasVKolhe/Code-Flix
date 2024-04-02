const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jobRoutes = require("./routes/jobRoute");
const userRoute = require("./routes/userRoute");

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const MONGO_URI = "mongodb+srv://darkphoenix5504:rppoopproj@rppoop.etdbqo8.mongodb.net/?retryWrites=true&w=majority&appName=RPPOOP";

const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to database");
})
.catch((error) => {
  console.error("Error connecting to database:", error.message);
});

app.use("/api/jobs", jobRoutes);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

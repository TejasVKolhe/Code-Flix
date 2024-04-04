const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute'); // Corrected route file name
const jobRoutes = require('./routes/jobRoute');
const discussionRoute = require('./routes/discussionRoute');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
const cors = require('cors');

const corsOptions = {
  origin: "http://localhost:3001",
  methods: "GET, PUT, DELETE, POST, PATCH, HEAD",
  credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 6001;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Server Port: ${PORT}`);
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    // Handle connection error here (e.g., exit process)
  });

app.use('/api/user', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use(bodyParser.json());
app.use('/api/comment', discussionRoute);
const express = require("express");
const bodyParser = require("body-parser");
const bookingRoutes = require("./routes/bookingRoutes");
const cors = require("cors");

const app = express();
const PORT = 3003;
// Enable CORS
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// Routes
app.use("/api", bookingRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

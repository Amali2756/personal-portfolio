const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

// Model
const Contact = mongoose.model("Contact", ContactSchema);

// Home Route
app.get("/", (req, res) => {
  res.send("Portfolio Backend is Running!");
});

// Contact Route
app.post("/contact", async (req, res) => {
  try {
    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });

    await contact.save();

    res.status(200).json({
      message: "Message sent successfully!"
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
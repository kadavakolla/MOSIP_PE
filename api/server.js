require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
// const {verify} = require("../qrscanner/src/utils/verify.js")
const app = express();

const PORT = process.env.PORT || 5000;

// ✅ Allow all origins during development
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

// ✅ MongoDB connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("❌ MONGO_URI is missing in .env file!");
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Mongoose schema
const JsonSchema = new mongoose.Schema({
  data: Object,
  uploadedAt: { type: Date, default: Date.now },
});
const JsonModel = mongoose.model("JsonData", JsonSchema);

// ✅ Multer setup
const upload = multer({ dest: "uploads/" });

// ✅ Upload & verify endpoint
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const fileContent = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(fileContent);

    // Save to MongoDB
    const savedData = await JsonModel.create({ data: jsonData });
    console.log("✅ Data saved:", savedData);

    // Verify JSON
    const { verify } = await import("../qrscanner/dist/utils/verification-utils.js");
    const verificationStatus = await verify(savedData.data);
    console.log("🔍 Verification status:", verificationStatus);

    // Cleanup
    fs.unlinkSync(filePath);

    res.json({
      message: "File uploaded, saved to MongoDB, and verified!",
      data: savedData,
      verificationStatus: verificationStatus
    });
  } catch (error) {
    console.error("❌ Error processing file:", error.message);
    res.status(500).json({
      error: "Error processing JSON file",
      details: error.message
    });
  }
});


// app.post("/api/upload", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const filePath = req.file.path;
//     const fileContent = fs.readFileSync(filePath, "utf8");
//     const jsonData = JSON.parse(fileContent);

//     // Save to MongoDB
//     const savedData = await JsonModel.create({ data: jsonData });
//     console.log("✅ Data saved:", savedData);

//     // Cleanup
//     fs.unlinkSync(filePath);

//     res.json({
//       message: "File uploaded and saved to MongoDB!",
//       data: savedData
//     });
//   } catch (error) {
//     console.error("❌ Error processing file:", error.message);
//     res.status(500).json({
//       error: "Error processing JSON file",
//       details: error.message
//     });
//   }
// });


// ✅ Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

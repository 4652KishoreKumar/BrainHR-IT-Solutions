const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

// Enable CORS
app.use(cors());

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original filename
  }
});
const upload = multer({ storage: storage });


app.post('/upload', upload.single('file'), (req, res) => {
    const fileSize = req.file.size; // Get the size of the uploaded file
    res.setHeader('Content-Length', fileSize); // Set Content-Length header in the response
    res.send('File uploaded successfully');
  });

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


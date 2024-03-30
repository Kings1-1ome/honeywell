const express = require('express');
const fs = require('fs/promises');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Path to the text file database
const DB_PATH = './formDB.txt';

// Routes
app.post('/api/formdata', async (req, res) => {
  try {
    const formData = req.body;
    await saveFormData(formData);
    res.json({ success: true, formData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/formdata', async (req, res) => {
  try {
    const formData = await readFormData();
    res.json({ success: true, formData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Function to save form data to the text file
async function saveFormData(formData) {
  const existingData = await readFormData();
  existingData.push(formData);
  await fs.writeFile(DB_PATH, JSON.stringify(existingData, null, 2));
}

// Function to read form data from the text file
async function readFormData() {
  try {
    const data = await fs.readFile(DB_PATH);
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // File does not exist, return an empty array
      return [];
    }
    throw err;
  }
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

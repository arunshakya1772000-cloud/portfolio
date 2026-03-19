const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const result = dotenv.config({ path: path.resolve(__dirname, '.env') });
if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('.env file loaded successfully');
}

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('Created uploads directory:', uploadsDir);
}


const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});


// Storage configuration (Multer for Local, switch to multer-s3 for AWS S3 later)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Database Schema & Model
const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  tags: [String],
  thumbnail: String,
  url: String, // Or S3 key
  type: { type: String, enum: ['youtube', 'local'] }
});
const Video = mongoose.model('Video', videoSchema);

const projectSchema = new mongoose.Schema({
  title: String,
  category: String,
  image: String
});
const Project = mongoose.model('Project', projectSchema);

// MongoDB Connection
const uri = process.env.MONGO_URI || 'mongodb+srv://arunshakya1772000_db_user:22UyZHc5dc4NB5Zw@cluster0.7lvocho.mongodb.net/';

console.log('Connecting to MongoDB...');
mongoose.connect(uri, {
  family: 4, // Force IPv4
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  }
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    if (err.message.includes('ECONNREFUSED')) {
      console.warn('TIP: This is often a DNS or network issue. Try checking your internet connection or switching to a different DNS (like 8.8.8.8).');
    }
  });

// Handle connection events
mongoose.connection.on('error', err => {
  console.error('Mongoose error event:', err);
});

// --- API ENDPOINTS ---

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date(), env: process.env.NODE_ENV });
});

// Admin Login
app.post('/api/admin/login', (req, res) => {
  let { username, password } = req.body;
  
  // Robustness: trim any leading/trailing whitespace
  if (username) username = username.trim();
  if (password) password = password.trim();

  const adminUser = process.env.ADMIN_USERNAME || 'bappandillo';
  const adminPass = process.env.ADMIN_PASSWORD || '58111279arun';

  // Diagnostic logging (remove in production)
  console.log('Login attempt:', { 
    receivedUser: username, 
    expectedUser: adminUser,
    passMatch: password === adminPass,
    receivedPassLen: password ? password.length : 0,
    expectedPassLen: adminPass.length
  });

  if (username === adminUser && password === adminPass) {
    res.json({ success: true, message: 'Logged in successfully', token: 'dummy-jwt-token' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});


// GET: Fetch all videos
app.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find().sort({ _id: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// POST: Upload new video (Supports file upload or direct youtube link)
app.post('/api/videos', upload.fields([
  { name: 'video', maxCount: 1 }, 
  { name: 'thumbnail', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, description, category, tags, type, url } = req.body;
    let finalUrl = url;
    let thumbnailUrl = '';

    // If local, use the uploaded file path (or S3 URL)
    if (type === 'local' && req.files?.video) {
        finalUrl = `/uploads/${req.files.video[0].filename}`;
    }
    if (req.files?.thumbnail) {
        thumbnailUrl = `/uploads/${req.files.thumbnail[0].filename}`;
    }

    const newVideo = new Video({
      title,
      description,
      category,
      tags: tags ? tags.split(',') : [],
      thumbnail: thumbnailUrl,
      url: finalUrl,
      type
    });

    await newVideo.save();
    console.log('Video saved successfully:', newVideo._id);
    res.status(201).json(newVideo);
  } catch (error) {
    console.error('Video upload error:', error);
    res.status(500).json({ error: 'Upload failed: ' + error.message });
  }
});


// DELETE: Remove video
app.delete('/api/videos/:id', async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// GET: Fetch all projects (photos)
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ _id: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// POST: Upload new project (photo)
app.post('/api/projects', upload.single('image'), async (req, res) => {
  try {
    const { title, category } = req.body;
    let imageUrl = '';

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newProject = new Project({
      title,
      category,
      image: imageUrl
    });

    await newProject.save();
    console.log('Project saved successfully:', newProject._id);
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Project upload error:', error);
    res.status(500).json({ error: 'Upload failed: ' + error.message });
  }
});

// Global Error Handler (to ensure we always return JSON, not HTML)
app.use((err, req, res, next) => {
  console.error('Global error handler caught:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});


// DELETE: Remove project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// Serve static files from the React frontend
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Any other request that doesn't match an API route will serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// Export the app for serverless deployment
module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

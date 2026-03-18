const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Storage configuration (Multer for Local, switch to multer-s3 for AWS S3 later)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
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
mongoose.connect(uri, {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  }
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// --- API ENDPOINTS ---

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
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
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
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

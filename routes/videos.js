import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from "fs";
import express from "express";
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const videoDataPath = join(__dirname, '../data/videos.json');
const router = express.Router();

const readVideoData = () => {
    try {
        const data = fs.readFileSync(videoDataPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading video data:", err);
        return [];
    }
};

const writeVideoData = (data) => {
    try {
        fs.writeFileSync(videoDataPath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error writing video data:", err);
    }
};

router.get('/', (_req, res) => {
    const videos = readVideoData();
    res.json(videos);
});

router.get('/:id', (req, res) => {
    const videos = readVideoData();
    const video = videos.find(v => v.id === req.params.id);
    if (video) {
        res.json(video);
    } else {
        res.status(404).json({ message: "Video not found" });
    }
});

router.post('/upload', (req, res) => {
    const { title, description, videoUrl } = req.body;

    if (!videoUrl) {
        return res.status(400).json({ message: "Video URL is required" });
    }

    const videos = readVideoData();
    const newVideo = {
        id: uuidv4(), 
        title: title || "Untitled Video",
        description: description || "No description provided.",
        thumbnail: '../public/images/Upload-video-preview.jpg', 
        views: "0",
        likes: "0",
        duration: "0:00",  
        video: videoUrl,  
        timestamp: Date.now(),
        comments: []
    };
    
    videos.push(newVideo); 
    writeVideoData(videos);  
    
    res.status(201).json(newVideo);
});

export default router;

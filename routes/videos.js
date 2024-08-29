import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from "fs";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const videoDataPath = join(__dirname, '../data/videos.json');
const router = express.Router();

    const readVideoData = () => {
    const data = fs.readFileSync(videoDataPath, 'utf8');
    return JSON.parse(data);
    };



    const writeVideoData = (data) => {
    fs.writeFileSync(videoDataPath, JSON.stringify(data, null, 2));
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
        const videos = readVideoData();
        
        const newVideo = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // consider using np?
        title: req.body.title || "Untitled Video",
        description: req.body.description || "No description provided.",
        thumbnail: '../public/images/default-thumbnail.jpg',  //will fix that
        views: "0",
        likes: "0",
        duration: "0:00",  
        video: "",  
        timestamp: Date.now(),
        comments: []
    };
    
    videos.push(newVideo); 
    writeVideoData(videos);  
    
    res.status(201).json(newVideo);
    });



export default router;

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


export default router;

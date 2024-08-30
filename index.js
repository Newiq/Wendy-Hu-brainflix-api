import express, { json } from 'express';
import cors from 'cors';
import videoRoutes from './routes/videos.js';
import path from 'path';
import dotenv from "dotenv";

const dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(dirname,"public")));
app.use('/videos',videoRoutes);

app.listen(PORT,()=>{
    console.log(`Sever is running on http://localhost:${PORT}`);
})
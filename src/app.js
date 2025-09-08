import express from 'express'
import { config } from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors'
import v1Router from "./routes/index.js"
import GlobalErrorHandler from './middlewares/GlobalErrorHandler.middleware.js';

config({debug:true,encoding:"utf-8"})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/public", express.static(path.join(__dirname, "public")))
app.use(cors())

app.use("/api/v1", v1Router)

app.use(GlobalErrorHandler)

export default app

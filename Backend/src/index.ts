import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import config from './config/config'

dotenv.config();

const app = express()
const port: number = config.port;

app.get('/', (req: Request, res: Response) => {
    res.send("<h1>Shopi server is running......</h1>")
})

app.listen((config.port), () => {
    console.log(`Shopi server is running on http://localhost:${config.port}`)
})
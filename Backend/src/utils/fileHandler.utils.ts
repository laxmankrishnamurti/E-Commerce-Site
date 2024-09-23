import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Simulation of __dirname in ES6
const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.resolve(__dirname, "..", "..", "public", "sellers");
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now() + "-" + Math.ceil(Math.random() * 1e9)}.png`;
    cb(null, fileName);
  },
});

const fileHandler = multer({
  storage: storage,
});

export default fileHandler;

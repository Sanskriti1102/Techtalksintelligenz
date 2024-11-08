import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";

import cors from "cors";
import contactRoutes from './routes/contactRoutes.js'
import EmailRoutes from './route.js'


dotenv.config();
const app = express();
connectDB();

app.use(express.json());

// to avoid cross-origin error
app.use(cors());

app.use("/email", EmailRoutes);
app.use("/contact", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


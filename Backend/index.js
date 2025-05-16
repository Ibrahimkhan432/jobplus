import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";
import userRoutes from "./routes/userRoutes/index.js"
import companyRoutes from "./routes/companyRoutes/index.js"
import jobRoutes from "./routes/jobRoutes/index.js"
dotenv.config();
const app = express();

app.get("/",(req,res)=>{
    res.send("backend running")
    })


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corseOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use(cors(corseOptions)); 

const PORT = process.env.PORT || 3000;

app.use("/user",userRoutes)
app.use("/company",companyRoutes)
app.use("/job",jobRoutes)
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
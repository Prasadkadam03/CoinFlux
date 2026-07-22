import { prisma } from "./lib/prisma.js";
import express from "express";
import rootRouter from "./src/index.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.listen(PORT , () => {
    console.log(`sever runing on ${PORT}`)
})

app.get("/", (req, res) => {
    res.send("Hiii coinflux");
    
});

app.use("/api/v1" ,rootRouter)
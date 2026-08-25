import express from "express";
import rootRouter from "./src/routes/index.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hiii coinflux");
});

app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log(`sever runing on ${PORT}`);
});

import express from "express";

const app = express();

const PORT = 3000;

app.listen(PORT , () => {
    console.log(`sever runing on ${PORT}`)
})

app.get("/", (req, res) => {
    res.send("Hiii coinflux");
    
});

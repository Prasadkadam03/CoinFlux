import express from "express";
import { prisma } from "../../lib/prisma.js";


const router = express.Router();

router.post("/login", (req, res) => {
    res.send("login route");
});

router.get("/login", (req, res) => {
    res.send("login route");
});

 router.post("/signup", async (req, res) => {
    const {email ,name , password} = req.body; 

    const isUserExist = await prisma.user.findUnique({
        where:{
            email : email
        }
    });

    if(isUserExist) res.send("User already exist");

    const success  = await prisma.user.create({
        data:{
            email:  email,
            name :  name,
            password :password
        }
    })


    if (!success) res.status(411).send("error");

    res.status(200).send("user created successfully");
})


export default router;
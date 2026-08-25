import express from "express";
import { prisma } from "../../../lib/prisma.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const User: any = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!User) res.status(404).send("email not registered yet!! please do signup");

  const hashpassword = await bcrypt.compare(password, User?.password);

  if (!hashpassword) res.status(411).send("password is incorrect");

  res.status(200).send("user login");
});

router.post("/signup", async (req, res) => {
  const { email, name, password } = req.body;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (isUserExist) res.send("User already exist");

  const hashpassword = await bcrypt.hash(password, 10);

  const success = await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: hashpassword,
    },
  });

  if (!success) res.status(411).send("error");

  res.status(200).send("user created successfully");
});

export default router;

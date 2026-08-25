import express from "express";
import type { Request, Response } from "express";
import { prisma } from "../../../lib/prisma.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const User: any = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    const hashpassword = await bcrypt.compare(password, User?.password);

    if (!hashpassword) return res.status(411);

    const secrete: any = process.env.JWT_SECRETE;
    const token: string = jsonwebtoken.sign({ id: User?.id }, secrete, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "User login successfull", token });
  } catch (error) {
    console.error(error);
    res.status(400).send("something went wrong!!");
  }
});

router.post("/signup", async (req: Request, res) => {
  try {
    const { email, name, password } = req.body;

    const hashpassword = await bcrypt.hash(password, 10);

    const User: any = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashpassword,
      },
    });
    const secrete: any = process.env.JWT_SECRETE;
    const token: string = jsonwebtoken.sign({ id: User?.id }, secrete, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "user created successfully", token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "something went wrong!!" });
  }
});

export default router;

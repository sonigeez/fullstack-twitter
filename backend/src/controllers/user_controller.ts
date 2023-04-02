import { Request, Response } from "express";
import prisma from "../../prisma/PrismaClient";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";

const createUser = async (req: Request, res: Response) => {
  const { name, email, username, password } = req.body;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser) {
    return res.status(400).json({
      error: "User already exists",
    });
  }
  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: email,
      username: username,
      password: await hash(password, 10),
      displayName: name,
    },
  });

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

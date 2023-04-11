import { Request, Response } from "express";
import prisma from "../../prisma/PrismaClient";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req: Request, res: Response) => {
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
      password: hashedPassword,
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

  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ message: "Signup successfully", user });
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  const valid = await compare(password, user.password);

  if (!valid) {
    return res.status(401).json({
      error: "Invalid password",
    });
  }

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
  console.log(token);

  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ message: "Login successfully", user });
};

export { signup, login };

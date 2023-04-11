import prisma from "../../prisma/PrismaClient";
import { Request, Response } from "express";

const createTweet = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content)
      return res.status(400).json({ error: "bhai kuch likh toh de" });
    const tweet = await prisma.tweet.create({
      data: {
        content: content,
        author: { connect: { id: req.user.id } },
      },
    });
    res.status(201).json({ message: "Post created successfully", tweet });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTweet = async (req, res) => {
  try {
    const tweet = await prisma.tweet.findUnique({
      where: { id: req.params.id },
      include: { author: true },
    });
    if (!tweet) return res.status(404).json({ error: "Tweet not found" });
    res.status(200).json({ tweet });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTweet = async (req: Request, res: Response) => {
  try {
    const tweet = await prisma.tweet.delete({
      where: { id: Number.parseInt(req.params.id) },
    });
    if (!tweet)
      return res
        .status(404)
        .json({
          error:
            "Well Well look who is tryin to delete tweet without creating a one",
        });
    res.status(200).json({ message: "hurrrehh deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "mai(sever) toh tut gya" });
  }
};

const allUserTweets = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;

    console.log(username);

    const author = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    const tweets = await prisma.tweet.findMany({
      where: {
        authorId: author.id,
      },
    });
    res.status(200).json({ tweets });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createTweet, getTweet, deleteTweet, allUserTweets };

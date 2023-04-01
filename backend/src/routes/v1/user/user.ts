import express  from "express";
import { createTweet, getTweet, deleteTweet, allTweets } from "../../../controllers/tweet_controller";

const router = express.Router();

router.get('/', allTweets);
router.post('/tweet', createTweet);
router.get('/tweet/:id', getTweet);
router.delete('/tweet/:id', deleteTweet);

export default router;
import express  from "express";
import { createTweet, getTweet, deleteTweet, allUserTweets } from "../../../controllers/tweet_controller";

const router = express.Router();

router.get('/:username', (req, res) => {
    console.log(req.params);
    res.send(JSON.stringify({ message: "Hello from tweet route" }));
});
router.post('/tweet', createTweet);
router.get('/tweet/:id', getTweet);
router.delete('/tweet/:id', deleteTweet);

export default router;
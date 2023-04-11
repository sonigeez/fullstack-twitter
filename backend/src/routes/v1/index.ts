import express from 'express';

import {authenticate} from '../../middlewares/auth'
import {signup, login} from '../../controllers/user_controller'
import userRoute from './user/user';
const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.post('/follow', authenticate,(req, res) => {
    res.send("sdvsd");
});
router.post('/unfollow',authenticate, (req, res) => {});
router.get('/followings', authenticate,(req, res) => {});
router.get('/followers',authenticate, (req, res) => {});
router.get('/feed', authenticate,(req, res) => {});
router.post('/like', authenticate,(req, res) => {
    console.log("sdvsd");
});
router.use('/user/',authenticate, userRoute);

export default router;
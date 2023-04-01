import express from 'express';

import {authenticate} from '../../middlewares/auth'

const router = express.Router();



router.post('/signup', (req, res) => {});
router.post('/login', (req, res) => {});
router.post('/follow', authenticate,(req, res) => {});
router.post('/unfollow',authenticate, (req, res) => {});
router.get('/followings', authenticate,(req, res) => {});
router.get('/followers',authenticate, (req, res) => {});
router.get('/feed', authenticate,(req, res) => {});
router.post('/like', authenticate,(req, res) => {
    console.log("sdvsd");
});
router.get('/:username',authenticate, (req, res) => {
    console.log(req.params.username);
});




export default router;
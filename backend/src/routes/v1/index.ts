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
router.post('/like', authenticate,(req, res) => {});
router.post('/:username',authenticate, (req, res) => {});




export default router;
import express from 'express';
import { commentPost, createPost, getPost, likePost } from '../controllers/post.controller.js';

const router = express.Router();

router.get('/getpost', getPost);
router.post('/create', createPost);
router.put('/like/:id', likePost);
router.post('/comment/:postId', commentPost)


export default router;
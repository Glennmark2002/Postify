import Post from "../models/post.model.js";
import Comment from '../models/comment.model.js';

export const createPost = async (req, res) => {

  const newPost = new Post(req.body);

  try {
    
    await newPost.save();
    res.status(200).json('Post Created');
    
  } catch (error) {
    res.status(500).json(error);  
  }
}

export const getPost = async (req, res) => {

  try {
       
    const posts = await Post.find().populate('userId', 'username picture')
    .populate({
      path: 'comments',
      populate: {
        path: 'userId',
        select : 'username picture'
      }
    }).sort({ createdAt: -1 });

    res.status(200).json(posts);

  } catch (error) {
    res.status(500).json(error); 
  }
}

export const likePost = async (req, res) => {
  const { id } = req.params; 
  const { userId } = req.body;

  try {
   
    const post = await Post.findById(id);
    
    if(!post) return res.status(401).send('Post not found!');

    if(post.likes.includes(userId)) {
      post.likes = post.likes.filter(like => like !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({ likes : post.likes });

  } catch (error) {
    res.status(500).json({ message : error.message });
  }
}

export const commentPost = async (req, res) => {

  const { userId, text } = req.body;
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if(!post) return res.status(500).json('Post not found!');

    const newComment = new Comment({ userId, postId, text});

    await newComment.save();
    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json(newComment);

  } catch (error) {
    res.status(500).json(error);
  }
}


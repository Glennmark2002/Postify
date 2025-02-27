import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema(
  
  {
    userId : { type : mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: String, 
    description : String, 
    likes : [],
    comments: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Comment' } ]
  },  
  { 
    timestamps: true
  } 
);

const Post = mongoose.model('Post', postSchema);
export default Post;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true},   
    email   : { type: String, unique: true, required: true},  
    password: { type: String, required: true},  
    picture : { type: String, default: 'https://i.fbcd.co/products/original/mp-f16cfdafe8760f161da6984c0b1aaa84f715931c2333b4c3206f87d408ee27d0.jpg'}
  });

const User = mongoose.model('User', userSchema);
export default User;
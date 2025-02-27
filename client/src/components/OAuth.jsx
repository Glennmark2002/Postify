import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../utils/firebase';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signInSuccess } from '../redux/user/userSlice';

function OAuth() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {

    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider);

    const res = await axios.post('https://postify-api-glennmark.vercel.app/api/auth/google', {
      name  : result.user.displayName,
      email : result.user.email, 
      photo : result.user.photoURL
    });
    
    dispatch(signInSuccess(res.data));
    navigate('/user');
  }

  return <Button text='Continue with Google' type='button' onClick={handleClick} />
}

export default OAuth;

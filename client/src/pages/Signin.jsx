import Input from "../components/Input";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import axios from 'axios';
import OAuth from "../components/OAuth";

function Signin() {

  const [formData, setFormData] = useState([]);
  const { loading, error } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({...formData, [e.target.id] : e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      dispatch(signInStart());
      const res = await axios.post('https://postify-api-glennmark.vercel.app/api/auth/signin', formData);
      dispatch(signInSuccess(res.data));
      navigate('/');

    } catch (error) {
      dispatch(signInFailure(error.response.data));
    }
  }

  return (
    <div className='max-h-screen h-screen flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='max-w-lg p-4 flex flex-col items-center gap-4 w-full'>
				<h1 className='text-4xl font-bold'> SIGN IN</h1>
				<Input type='email'    placeholder='Email'    id='email'    onChange={handleChange} />
				<Input type='password' placeholder='Password' id='password' onChange={handleChange} />
				<Button text={loading ? <Loading /> : 'Sign-in'} />
        <OAuth />
				<div className="pl-2 flex max-w-sm w-full gap-2">
					<p> Don't have account? - </p>
					<Link to='/sign-up' className='text-blue-500'> Sign up </Link>
				</div>
				<p className='text-center text-red-600'>{error ? error.message || 'Somehing went wrong' : ''}</p>
			</form>
    </div>
  );
}

export default Signin;

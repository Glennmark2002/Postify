import { useState } from "react";
import Input from "../components/Input";
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OAuth from "../components/OAuth";

function Signup() {

  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({...formData, [e.target.id] : e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post('http://localhost:3000/api/auth/signup', formData);

    if (res.success === false) return

    navigate('/sign-in')

  }

  return (
    <div className='max-h-screen h-screen flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='max-w-lg p-4 flex flex-col items-center gap-4 w-full'>
        <h1 className='text-4xl font-extrabold'> SIGN UP </h1>
        <Input type='text'     placeholder='Username'         id='username'        onChange={handleChange} />
        <Input type='email'    placeholder='Email'            id='email'           onChange={handleChange} />
        <Input type='password' placeholder='Password'         id='password'        onChange={handleChange} />
        <Input type='password' placeholder='Confirm Password' id='confirmPassword' onChange={handleChange} />
        <Button text='Create' />
        <OAuth />
        <div className='flex pl-2 max-w-sm w-full gap-2'>
          <p>Have an account ?</p>
          <Link to='/sign-in' className='text-blue-500'> Sign-in </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;

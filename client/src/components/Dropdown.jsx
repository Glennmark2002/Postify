import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signOut, signOutStart } from "../redux/user/userSlice";
import axios from 'axios';

function Dropdown({ currentUser }) {

  const dispatch = useDispatch();

  const handleSignout = async (e) => {
    try {
      dispatch(signOutStart())
      await axios.get('https://postify-api-glennmark.vercel.app/api/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='dropdown dropdown-end'>
      { currentUser ? 
        ( <div>
            <img src={currentUser.data.picture} tabIndex={0} className='btn btn-circle avatar'  /> 
            <ul tabIndex={0} className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'>
              <li><a onClick={handleSignout}>Logout</a></li>
            </ul>
          </div> 
        ) : 
        <Link to='/sign-in' className='btn btn-neutral text-sm'> Sign-in </Link>
      }
    </div>
  );
}

export default Dropdown;

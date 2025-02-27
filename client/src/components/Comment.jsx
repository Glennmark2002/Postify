import { useState } from 'react'; 
import axios from 'axios';

function Comment({ post, currentUser, fetchData }) {

  const [text, setText] = useState('');
  const handleChange = (e) => setText(e.target.value);
  
  const handleTextInput = async (e) => {

    await axios.post(`https://postify-api-glennmark.vercel.app/api/post/comment/${post._id}`, { text, userId : currentUser.data._id });

    setText('');
    let textArea = document.getElementById(post._id);
    textArea.value = '';

    fetchData();
  }

  return (
    <div>
      <textarea id={post._id} placeholder='Write a comment' onChange={handleChange} className='textarea textarea-bordered textarea-lg focus:outline-none w-full text-sm md:text-base' ></textarea>
      <button onClick={handleTextInput} className='btn btn-ghost float-end'>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      </button>
    </div>
  );
}

export default Comment;

import { useState } from "react";
import { useSelector } from 'react-redux';
import supabase from "../utils/supabase";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

function PostModal() {

  const {currentUser} = useSelector(state => state.user); 
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const handleMessageChange = (e) => setDescription(e.target.value);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    setForm(file);
    if (file) {
      setImage(URL.createObjectURL(file)); 
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if(!image && !description) return;

    try {
      
      const { data } = await supabase.storage.from('images').upload(uuidv4(), form);
      
      await axios.post('https://postify-api-glennmark.vercel.app/api/post/create', {
        userId : currentUser.data._id,
        image  : `https://blgpvzowtizslguqdryo.supabase.co/storage/v1/object/public/images/${data.path}`, 
        description
      });

      setImage(null);
      setDescription('');

      document.getElementById("modal").close();

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <dialog id='modal' className={`modal z-50` }>
      <div className='modal-box w-11/12 max-w-2xl'>
        <div className='mb-4'>
          <h3 className="font-bold text-center text-lg">Create Post</h3>
          <form method="dialog">
            <button className='btn btn-ghost rounded-full absolute right-2 top-2 '> 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>  
            </button>
          </form>
        </div>
        <form onSubmit={handleUpload}>
          <textarea onChange={handleMessageChange} id='description' placeholder={`What's on your mind`} className='textarea textarea-bordered textarea-lg h-40 focus:outline-none w-full text-sm md:text-base mb-4' />
          <input id='addImage' type="file" onChange={handleImageChange} className='hidden' />
          <label htmlFor='addImage' className='btn  mb-4' > 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-image h-6 w-6"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          </label>
          
          <button className='btn w-full bg-base-300 mb-6'>  Post  </button>
          {image && <img src={image} className='h-full rounded-lg' />}
        </form>
        
      </div>
    </dialog>
  );
}

export default PostModal;
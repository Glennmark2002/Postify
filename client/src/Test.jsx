import supabase from "./utils/supabase";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import axios from 'axios';

function Test() {

  const [images, setImages] = useState([]);
  const currentUser = '67ac98596eadb2a5dfee5d43'
  
  const handleUpload = async (e) => {

    const file = e.target.files[0];

    try {

      const { data, error } = await supabase.storage.from('images').upload(uuidv4(), file);

      const res = await axios.post('http://localhost:3000/api/post/create', {
        userId : currentUser,
        image : `https://blgpvzowtizslguqdryo.supabase.co/storage/v1/object/public/images/${data.path}`,
        description : "Fav ICon"
      });

    console.log(res.data);
      
    } catch (error) {
      console.log(error);
    }
    

  } 
  
  const handleRetrieve = async () => {
    
    const { data } = await supabase.storage.from('images').list('');

    setImages(data)

  };

  useEffect(() => {

    const fetchData = async () => {

      const res = await  axios.get('http://localhost:3000/api/post/getpost');
      console.log(res.data)
      setImages(res.data);
    }
    
    fetchData()

  }, []);
  

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      <button onClick={handleRetrieve}> retrieve </button>  
      <div>
        {images.map((image, index) => <img key={index} src={image.image} className='w-40 h-auto  '/>)}
        {images.map((image, index) => <p key={index}> {image.description} </p>)}
      </div>
    
    </div>
  );
}

export default Test;

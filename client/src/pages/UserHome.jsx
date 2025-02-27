import { useEffect, useState, Suspense } from "react";
import axios from 'axios';
import Post from "../components/Post";
import Splash from "../components/Splash";

function UserHome() {

  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    const res = await axios.get('https://postify-api-glennmark.vercel.app/api/post/getpost');
    setPosts(res.data);
  }

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='max-w-sm w-full md:max-w-xl'>
      <Suspense fallback={ <Splash /> } >
        {posts.map(post => <Post key={post._id} post={post} fetchData={fetchData} />)}
      </Suspense>
    </div>
  );
}

export default UserHome;

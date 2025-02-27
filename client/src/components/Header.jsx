import { useSelector } from 'react-redux'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Theme from "./Theme";
import Dropdown from "./Dropdown";
import Splash from "./Splash";
import SidebarButton from './SidebarButton';
import Sidebar from './Sidebar';
import PostModal from './PostModal';

function Header() {

  const { currentUser, loading } = useSelector(state => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () =>  setSidebarOpen(prev => !prev)
  const togglePostModal = () => document.getElementById('modal').showModal();

  return (
    <>
      <div className='navbar bg-base-100 fixed border-2 border-base-200'>

        <div className='navbar-start'>
          {currentUser && <SidebarButton toggleSidebar={toggleSidebar} />}
          <Link to='' className='btn btn-ghost text-2xl font-bold'> Postify </Link>
        </div>
        
        <div className='navbar-center hidden lg:flex'>
          {currentUser && <button onClick={togglePostModal} className='btn btn-ghost'> Post Something </button> }
        </div>

        <div className='navbar-end'>
          <Theme />
          <Dropdown currentUser={currentUser} />
        </div>

      </div>
      { loading && <Splash />}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <PostModal />
    </>
  );
}

export default Header;

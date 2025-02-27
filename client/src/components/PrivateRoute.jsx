import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {

  const { currentUser } = useSelector(state => state.user);

  return (
    <div className='h-auto min-h-screen pt-20 px-4 bg-base-200 flex justify-center'>
      { currentUser ? <Outlet /> : <Navigate to='sign-in' /> }
    </div>
  );
}

export default PrivateRoute;
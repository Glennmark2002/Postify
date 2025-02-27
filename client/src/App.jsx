import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import UserHome from './pages/UserHome';
import PrivateRoute from './components/PrivateRoute';
import { useSelector } from 'react-redux';
import Header from './components/Header';

function App() {

  const { currentUser } = useSelector(state => state.user);
  return (
    <BrowserRouter>   
      <Header />
      <Routes>
        <Route path='/'        element={ currentUser ? <Navigate to='/user' /> : < Signin /> } />
        <Route path='/sign-up' element={ currentUser ? <Navigate to='/user' /> : < Signup /> } />
        <Route path='/sign-in' element={ currentUser ? <Navigate to='/user' /> : < Signin /> } />
        <Route element={ <PrivateRoute /> }>
          <Route path='/user' element={ <UserHome /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

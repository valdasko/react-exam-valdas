import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Shops from './pages/Shops';
import AddShop from './pages/AddShop';
import { useAuthCtx } from './store/AuthProvider';
import { Toaster } from 'react-hot-toast';

function App() {
  const { isLoggedIn } = useAuthCtx();
  return (
    <div className='App'>
      <Header />
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/login'
          element={
            <>
              {!isLoggedIn && <Login />}
              {isLoggedIn && <Navigate to={'/shops'} />}
            </>
          }
        />
        <Route path='/register' element={<Register />} />

        <Route
          path='/shops'
          element={
            <>
              {isLoggedIn && <Shops />}
              {!isLoggedIn && <Navigate to={'/login'} />}
            </>
          }
        />
        <Route
          path='/addshop'
          element={
            <>
              {isLoggedIn && <AddShop />}
              {!isLoggedIn && <Navigate to={'/login'} />}
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

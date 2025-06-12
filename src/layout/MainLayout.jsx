// src/layout/MainLayout.jsx
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import { useEffect } from 'react';
import axios from 'axios';
const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/signup') return;

    axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/check-exist`, {
      withCredentials: true,
    })
      .then(res => {
        if (!res.data.loggedIn) {
          localStorage.removeItem('userId');
          navigate('/login', { replace: true });
        }
      })
      .catch(err => {
        console.log(err);
        navigate('/login', { replace: true });
      });
  }, [location.pathname]);
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This renders child routes */}
      </main>
    </>
  );
};

export default MainLayout;

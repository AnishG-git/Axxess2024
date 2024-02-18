import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function Logout() {
  const navigate = useNavigate();
  // Add your component logic here
  useEffect(() => {
    // axios
      // .get('http://127.0.0.1:8000/api/logout/', {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Token ${Cookies.get('token')}`,
      //   },
      // })
      // .then(response => {
      //   console.log(response.data);
      //   localStorage.removeItem('token');
      //   navigate('/');
      // })
      // .catch(error => {
      //   console.error(error);
      // });
      Cookies.remove('token');
      navigate('/');
  }, []);

  return <div>Logging out...</div>;
}

export default Logout;

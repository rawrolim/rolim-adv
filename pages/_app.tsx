import { ToastContainer } from 'react-toastify';
import '../styles/globals.css'
import '../styles/navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import HeaderComponent from '../components/header';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js");
  }, []);

  return (
    <>
      <ToastContainer />
      <HeaderComponent />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

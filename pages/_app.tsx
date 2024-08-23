import { ToastContainer } from 'react-toastify';
import '../styles/globals.css'
import '../styles/navbar.css'
import '../styles/footer.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import HeaderComponent from '../components/header';
import FooterComponent from '../components/FooterComponent';
import useLocalStorage from '../hooks/useLocalStorage';
import { useRouter } from 'next/router';
import http from '../config/http';

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useLocalStorage('authorization', '');
  const [userData, setUserData] = useLocalStorage('user_data', '');
  const router = useRouter();

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js");
  }, []);

  return (
    <>
      <ToastContainer position='bottom-right' />
      <HeaderComponent />
      <div className='mt-5 pt-5' style={{minHeight: '65vh'}}>
        <Component {...pageProps} />
      </div>
      <FooterComponent />
    </>
  )
}

export default MyApp

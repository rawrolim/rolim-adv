import Head from 'next/head'
import LoginPage from './LoginPage'
import pdfHipo from './pdf';
import http from '../config/http'
import useLoacalStorage from '../hooks/useLocalStorage';
import { useEffect } from 'react';

export default function Home() {
  const [token, setToken] = useLoacalStorage('authorization','')

  useEffect(()=>{
    setToken("")
  },[])

  const logar = async () => {
    const res = await http.post("/api/login", {
      username: "admin",
      password: "admin"
    });
    setToken(res.jwtToken)
  }

  const testAuth = async () => {
    await http.get('/api/test');
  }

  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <a href='./LoginPage'>Login</a>
        INDEX
        <br />
        <button onClick={logar}>Logar</button>
        <button onClick={testAuth}>Test auth</button>
        <button onClick={() => pdfHipo(3607)}>Generate Hipo</button>
      </main>
    </div>
  )
}

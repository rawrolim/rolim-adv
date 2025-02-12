import Head from 'next/head'
import { useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import http from '../config/http'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import styles from '../styles/LoginPage.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [token, setToken] = useLocalStorage('authorization', '')
  const [userData, setUserData] = useLocalStorage('user_data', '')
  const router = useRouter();

  useEffect(() => {
    setToken("")
  }, [])

  const login = async () => {
    try {
      const res = await http.post("/api/login", {
        username,
        password
      });
      setToken(res.jwtToken);
      setUserData(res.jwtData);
      toast.success("Usuário logado com sucesso");
      if(res.jwtData.user_first_access){
        router.push("/senha/novo")
      }else{
        router.push("/clientes")
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div >
      <main className='container-fluid'>
        <div className={`${styles.inputGroup} shadow col-11 col-sm-10 col-md-8 col-lg-4`}>
          <div className='col-12 d-flex'>
            <h3 className={/*styles.LoginTitle*/ ' align-self-center col-6 text-white p-2 pt-3 text-start'}>Login</h3>
            <div className='text-end col-6 align-self-center'>
              <button className='btn text-white' onClick={()=>router.push('/')}>Voltar</button>
            </div>
          </div>
          <div className={styles.input}>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Usuario"
              maxLength={100}  // Limite de caracteres
              className={'form-control text-dark'}
              required
            />
          </div>
          <div className={styles.input}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Senha"
              className={'form-control'}
              required
            />
          </div>
          <div className='row col-12'>
            <div className='col-xs-12 col-md-6 text-start align-self-center'>
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={togglePasswordVisibility}
              />
              <label htmlFor="showPassword" className='text-white ms-2'>Mostrar Senha</label>
            </div>
            <div className='col-xs-12 col-md-6 text-end'>
              <button type="button" className={'btn btn-link'} onClick={() => router.push('/esqueciSenha')}>Esqueci a senha</button>
            </div>
          </div>
          <div className="col-12 mb-3 mt-4" >
            <div className="col-xs-12 col-md-8 col-lg-6 mx-auto" >
              <button onClick={login} className={`col-12 rounded-0 btn btn-primary ${styles.buttonSubmit}`}>Entrar</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

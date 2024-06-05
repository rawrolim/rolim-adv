import { useEffect, useState } from 'react';
import styles from '../../styles/LoginPage.module.css';
import { useRouter } from 'next/router';

export default function SenhaNova() {
    const [password, setPassword] = useState("");
    const [passwordRepit, setPasswordRepit] = useState("")
    const [userData, setUserData] = useState({
        user_id: 0,
        user_name: "",
        user_email: "",
        user_access_name: "",
        user_first_access: true,
        user_access_master: false,
        exp: 1717631199,
        iat: 1717627599,
        refreshToken: ""
    });
    const router = useRouter();

    useEffect(() => {
        const user_data = localStorage.getItem("user_data")
        if (user_data) {
            setUserData(JSON.parse(user_data));
        }
    }, []);

    console.log(userData)

    async function save() {

    }

    return (
        <div >
            <main className='container-fluid'>
                <div className={`${styles.inputGroup} shadow col-11 col-sm-10 col-md-8 col-lg-4`}>
                    <div className='col-12 d-flex'>
                        <h3 className={/*styles.LoginTitle*/ ' align-self-center col-6 text-white p-2 pt-3 text-start'}>Login</h3>
                        <div className='text-end col-6 align-self-center'>
                            <button className='btn text-white' onClick={() => router.push('/')}>Voltar</button>
                        </div>
                    </div>
                    <div>
                        {userData.user_name}
                    </div>
                    <div className={styles.input}>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder="Senha"
                            className={'form-control'}
                            required
                        />
                    </div>
                    <div className="col-12 mb-3 mt-4" >
                        <div className="col-xs-12 col-md-8 col-lg-6 mx-auto" >
                            <button onClick={save} className={`col-12 rounded-0 btn btn-primary ${styles.buttonSubmit}`}>Entrar</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

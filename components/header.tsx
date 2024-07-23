import styles from '../styles/index.module.css';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Head from 'next/head';

export default function HeaderComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const [isRouteValid, setIsRouteValid] = useState(false);
    const [token, setToken] = useLocalStorage('authorization', '');
    const [userData, setUserData] = useLocalStorage('user_data', '');
    const router = useRouter()
    const ignoredRoutes = ['/login', '/','/senha/novo'];
    const pages = ['/dashboard', '/lista_clientes', '/perfil','/lista_usuarios']

    useEffect(() => {
        if (haveToken()) {
            if (ignoredRoutes.find(r => r == router.pathname) == undefined) {
                setIsRouteValid(true);
            } else {
                setIsRouteValid(false);
            }
        } else {
            setIsRouteValid(false);
        }
    }, [router.pathname])

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    function logout() {
        setToken('');
        setUserData('');
        router.push("/");
    }

    function haveToken(){
        const tokenJSON = localStorage.getItem("authorization");

        if(tokenJSON){
            const token = JSON.parse(tokenJSON)
            if(token != "")
                return true;
        }
        return false;
    }

    function transformRoute(path=''){
        path = path.replace("/", " ")
        path = path.replace("_"," ")
        path = path.replaceAll("/"," ")
        return path
    }

    return (
        <>
            <Head>
                <title>Rolim Adv | {transformRoute(router.pathname)}</title>
                <meta name="description" content="Site de advocacia Rolim adv." />
                <link rel="icon" href="/images/logo Rolim Advocacia - Icon.png" />
            </Head>
            {isRouteValid &&
                <header style={{zIndex:'999999'}}>
                    <nav>
                        <div className={styles.logo}>
                            <img src="/images/logo Rolim Advocacia 2.png" width={140} height={70} alt="Logo" />
                        </div>

                        <div className={`nav-list ${isOpen && 'open'}`}>
                            <ul>
                                {pages && pages.map(((pageCurrent, i) => {
                                    return (
                                        <li key={'nav-' + i.toString()} className='nav-item'>
                                            <a onClick={() => router.push(pageCurrent)} className={router.pathname == pageCurrent ? 'nav-link-active' : 'nav-link'} style={{ cursor: 'pointer', textTransform: 'capitalize' }}>
                                                {pageCurrent.replace("/", "").replace("_"," ")}
                                            </a>
                                        </li>
                                    )
                                }))}
                                <li><button className='text-white' onClick={logout}>Sair</button></li>
                            </ul>
                        </div>

                        <div className='login'>
                            <button className='text-white' onClick={logout}>Sair</button>
                        </div>

                        <div className='menu' onClick={toggleMenu}>
                            <div className='hamburger-menu'>
                                <div className='bar'></div>
                                <div className='bar'></div>
                                <div className='bar'></div>
                            </div>
                        </div>
                    </nav>
                </header>
            }
        </>
    )
}
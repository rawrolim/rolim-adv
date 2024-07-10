import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
export default function FooterComponent() {
  const [isRouteValid, setIsRouteValid] = useState(false);
  const [token, setToken] = useLocalStorage('authorization', '');
  const router = useRouter()
  const ignoredRoutes = ['/LoginPage', '/','/senha/novo'];

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

  function haveToken(){
    const tokenJSON = localStorage.getItem("authorization");

    if(tokenJSON){
        const token = JSON.parse(tokenJSON)
        if(token != "")
            return true;
    }
    return false;
  }

  return (
    <>
      {isRouteValid &&
        <div>
          {/* FOOTER DA PAGINA */}
          <footer className='footer'>
            <div className='footer_historia'>
              <img src="/images/logo Rolim Advocacia 2.png" width={140} height={70} alt="Logo" />
              <p>Se você busca por um parceiro jurídico confiável e dedicado, não hesite em nos contatar. Rawlinson Rolim Advogados Associados está pronto para oferecer a assistência jurídica que você merece.</p>
            </div>

            <div className='footer_social_media'>
              <h1>Contatos</h1>
              <a href="#" className='btn btn-link'><img src="/images/instagram_icon.png" width={45} height={45} alt="Instagram_icon" />@rawlinsonrolimadvogado</a>
              <br /><br />
              <a href="#" className='btn btn-link'><img src="/images/whatsapp_icon.png" width={40} height={40} alt="Whatsapp_icon" />(22) 99965-3649
              <p>(22) 2142-6826 / (22) 99761-3980</p></a>
            </div>


            {router.pathname=="/" &&
              <div className='footer_links'>
                <h1>Links</h1>
                <a href="#inicio" className='nav-link'>Inicio</a>
                <a href="#historia" className='nav-link'>Nossa História</a>
                <a href="#adv" className='nav-link'>Advogados</a>
                <a href="#local" className='nav-link'>Como chegar</a>
                <a href="#contato" className='nav-link'>Contato</a>
              </div>
            }
          </footer>
        </div>
      }
    </>
  )
}
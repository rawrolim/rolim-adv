import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../styles/footer.module.css';
import useLocalStorage from '../hooks/useLocalStorage';

export default function FooterComponent() {
  const [isRouteValid, setIsRouteValid] = useState(false);
  const [token, setToken] = useLocalStorage('authorization', '');
  const router = useRouter()
  const ignoredRoutes = ['/LoginPage', '/'];

  useEffect(() => {
    if (token != '') {
      if (ignoredRoutes.find(r => r == router.pathname) == undefined) {
        setIsRouteValid(true);
      } else {
        setIsRouteValid(false);
      }
    } else {
      setIsRouteValid(false);
    }
  }, [router.pathname])

  return (
    <>
      {isRouteValid &&
        <div>
          {/* FOOTER DA PAGINA */}
          <footer className={styles.footer}>
            <div className={styles.footer_historia}>
              <img src="/images/logo Rolim Advocacia 2.png" width={140} height={70} alt="Logo" />
              <p>Se você busca por um parceiro jurídico confiável e dedicado, não hesite em nos contatar. Rawlinson Rolim Advogados Associados está pronto para oferecer a assistência jurídica que você merece.</p>
            </div>

            <div className={styles.footer_social_media}>
              <h1>Contatos</h1>
              <a href="#" className={styles.footerlink}><img src="/images/instagram_icon.png" width={45} height={45} alt="Instagram_icon" />@Instagram</a>
              <br /><br />
              <a href="#" className={styles.footerlink}><img src="/images/Whatsapp_icon.png" width={40} height={40} alt="Whatsapp_icon" />(99)99999-9999</a>
            </div>

            <div className={styles.footer_links}>
              <h1>Links</h1>
              <a href="#inicio" className='nav-link'>Inicio</a>
              <a href="#historia" className='nav-link'>Nossa História</a>
              <a href="#adv" className='nav-link'>Advogados</a>
              <a href="#local" className='nav-link'>Como chegar</a>
              <a href="#contato" className='nav-link'>Contato</a>
            </div>
          </footer>
        </div>
      }
    </>
  )
}
import styles from '../styles/footer.module.css';
import Image from 'next/image';

export default function FooterComponent(){
return(
    <div>
      {/* FOOTER DA PAGINA */}
      <footer className={styles.footer}>
        <div className={styles.footer_historia}>
          <Image src="/images/logo Rolim Advocacia 2.png" width={140} height={70} alt="Logo" />
          <p>Se você busca por um parceiro jurídico confiável e dedicado, não hesite em nos contatar. Rawlinson Rolim Advogados Associados está pronto para oferecer a assistência jurídica que você merece.</p>
        </div>

        <div className={styles.footer_social_media}>
          <h1>Contatos</h1>
          <a href="#" className={styles.footerlink}><Image src="/images/instagram_icon.png" width={45} height={45} alt="Instagram_icon" />@Instagram</a>
          <br/><br/>
          <a href="#" className={styles.footerlink}><Image src="/images/Whatsapp_icon.png" width={40} height={40} alt="Whatsapp_icon" />(99)99999-9999</a>
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
)
}
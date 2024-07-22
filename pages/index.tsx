import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import styles from '../styles/index.module.css';
import { useRouter } from 'next/router';
import http from '../config/http';
import { toast } from 'react-toastify';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");

  const router = useRouter()
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  async function sendContact() {
    try {
      const res = await http.post("/api/email", {
        toAddresses: ['contato@rawlinsonrolimadv.com'],
        subject: "Contato via site",
        bodyHtml: `
          Uma pessoa entrou em contato pelo site.<br>
          Nome: ${nome}<br>
          E-mail: ${email}<br>
          Telefone: ${telefone}<br>
          Texto: ${mensagem}
        `
      });
      setNome("");
      setEmail("");
      setTelefone("");
      setMensagem("");
      toast.success("Contato enviado com sucesso.");
    } catch (err) {
      toast.error(err.toString());
    }
  }

  return (
    <div>
      {/* NAVBAR (NAVEGAÇÃO) DA PAGINA */}
      <header>
        <nav>
          <div className={styles.logo}>
            <Image src="/images/logo Rolim Advocacia 2.png" width={140} height={70} alt="Logo" />
          </div>

          <div className={`nav-list ${isOpen ? 'open' : ''}`}>
            <ul>
              <li className='nav-item'><a href="#inicio" className='nav-link'>Inicio</a></li>
              <li className='nav-item'><a href="#historia" className='nav-link'>História</a></li>
              <li className='nav-item'><a href="#adv" className='nav-link'>Advogados</a></li>
              <li className='nav-item'><a href="#local" className='nav-link'>Localização</a></li>
              <li className='nav-item'><a href="#contato" className='nav-link'>Contato</a></li>
              <li><button onClick={() => router.push("/login")}>Entrar</button></li>

            </ul>
          </div>

          <div className='login'>
            <button onClick={() => router.push("/login")}>Entrar</button>
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

      <main>

        {/* INICIO */}
        <div id='inicio' style={{ backgroundImage: `url('/images/back.jpg')`, backgroundRepeat: 'no-repeat', width: '100%', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          <div className={styles.responsiveImageContainer}>
            <Image
              src="/images/logo Rolim Advocacia 2.png"
              alt="Logo"
              layout="responsive"
              width={500}
              height={400}
            />
          </div>
        </div>

        {/* HISTÓRIA */}
        <div id='historia' className={styles.Div_Principal}>
          <h1>História</h1>
          <div className='px-5'>
            <div className={styles.historia}>
              <p>Você busca por uma advocacia que entenda não só as leis, mas também a importância da proximidade e do comprometimento com seus clientes? Bem-vindo ao escritório de advocacia Rawlinson Rolim Advogados Associados, seu parceiro legal estratégico situado no coração do centro jurídico de Macaé!
                <br /><br />Localizada estrategicamente na Rua Dr. Bueno, nossa sede está a apenas 2 Km do Fórum Trabalhista e a 4 Km do Fórum da Comarca de Macaé. Essa proximidade não é apenas geográfica; é a nossa promessa de estar ao seu lado em cada passo do processo legal.
                <br /><br />Imagine uma equipe dedicada, apaixonada pela justiça e pronta para lutar pelos seus direitos. Aqui, no Rawlinson Rolim Advogados Associados, isso não é apenas uma visão - é a nossa realidade diária.
                <br /><br />Com uma vasta experiência em diversas áreas do direito, desde trabalhista até civil, estamos preparados para oferecer soluções jurídicas sob medida para as suas necessidades específicas. Não importa quão complexo seja o desafio, estamos aqui para simplificar o processo e alcançar resultados que superem suas expectativas.
                <br /><br />Não adie mais. Venha nos visitar e descubra como podemos fazer a diferença em seu caso legal. Rawlinson Rolim Advogados Associados: onde expertise encontra compromisso.
                <br /><br/>Localização: Rua Dr. Bueno, N°148 - 303, Centro - Macaé</p>
              <Image src="/images/bglaw.jpg" width={300} height={200} alt="Foto da História" />
            </div>
          </div>
        </div>

        {/* ADVOGADOS */}
        <div id='adv' className={styles.Div_Principal}>
      <h1>Advogados</h1>

      <div className='px-5'>
        <div className={styles.advogado} style={{ marginTop: '4rem' }}>
          <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#advogado1Modal">
            <Image src="/images/example.png" width={200} height={200} alt="Foto do Advogado" />
          </button>
          <div className="informacoes">
            <h2>Rawlinson Wagner Moraes Rolim</h2>
            <p>OAB/RJ 199.654</p>
            <p>Advogado orientado ao cliente, com histórico de liderança de equipes de alto desempenho voltadas a atingir ou superar metas. Dedicado e esforçado, com determinação em entregar excelência. Agregador de times tático, com experiência em treinamento e desenvolvimento de equipes.</p>
            <h3>Experiência Profissional</h3>
            <ul>
              <li>Elaboração de renúncias a exercício de direito, recursos e petições precisos e minuciosos em nome dos clientes.</li>
              <li>Desenvolvimento de estratégias litigiosas detalhadas para cada caso.</li>
              <li>Explanação sobre o processo jurídico a cada cliente, respondendo a perguntas para reduzir preocupações.</li>
            </ul>
          </div>
        </div>

        <div className={styles.advogado}>
          <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#advogado2Modal">
            <Image src="/images/raissaadv.jpg" width={200} height={200} alt="Foto do Advogado" />
          </button>
          <div className="informacoes">
            <h2>Raissa dos Santos Bastos Rolim</h2>
            <p>OAB/RJ 259.009 OAB/SP 435.555</p>
            <p>Profissional dedicada e experiente, com uma sólida formação acadêmica e ampla trajetória profissional, Raissa é uma advogada especializada em diversas áreas do Direito, destacando-se principalmente em Direito Tributário, Direito Imobiliário, Direito Internacional e Direito Administrativo.
            Além de sua graduação em Direito pela Universidade Mackenzie-SP, obteve o título de Mestre em Direito Empresarial pela Universidade da Geórgia, nos Estados Unidos, enriquecendo ainda mais sua bagagem acadêmica e prática.</p>
            <h3>Experiência Profissional</h3>
            <ul>
              <li>Possui um histórico impressionante de assessoria a clientes. Sua expertise inclui defesas administrativas e a condução de investigações internas, áreas em que ela demonstra habilidade ímpar na defesa dos interesses de seus clientes.</li>
              <li>No âmbito do Direito do Trabalho, é reconhecida por sua participação ativa na assessoria de rotinas trabalhistas e na defesa de demandas empresariais. Ela atua tanto no contencioso trabalhista judicial quanto administrativo, lidando com casos estratégicos e de alta complexidade com dedicação e eficiência.</li>
            </ul>
          </div>
        </div>

        <div className={styles.advogado}>
          <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#advogado3Modal">
            <Image src="/images/virginio.jpeg" width={200} height={200} alt="Foto do Advogado" />
          </button>
          <div className="informacoes">
            <h2>Leonardo rosa virginio</h2>
            <p>OAB/RJ 259.009</p>
            <p>Profissional dedicada e experiente, com uma sólida formação acadêmica e ampla trajetória profissional...</p>
            <h3>Experiência Profissional</h3>
            <ul>
              <li>Possui um histórico impressionante de assessoria a clientes...</li>
              <li>No âmbito do Direito do Trabalho, é reconhecida por sua participação ativa...</li>
            </ul>
          </div>
        </div>


      </div>
    </div>

{/* Modais para cada advogado */}
<div className="modal fade" id="advogado1Modal"  aria-labelledby="advogado1ModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered"> {/* modal-lg para um modal grande */}
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="advogado1ModalLabel">Rawlinson Wagner Moraes Rolim</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className="text-center">
          <Image src="/images/example.png" width={400} height={400} alt="Foto do Advogado" className="img-fluid rounded" />
        </div>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="advogado2Modal"  aria-labelledby="advogado2ModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered ">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="advogado2ModalLabel">Raissa dos Santos Bastos Rolim</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className="text-center">
          <Image src="/images/raissaadv.jpg" width={400} height={400} alt="Foto do Advogado" className="img-fluid rounded" />
        </div>
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="advogado3Modal"  aria-labelledby="advogado3ModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered ">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="advogado3ModalLabel">Leonardo rosa virginio</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className="text-center">
          <Image src="/images/virginio.jpeg" width={400} height={400} alt="Foto do Advogado" className="img-fluid rounded" />
        </div>
      </div>
    </div>
  </div>
</div>

        {/* COMO CHEGAR */}
        <div id='local' className={styles.Div_Principal}>
          <h1>Localização</h1>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14757.358726588916!2d-41.7750479!3d-22.3785485!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96316e4b5a1d4d%3A0x6ee4a2c568dad265!2sRawlinson%20Rolim%20Advogados%20Associados!5e0!3m2!1spt-BR!2sbr!4v1717347534530!5m2!1spt-BR!2sbr" style={{ border: 0, width: '100%', height: '500px', marginTop: '1.5rem' }} loading="lazy"></iframe>
        </div>

        {/* CONTATO */}
        <div id='contato' className={styles.Div_Principal}>
          <h1 >Entre em contato</h1>
          <div className='container mx-auto' style={{
            display: 'flex',
            flexWrap: 'wrap',
            backgroundColor: '#fff',
            padding: '20px',
            boxShadow: ' 0 0 10px rgba(0, 0, 0, 0.1)',
            width: '100%',
            margin: '20px',
            marginTop: '1.3rem'
          }}>
            <div className={styles.contatoleft}>
              <h2>Endereço</h2>
              <p>Edificio Enedina, Rua Doutor Bueno, n°148 - 303, Centro - Macaé.</p>
              <p>E-mail: contato@rawlinsonrolimadv.com</p>
              <p>Telefones:</p>
              <p>(22) 99965-3649</p>
              <p>(22) 2142-6826 / (22) 99761-3980</p>
            </div>
            <div className={styles.contatoright}>
              <h2>Contato</h2>
              <form className={styles.contatoform}>
                <label className={styles.contatolabel} htmlFor="nome">Nome:</label>
                <input className={styles.contatoinput} value={nome} onChange={e => setNome(e.target.value)} type="text" id="nome" name="nome" placeholder='Digite seu nome' required />

                <label className={styles.contatolabel} htmlFor="email">Email:</label>
                <input className={styles.contatoinput} value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" name="email" placeholder='Insira seu Email' required />

                <label className={styles.contatolabel} htmlFor="telefone">Telefone:</label>
                <InputMask className={styles.contatoinput} value={telefone} onChange={e => setTelefone(e.target.value)} mask="(99) 99999-9999" maskChar={null} id="telefone" name="telefone" placeholder='(DDD) XXXXX-XXXX' required />

                <label className={styles.contatolabel} htmlFor="mensagem">Mensagem:</label>
                <textarea className={styles.contatotextarea} value={mensagem} onChange={e => setMensagem(e.target.value)} id="mensagem" name="mensagem" placeholder='Digite sua mensagem' rows={4} required></textarea>

                <button className={styles.contatobutton} type="button" onClick={sendContact}>Enviar</button>
              </form>
            </div>
          </div>
        </div>
        <div>
        </div>
      </main>
      <div>
         {/* FOOTER DA PAGINA */}
         <footer className='footer'>
        <div className='footer_historia'>
          <img src="/images/logo Rolim Advocacia 2.png" width={140} height={70} alt="Logo" />
          <p>Se você busca por um parceiro jurídico confiável e dedicado, não hesite em nos contatar. Rawlinson Rolim Advogados Associados está pronto para oferecer a assistência jurídica que você merece.</p>
        </div>

        <div className='footer_social_media'>
          <h1>Contatos</h1>
          <a href="https://www.instagram.com/rawlinsonrolimadvogado/" className="footerlink" target="_blank" rel="noopener noreferrer"><img src="/images/instagram_icon.png" width={45} height={45} alt="Instagram_icon" />@rawlinsonrolimadvogado</a>
          <br /><br />
          <a href="https://wa.me/+5522999653649" className="footerlink" target="_blank" rel="noopener noreferrer">
            <img src="/images/whatsapp_icon.png" width={40} height={40} alt="Whatsapp_icon" />
            (22) 99965-3649
          </a><br />
          <a href="https://wa.me/+552221426826" className="footerlink" target="_blank" rel="noopener noreferrer">(22) 2142-6826 </a>/<a href="https://wa.me/+5522997613980" className="footerlink" target="_blank" rel="noopener noreferrer">(22) 99761-3980</a>
        </div>

        {router.pathname == "/" &&
          <div className='footer_links'>
            <h1>Links</h1>
            <a href="#inicio" className='nav-link'>Inicio</a>
            <a href="#historia" className='nav-link'>História</a>
            <a href="#adv" className='nav-link'>Advogados</a>
            <a href="#local" className='nav-link'>Localização</a>
            <a href="#contato" className='nav-link'>Contato</a>
          </div>
        }
      </footer>
      </div>
    </div>
  );
}
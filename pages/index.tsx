import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import styles from '../styles/index.module.css';
import { useRouter } from 'next/router';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter()
  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
              <li className='nav-item'><a href="#historia" className='nav-link'>Nossa História</a></li>
              <li className='nav-item'><a href="#adv" className='nav-link'>Advogados</a></li>
              <li className='nav-item'><a href="#local" className='nav-link'>Como chegar</a></li>
              <li className='nav-item'><a href="#contato" className='nav-link'>Contato</a></li>
              <li><button onClick={()=>router.push("/login")}>Entrar</button></li>
      
            </ul>
          </div>

          <div className='login'>
            <button onClick={()=>router.push("/login")}>Entrar</button>
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
        <div id='inicio'  style={{ backgroundImage: `url('/images/back.jpg')`, backgroundRepeat: 'no-repeat', width: '100%', height: '50vh', display: 'flex',justifyContent: 'center', alignItems: 'center' }}>

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
          <h1>Historia</h1>
          <h2 style={{ fontSize: '32px',fontWeight:700,color: '#333',marginBottom: '20px',marginTop:'6rem'}}>Nossa História</h2>
          <div className={styles.historia}>
            <p>Você busca por uma advocacia que entenda não só as leis, mas também a importância da proximidade e do comprometimento com seus clientes? Bem-vindo ao escritório de advocacia Rawlinson Rolim Advogados Associados, seu parceiro legal estratégico situado no coração do centro jurídico de Macaé!
            <br /><br />Localizada estrategicamente na Rua Dr. Bueno, nossa sede está a apenas 2 Km do Fórum Trabalhista e a 4 Km do Fórum da Comarca de Macaé. Essa proximidade não é apenas geográfica; é a nossa promessa de estar ao seu lado em cada passo do processo legal.
            <br /><br />Imagine uma equipe dedicada, apaixonada pela justiça e pronta para lutar pelos seus direitos. Aqui, no Rawlinson Rolim Advogados Associados, isso não é apenas uma visão - é a nossa realidade diária.
            <br /><br />Com uma vasta experiência em diversas áreas do direito, desde trabalhista até civil, estamos preparados para oferecer soluções jurídicas sob medida para as suas necessidades específicas. Não importa quão complexo seja o desafio, estamos aqui para simplificar o processo e alcançar resultados que superem suas expectativas.
            <br /><br />Não adie mais. Venha nos visitar e descubra como podemos fazer a diferença em seu caso legal. Rawlinson Rolim Advogados Associados: onde expertise encontra compromisso.
            <br />Rua Dr. Bueno, n°148 - 303, Centro - Macaé</p>
            <Image src="/images/bglaw.jpg" width={300} height={200} alt="Foto da História" />
            </div>
            <button onClick={()=>router.push("/informacoesCliente")}>informacoes Cliente</button>
        </div>

        {/* ADVOGADOS */}
        <div id='adv' className={styles.Div_Principal}>
          <h1>Advogados</h1>

          <div className={styles.advogado} style={{marginTop:'4rem'}}>
            <Image src="/images/example.png" width={100} height={100} alt="Foto do Advogado"/>
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
            <Image src="/images/example.png" width={100} height={100} alt="Foto do Advogado" />
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
            <Image src="/images/example.png" width={100} height={100} alt="Foto do Advogado" />
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

        </div>

        {/* COMO CHEGAR */}
        <div id='local' className={styles.Div_Principal}>
          <h1>Como Chegar</h1>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14757.358726588916!2d-41.7750479!3d-22.3785485!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96316e4b5a1d4d%3A0x6ee4a2c568dad265!2sRawlinson%20Rolim%20Advogados%20Associados!5e0!3m2!1spt-BR!2sbr!4v1717347534530!5m2!1spt-BR!2sbr" style={{border:0,width:'100%' , height:'500px',marginTop:'1.5rem'}} loading="lazy"></iframe>
        </div>

        {/* CONTATO */}
        <div id='contato' className={styles.Div_Principal}>
          <h1 >Contato</h1>
          <div className='container mx-auto' style={{  display: 'flex',
                        flexWrap: 'wrap',
                        backgroundColor: '#fff',
                        padding: '20px',
                        boxShadow:' 0 0 10px rgba(0, 0, 0, 0.1)',
                        width: '100%',
                        margin: '20px',
                        marginTop:'1.3rem'
                        }}>
            <div className={styles.contatoleft}>
              <h2>Endereço</h2>
              <p>Edificio Enedina, Rua Doutor Bueno, n°148 - 303, Centro - Macaé.</p>
              <p>Email: contato@rawlinsonrolimadv.com</p>
              <p>Telefones:</p>
              <p>(22) 99965-3649</p>
              <p>(22) 2142-6826 / (22) 99761-3980</p>
            </div>
            <div className={styles.contatoright}>
              <h2>Contato</h2>
              <form className={styles.contatoform}>
                <label className={styles.contatolabel} htmlFor="nome">Nome:</label>
                <input className={styles.contatoinput} type="text" id="nome" name="nome" placeholder='Digite seu nome' required />
                
                <label className={styles.contatolabel} htmlFor="email">Email:</label>
                <input className={styles.contatoinput} type="email" id="email" name="email" placeholder='Insira seu Email' required />
                
                <label className={styles.contatolabel} htmlFor="telefone">Telefone:</label>
                <InputMask className={styles.contatoinput} mask="(99) 99999-9999" maskChar={null} id="telefone" name="telefone" placeholder='(DDD) XXXXX-XXXX' required />
                
                <label className={styles.contatolabel} htmlFor="mensagem">Mensagem:</label>
                <textarea className={styles.contatotextarea} id="mensagem" name="mensagem" placeholder='Digite sua mensagem' rows={4} required></textarea>
                
                <button className={styles.contatobutton} type="submit">Enviar</button>
              </form>
            </div>
          </div>
        </div>
        <div>
        </div>
      </main>
    </div>
  );
}
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import styles from '../../styles/formCliente.module.css';
import { useRouter } from 'next/router';
import http from '../../config/http';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (router.query.id != 'novo')
      if (Number(router.query.id))
        getClient()
  }, []);

  async function getClient() {
    const resData = await http.get(`/api/cliente/${router.query.id}`);
    setFormData(resData);
  }

  const [formData, setFormData] = useState({
    id: 0,
    nome: '',
    cpf: '',
    numero: '',
    email: '',
    endereco: '',
    endereco_num: '',
    endereco_complemento: '',
    cep: '',
    rg: '',
    orgao: '',
    nome_mae: '',
    nome_pai: '',
    estado_civil: '',
    sexo: '',
    data_nascimento: '',
    profissao: '',
    cnh: ''
  });

  const [focused, setFocused] = useState<{ [key: string]: boolean }>({});

  const placeholders: { [key: string]: string } = {
    nome: 'Digite seu nome',
    cpf: 'Digite seu CPF',
    numero: 'Digite seu número',
    email: 'Digite seu email',
    endereco: 'Digite seu endereço',
    endereco_num: 'Digite o número do endereço',
    endereco_complemento: 'Digite o complemento do endereço',
    cep: 'Digite seu CEP',
    rg: 'Digite seu RG',
    orgao: 'Digite o órgão emissor',
    nome_mae: 'Digite o nome da mãe',
    nome_pai: 'Digite o nome do pai',
    estado_civil: 'Digite seu estado civil',
    sexo: 'Digite seu sexo',
    data_nascimento: 'Digite sua data de nascimento',
    profissao: 'Digite sua profissão',
    cnh: 'Digite sua CNH'
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFocus = (id: string) => {
    setFocused({ ...focused, [id]: true });
  };

  const handleBlur = (id: string) => {
    setFocused({ ...focused, [id]: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try{
      e.preventDefault()
      const res = await http.post('/api/cliente/', formData);
      router.push("/lista_clientes")
    }catch(err){
      console.error(err)
    }
  };

  return (
    <div>
      <main className={styles.main}>

        <div className={styles.conteudoform}>
          <button className={styles.buttonVoltar} onClick={() => router.push('/lista_clientes')}>Voltar</button>
          <h2 className={styles.h2}>Formulário de Cliente</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            {Object.entries(formData).map(([key, value]) => (
              <div className={styles.formGroup} key={key}>
                <InputMask
                  mask={key === 'cpf' ? '999.999.999-99' : key === 'cep' ? '99999-999' : ''}
                  value={value}
                  onChange={handleChange}
                  id={key}
                  placeholder={focused[key] ? placeholders[key] : ''}
                  onFocus={() => handleFocus(key)}
                  onBlur={() => handleBlur(key)}
                  type={key === 'data_nascimento' ? 'date' : 'text'}
                  required={['nome', 'cpf', 'email', 'rg', 'orgao'].includes(key)}
                  readOnly={['id'].includes(key)}
                />
                <label htmlFor={key}>{key.replace(/_/g, ' ').toUpperCase()} {['nome', 'cpf', 'email', 'rg', 'orgao'].includes(key) && '*'}</label>
              </div>
            ))}
            <button className={styles.button} type={'submit'}>Cadastrar</button>
          </form>
        </div>
      </main>
    </div>
  );
}
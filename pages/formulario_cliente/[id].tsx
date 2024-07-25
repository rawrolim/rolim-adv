import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import styles from '../../styles/formCliente.module.css';
import { useRouter } from 'next/router';
import http from '../../config/http';
import { Toast } from 'react-toastify/dist/components';

const initialFormData = {
  id: 0,
  nome: '',
  cpf: '',
  email: '',
  numero: '',
  endereco: '',
  endereco_num: '',
  endereco_complemento: '',
  cep: '',
  rg: '',
  orgao: '',
  nome_mae: '',
  nome_pai: '',
  estado_civil: 0,
  sexo: 0,
  data_nascimento: '',
  profissao: '',
  cnh: ''
};

export default function FormularioCliente() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const [enderecoAutomatico, setEnderecoAutomatico] = useState('');

  useEffect(() => {
    if (router.query.id !== 'novo' && Number(router.query.id)) {
      getClient();
    }
  }, [router.query.id]);

  async function getClient() {
    try {
      const resData = await http.get(`/api/cliente/${router.query.id}`);
      setFormData(resData);
    } catch (error) {
      console.error('Erro ao obter cliente:', error);
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
      if (id === 'data_nascimento') {
        const date = new Date(value);
        const formattedDate = date.toISOString().substring(0, 10);
        setFormData({ ...formData, [id]: formattedDate });
      } else {
        setFormData({ ...formData, [id]: value });
        console.error('Data de nascimento inválida');
      }
    if (id === 'cep' && value.length === 9) {
      getAddressFromCEP(value);
    }
  };

  const getAddressFromCEP = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        const { logradouro, complemento, bairro, localidade, uf } = data;
        const endereco = `${logradouro}, ${complemento} - ${bairro}, ${localidade} - ${uf}`;
        setEnderecoAutomatico(endereco);
        setFormData({
          ...formData,
          endereco: `${logradouro}, ${complemento} - ${bairro}, ${localidade} - ${uf}`,
          endereco_complemento: complemento,
          endereco_num: '',
        });
      }
    } catch (error) {
      console.error('Erro ao buscar endereço pelo CEP:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.id === 0) {
        await http.post('/api/cliente/', formData);
      } else {
        await http.put(`/api/cliente/${formData.id}`, formData);
      }
      router.push('/lista_clientes');
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  const renderInputField = (id, label, type = 'text', mask = null, placeholder = '', required = false, select = false) => {
    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
        {select ? (
          <select
            className="form-select"
            id={id}
            value={formData[id]}
            onChange={handleChange}
            required={required}
          >
            {id === 'sexo' ? (
              <>
                <option value="">Selecione o Sexo</option>
                <option value="1">Masculino</option>
                <option value="2">Feminino</option>
                <option value="3">Prefiro não informar</option>
              </>
            ) : id === 'estado_civil' ? (
              <>
                <option value="">Selecione o Estado Civil</option>
                <option value="1">Solteiro(a)</option>
                <option value="2">Casado(a)</option>
                <option value="3">Divorciado(a)</option>
                <option value="4">Viúvo(a)</option>
                <option value="5">Outros(a)</option>
                <option value="6">Separado(a) Judicialmente</option>
                <option value="7">União Estável</option>
              </>
            ) : null}
          </select>
        ) : (
          mask ? (
            <InputMask
              mask={mask}
              className="form-control border-0 border-bottom"
              id={id}
              value={formData[id]}
              onChange={handleChange}
              placeholder={placeholder}
              required={required}
            />
          ) : (
            <input
              type={type}
              className="form-control border-0 border-bottom"
              id={id}
              value={formData[id]}
              onChange={handleChange}
              placeholder={placeholder}
              required={required}
            />
          )
        )}
        {id === 'cep' && enderecoAutomatico && (
          <p className="mt-2 mb-0 text-muted">Endereço: {enderecoAutomatico}</p>
        )}
      </div>
    );
  };

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.conteudoform}>
          <button className={styles.buttonVoltar} onClick={() => router.push('/lista_clientes')}>
            Voltar
          </button>
          <h2 className={styles.h2}>Formulário de Cliente</h2>
          <form onSubmit={handleSubmit} className="row g-3">
               <div className="col-md-4">
                  {renderInputField('id', 'ID')}
                </div>
                <div className="col-md-4">
                  {renderInputField('nome', 'Nome', 'text', null, 'Digite seu nome',true)}
                </div>
                <div className="col-md-4">
                  {renderInputField('cpf', 'CPF', 'text', '999.999.999-99', 'Digite seu CPF',true)}
                </div>
                <div className="col-md-4">
                  {renderInputField('email', 'Email', 'email', null, 'Digite seu email',true)}
                </div>
                <div className="col-md-4">
                  {renderInputField('rg', 'RG', 'text', '99.999.999-9', 'Digite seu RG',true)}
                </div>
                <div className="col-md-4">
                  {renderInputField('orgao', 'Órgão Emissor do RG', 'text', null, 'Digite o Órgão Emissor do RG',true)}
                </div>
                <div className="col-md-4">
                  {renderInputField('nome_mae', 'Nome da Mãe', 'text', null, 'Digite o Nome da Mãe')}
                </div>
                <div className="col-md-4">
                  {renderInputField('nome_pai', 'Nome do Pai', 'text', null, 'Digite o Nome do Pai')}
                </div>
                <div className="col-md-4">
                  {renderInputField('numero', ' Telefone', 'text','(99)99999-9999', 'Digite o Número de Telefone')}
                </div>
                <div className="col-md-4">
                  {renderInputField('cep', 'CEP', 'text','99999-999', 'Digite seu CEP')}
                </div>
                <div className="col-md-4">
                  {renderInputField('endereco', 'Endereço', 'text', null, 'Digite seu endereço')}
                </div>
                <div className="col-md-4">
                  {renderInputField('endereco_num', 'Número', 'number', null, 'Digite o Número do endereço')}
                </div>
                <div className="col-md-4">
                  {renderInputField('endereco_complemento', 'Complemento do Endereço', 'text', null, 'Digite seu Complemento do Endereço')}
                </div>
                <div className="col-md-4">
                  {renderInputField('profissao', 'Profissão', 'text', null, 'Digite sua Profissão')}
                </div>
                <div className="col-md-4">
                  {renderInputField('cnh', 'CNH', 'number', '999999999', 'Digite sua CNH')}
                </div>
                <div className="col-md-4">
                  {renderInputField('sexo', 'Sexo', 'text', null, 'Selecione o sexo', true, true)}
                </div>
                <div className="col-md-4">
                       {renderInputField('data_nascimento', 'Data de Nascimento', 'date', null, 'Digite a Data de Nascimento')}
                </div>
                <div className="col-md-4">
                  {renderInputField('estado_civil', 'Estado Civil', 'text', null, 'Selecione o estado civil', true, true)}
                </div>

            <div className="col-6 mx-auto text-center w-100">
              <button type="submit" className="btn btn-primary w-50">
                {formData.id === 0 ? 'Criar Cliente' : 'Atualizar Cliente'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
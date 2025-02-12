import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import styles from '../../styles/formCliente.module.css';
import { useRouter } from 'next/router';
import http from '../../config/http';

export default function FormularioCliente() {
  const router = useRouter();
  const [enderecoAutomatico, setEnderecoAutomatico] = useState('');
  const [enderecoEmpresaAutomatico, setEnderecoEmpresaAutomatico] = useState('');
  const [enderecoRepresentanteAutomatico, setEnderecoRepresentanteAutomatico] = useState('');
  const [tipoPessoa, setTipoPessoa] = useState('fisica');

  const initialFormData = {
    id: 0,
    tp_pessoa:'',
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
    cnh: '',
    // Campos para Pessoa Jurídica
    cnpj: '',
    razao_social: '',
    inscricao_municipal: '',
    inscricao_estadual: '',
    nome_representante: '',
    cpf_representante: '',
    profissao_representante: '',
    numero_representante: '',
    email_empresa: '',
    cep_empresa: '',
    endereco_empresa: '',
    endereco_numero_empresa: '',
    endereco_complemento_empresa: '',
    estado_civil_representante: '',
    cep_representante: '',
    endereco_representante: '', 
    endereco_num_representante:'',
    endereco_complemento_representante:'',
    rg_representante:''
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (Number(router.query.id)) {
      getClient();
    }
  }, [router.query.id]);

  useEffect(() => {
    if (formData.id === 0) {
      setFormData(prevFormData => ({
        ...prevFormData,
        tp_pessoa: tipoPessoa
      }));
    }
  }, [tipoPessoa]);

  async function getClient() {
    try {
      const resData = await http.get(`/api/cliente/${router.query.id}`);
      setFormData(resData);
      if (resData.tp_pessoa) {
        setTipoPessoa(resData.tp_pessoa);
      }
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
    if (id === 'cep_empresa' && value.length === 9) {
      getAddressFromCEPempresa(value);
    }
    if (id === 'cep_representante' && value.length === 9) {
      getAddressFromCEPrepresentante(value);
    }
  };
  const getAddressFromCEPrepresentante = async (cep_representante) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep_representante}/json/`);
      const data = await response.json();
      if (!data.erro) {
        const { logradouro, complemento, bairro, localidade, uf } = data;
        const endereco_representante = `${logradouro}, ${complemento} - ${bairro}, ${localidade} - ${uf}`;
        setEnderecoRepresentanteAutomatico(endereco_representante);
        setFormData({
          ...formData,
          cep_representante: cep_representante,
          endereco_representante: `${logradouro}, ${complemento} - ${bairro}, ${localidade} - ${uf}`,
          endereco_complemento_representante: complemento,
          endereco_num_representante: '',
        });
      }
    } catch (error) {
      console.error('Erro ao buscar endereço pelo CEP:', error);
    }
  };

  const getAddressFromCEPempresa = async (cep_empresa) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep_empresa}/json/`);
      const data = await response.json();
      if (!data.erro) {
        const { logradouro, complemento, bairro, localidade, uf } = data;
        const endereco_empresa = `${logradouro}, ${complemento} - ${bairro}, ${localidade} - ${uf}`;
        setEnderecoEmpresaAutomatico(endereco_empresa);
        setFormData({
          ...formData,
          cep_empresa: cep_empresa,
          endereco_empresa: `${logradouro}, ${complemento} - ${bairro}, ${localidade} - ${uf}`,
          endereco_complemento_empresa: complemento,
          endereco_numero_empresa: '',
        });
      }
    } catch (error) {
      console.error('Erro ao buscar endereço pelo CEP:', error);
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
          cep: cep,
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
      router.push('/clientes');
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  const handleTipoPessoaChange = (tipo) => {
    setTipoPessoa(tipo);
    setFormData(prevFormData => ({
      ...prevFormData,
      tp_pessoa: tipo,
      cnpj: tipo === 'fisica' ? '' : prevFormData.cnpj,
      razao_social: tipo === 'fisica' ? '' : prevFormData.razao_social,
      inscricao_municipal: tipo === 'fisica' ? '' : prevFormData.inscricao_municipal,
      inscricao_estadual: tipo === 'fisica' ? '' : prevFormData.inscricao_estadual,
      nome_representante: tipo === 'fisica' ? '' : prevFormData.nome_representante,
      cpf_representante: tipo === 'fisica' ? '' : prevFormData.cpf_representante,
      profissao_representante: tipo === 'fisica' ? '' : prevFormData.profissao_representante,
      numero_representante: tipo === 'fisica' ? '' : prevFormData.numero_representante,
      email_empresa: tipo === 'fisica' ? '' : prevFormData.email_empresa,
      cep_representante: tipo === 'fisica' ? '' : prevFormData.cep_representante,
      endereco_representante: tipo === 'fisica' ? '' : prevFormData.endereco_representante,
      endereco_num_representante: tipo === 'fisica' ? '' : prevFormData.endereco_num_representante,
      endereco_complemento_representante: tipo === 'fisica' ? '' : prevFormData.endereco_complemento_representante,
      cep_empresa: tipo === 'fisica' ? '' : prevFormData.cep_empresa,
      rg_representante: tipo ==='fisica'?'':prevFormData.rg_representante,
      estado_civil_representante: tipo === 'fisica' ? '': prevFormData.estado_civil_representante,
      endereco_empresa: tipo === 'fisica' ? '' : prevFormData.endereco_empresa,
      endereco_numero_empresa: tipo === 'fisica' ? '' : prevFormData.endereco_numero_empresa,
      endereco_complemento_empresa: tipo === 'fisica' ? '' : prevFormData.endereco_complemento_empresa,
    }));
  };
  const renderInputField = (id, label, type = 'text', mask = null, placeholder = '', required = false, select = false, disabled = false) => {
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
            disabled={disabled}
          >
            {id === 'sexo' || id === 'sexo_representante' ?(
              <>
                <option value="">Selecione o Sexo</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Não Informado">Prefiro não Informar</option>
              </>
            ) : id === 'estado_civil' || 'estado_civil_representante' ? (
              <>
                <option value="">Selecione o Estado Civil</option>
                <option value="Solteiro">Solteiro(a)</option>
                <option value="Casado">Casado(a)</option>
                <option value="Divorciado">Divorciado(a)</option>
                <option value="Viúvo">Viúvo(a)</option>
                <option value="Outros">Outros(a)</option>
                <option value="Separado">Separado(a) Judicialmente</option>
                <option value="União Estável">União Estável</option>
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
              disabled={disabled}
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
              disabled={disabled}
            />
          )
        )}
        {id === 'cep' && enderecoAutomatico && (
          <p className="mt-2 mb-0 text-muted">Endereço: {enderecoAutomatico}</p>
        )}
        {id === 'cep_empresa' && enderecoEmpresaAutomatico && (
          <p className="mt-2 mb-0 text-muted">Endereço: {enderecoEmpresaAutomatico}</p>
        )}
        {id === 'cep_representante' && enderecoRepresentanteAutomatico && (
          <p className="mt-2 mb-0 text-muted">Endereço: {enderecoRepresentanteAutomatico}</p>
        )}
      </div>
    );
  };

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.conteudoform}>
          <h2 className={styles.h2}>Formulário de Cliente</h2>
          <button className={styles.buttonVoltar} onClick={() => router.push('/clientes')}>
            Voltar
          </button>
          {formData.id === 0 && (
            <ul className="nav nav-tabs justify-content-end">
              <li className="nav-item">
                <a className={`nav-link ${tipoPessoa === 'fisica' ? 'active' : ''}`} onClick={() => handleTipoPessoaChange('fisica')}>
                  Pessoa Física
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${tipoPessoa === 'juridica' ? 'active' : ''}`} onClick={() => handleTipoPessoaChange('juridica')}>
                  Pessoa Jurídica
                </a>
              </li>
            </ul>
          )}
          {formData.id > 0 &&(
                      <ul className="nav nav-tabs justify-content-end">
                        <li className="nav-item">
                          <a>
                            Pessoa {formData.tp_pessoa}
                          </a>
                        </li>
                      </ul>

          )}
          <form onSubmit={handleSubmit} className="row g-3 mt-3">
            <div className="col-md-4">
              {renderInputField('id', 'ID')}
            </div>
            <div className="col-md-4 d-none">
              {renderInputField('tp_pessoa', 'tp_pessoa')}
            </div>
            
            {formData.tp_pessoa === 'fisica' ? (
        <>
          <div className="col-md-4">
            {renderInputField('nome', 'Nome', 'text', null, 'Digite seu nome', true)}
          </div>
          <div className="col-md-4">
            {renderInputField('cpf', 'CPF', 'text', '999.999.999-99', 'Digite seu CPF', true)}
          </div>
          <div className="col-md-4">
            {renderInputField('email', 'Email', 'email', null, 'Digite seu email', true)}
          </div>
          <div className="col-md-4">
            {renderInputField('rg', 'RG', 'text', '99.999.999-9', 'Digite seu RG', true)}
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
            {renderInputField('numero', 'Número de Telefone', 'text', '(99)99999-9999', 'Digite seu Número de Telefone')}
          </div>
          <div className="col-md-4">
            {renderInputField('cep', 'CEP', 'text', '99999-999', 'Digite seu CEP')}
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
        </>
      ) : formData.tp_pessoa === 'juridica' ? (
        <>
          <div className="col-md-4">
            {renderInputField('cnpj', 'CNPJ', 'text', '99.999.999/9999-99', 'Digite o CNPJ')}
          </div>
          <div className="col-md-4">
            {renderInputField('razao_social', 'Razão Social', 'text', null, 'Digite a Razão Social')}
          </div>
          <div className="col-md-4">
            {renderInputField('inscricao_municipal', 'Inscrição Municipal', 'text', null, 'Digite a Inscrição Municipal',true)}
          </div>
          <div className="col-md-4">
            {renderInputField('inscricao_estadual', 'Inscrição Estadual', 'text', null, 'Digite a Inscrição Estadual',true)}
          </div>
          <div className="col-md-4">
            {renderInputField('email_empresa', 'Email da Empresa', 'text', null, 'Digite o Email da empresa', true)}
          </div>
          <div className="col-md-4">
            {renderInputField('cep_empresa', 'CEP da Empresa', 'text', '99999-999', 'Digite o CEP da Empresa')}
          </div>
          <div className="col-md-4">
            {renderInputField('endereco_empresa', 'Endereço da Empresa', 'text', null, 'Digite o Endereço da Empresa')}
          </div>
          <div className="col-md-4">
            {renderInputField('endereco_numero_empresa', 'Número', 'number', null, 'Digite o Número de Endereço')}
          </div>
          <div className="col-md-4">
            {renderInputField('endereco_complemento_empresa', 'Complemento do Endereço', 'text', null, 'Digite o Complemento do Endereço')}
          </div>
          <div className="col-md-4">
            {renderInputField('nome_representante', 'Nome do Representante', 'text', null, 'Digite o Nome do Representante')}
          </div>
          <div className="col-md-4">
            {renderInputField('cpf_representante', 'CPF do Representante', 'text', '999.999.999-99', 'Digite o CPF do Representante')}
          </div>
          <div className="col-md-4">
            {renderInputField('profissao_representante', 'Profissão do Representante', 'text', null, 'Digite a Profissão do Representante')}
          </div>
          <div className="col-md-4">
            {renderInputField('rg_representante', 'RG', 'text', '99.999.999-9', 'Digite seu RG', true)}
          </div>
          <div className="col-md-4">
            {renderInputField('numero_representante', 'Telefone do Representante', 'text', '(99)99999-9999', 'Digite o Telefone do Representante')}
          </div>
          <div className="col-md-4">
            {renderInputField('sexo_representante', 'Sexo', 'text', null, 'Selecione o sexo', true, true)}
          </div>
          <div className="col-md-4">
            {renderInputField('estado_civil_representante', 'Estado Civil', 'text', null, 'Selecione o estado civil', true, true)}
          </div>
          <div className="col-md-4">
            {renderInputField('cep_representante', 'CEP do Representante', 'text', '99999-999', 'Digite o CEP da Empresa')}
          </div>
          <div className="col-md-4">
            {renderInputField('endereco_representante', 'Endereço do Representante', 'text', null, 'Digite o Endereço da Empresa')}
          </div>
          <div className="col-md-4">
            {renderInputField('endereco_num_representante', 'Número', 'number', null, 'Digite o Número de Endereço')}
          </div>
          <div className="col-md-4">
            {renderInputField('endereco_complemento_representante', 'Complemento do Endereço', 'text', null, 'Digite o Complemento do Endereço')}
          </div>
        </>
      ) : null}
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
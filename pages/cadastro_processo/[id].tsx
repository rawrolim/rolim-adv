import React, { useEffect, useState } from 'react';
import http from '../../config/http';
import { useRouter } from 'next/router';
import styles from '../../styles/formCliente.module.css';
import Select from 'react-select';

export default function CadastroProceso() {
    const router = useRouter();
    const [id_advogado, setAdvogado] = useState(null);
    const [id_cliente, setCliente] = useState(null);
    const [advogadosOptions, setAdvogadosOptions] = useState([]);
    const [clientesOptions, setClientesOptions] = useState([]);

    const [formData, setFormData] = useState({
        id: 0,
        advogado: null,
        cliente_id: null,
        numero_processo: '',
        instancia: '',
        tribunal: '',
        numero_orgao: '',
        natureza: '',
        motivo: '',
        comarca: '',
        valor_causa: '',
        data_distribuicao: '',
        valor_contrato: '',
        parcelas: '',
        entrada: '',
        inicio_prestacao: ''
    });

    useEffect(() => {
        fetchAdvogadosClientes();
        if (router.query.id != 'novo')
          if (Number(router.query.id)) 
            getProcesso();
    }, []);

    async function fetchAdvogadosClientes() {
        try {
            const response = await http.get('/api/processo');
            const advogados = response.advogados.map(advogados => ({
                value: advogados.id,
                label: advogados.nome
            }));
            const clientes = response.clientes.map(clientes => ({
                value: clientes.id,
                label: clientes.nome
            }));
            setAdvogadosOptions(advogados);
            setClientesOptions(clientes);
        } catch (error) {
            console.error('Erro ao obter advogados e clientes:', error);
        }
    }

    async function getProcesso() {
        try {
            const resData = await http.get(`/api/processo/${router.query.id}`);
            setFormData(resData);
            setAdvogado({ value: resData.advogado, label: resData.nome_advogado });
            setCliente({ value: resData.cliente_id, label: resData.nome_cliente });
        } catch (error) {
            console.error('Erro ao obter o Processo:', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedFormData = {
                ...formData,
                advogado: id_advogado ? id_advogado.value : null,
                cliente_id: id_cliente ? id_cliente.value : null
            };
            if (formData.id === 0) {
                await http.post('/api/processo/', updatedFormData);
            } else {
                await http.put(`/api/processo/${formData.id}`, updatedFormData);
            }
            router.push('/processos/0');
        } catch (error) {
            console.error('Erro ao salvar o processo:', error);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSelectChange = (selectedOption, actionMeta) => {
        const { name } = actionMeta;
        if (name === 'advogado') {
            setAdvogado(selectedOption);
        } else if (name === 'cliente_id') {
            setCliente(selectedOption);
        }
    };
    const renderInputField = (id, label, type = 'text', placeholder = '', mask = null,required = false) => {
      return (
          <div className="mb-3">
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="text-danger">*</span>}
        </label>

              <input
                  type={type}
                  className="form-control border-0 border-bottom"
                  id={id}
                  value={formData[id]}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  required={type !== 'text' && type !== 'number' && type !== 'date'}
              />
          </div>
      );
  };
  return (
    <div>
        <main className={styles.main}>
            <div className={styles.conteudoform}>
                <h2 className={styles.h2}>Formulário de Processo</h2>
                <button className={styles.buttonVoltar} onClick={() => router.push('/processos/0')}>
                    Voltar
                </button>
                <form onSubmit={handleSubmit} className="row g-3 mt-3">
                    <div className="col-md-4">
                        {renderInputField('id', 'ID', 'text', '', null)}
                    </div>
                    <div className="col-md-4">
                        <div className="mb-3">
                            <label htmlFor="advogado" className="form-label">
                                Advogado *
                            </label>
                            <Select
                                id="advogado"
                                name="advogado"
                                value={id_advogado}
                                onChange={handleSelectChange}
                                options={advogadosOptions}
                                placeholder="Selecione o Advogado"
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="mb-3">
                            <label htmlFor="cliente_id" className="form-label">
                                Cliente *
                            </label>
                            <Select
                                id="cliente_id"
                                name="cliente_id"
                                value={id_cliente}
                                onChange={handleSelectChange}
                                options={clientesOptions}
                                placeholder="Selecione o Cliente"
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        {renderInputField('numero_processo', 'Número do Processo','number','Digite  o número do Processo',null,true)}
                    </div>
                    <div className="col-md-4">
                        {renderInputField('instancia', 'Instância','text','Digite a Instância')}
                    </div>
                    <div className="col-md-4">
                        {renderInputField('tribunal', 'Tribunal','text','Digite o Tribunal')}
                    </div>
                    <div className="col-md-4">
                        {renderInputField('numero_orgao', 'Número do Órgão','text','Digite o numero do Orgão')}
                    </div>
                    <div className="col-md-4">
                        {renderInputField('natureza', 'Natureza','text','Digite a Natureza',null,true)}
                    </div>
                    <div className="col-md-4">
                        {renderInputField('motivo', 'Motivo','text','Digite o Motivo',null,true)}
                    </div>
                    <div className="col-md-4">
                        {renderInputField('comarca', 'Comarca','text','Digite a Comarca',null,true)}
                    </div>
                    <div className="col-md-4">
                        {renderInputField('valor_causa', 'Valor da Causa', 'number', '0')}
                    </div>
                    <div className="col-md-4">
                        {renderInputField('data_distribuicao', 'Data de Distribuição', 'date')}
                    </div>
                    <div className="col-md-4">
                        {renderInputField('valor_contrato', 'Valor do Contrato', 'number', '0')}
                    </div>
                    <div className="col-md-4">
                        {renderInputField('parcelas', 'Parcelas', 'number', '0')}
                    </div>
                    <div className="col-md-4">
                        {renderInputField('entrada', 'Entrada', 'number', '0')}
                    </div>
                    <div className="col-md-4">
                        {renderInputField('inicio_prestacao', 'Início da Prestação', 'date')}
                    </div>
                    <div className="col-6 mx-auto text-center w-100">
                        <button type="submit" className="btn btn-primary w-50">
                            {formData.id === 0 ? 'Criar Processo' : 'Atualizar Processo'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </div>
);}
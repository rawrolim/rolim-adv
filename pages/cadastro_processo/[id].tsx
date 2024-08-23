import React, { useEffect, useState } from 'react';
import http from '../../config/http';
import { useRouter } from 'next/router';
import styles from '../../styles/formCliente.module.css';
import SelectSearch from '../../components/SelectSearch';
import InputField from '../../components/inputField';

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
                            <InputField id='id' label='ID' type='text' value={formData['id']} />
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label htmlFor="advogado" className="form-label">
                                    Advogado *
                                </label>
                                <SelectSearch
                                    value={id_advogado}
                                    onChange={setAdvogado}
                                    options={advogadosOptions}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label htmlFor="cliente_id" className="form-label">
                                    Cliente *
                                </label>
                                <SelectSearch
                                    value={id_cliente}
                                    onChange={setCliente}
                                    options={clientesOptions}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['numero_processo']} id='numero_processo' label='Número do Processo' type='text' placeholder='Digite  o número do Processo' required={true} />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['instancia']} id='instancia' label='Instância' type='text' placeholder='Digite a Instância' />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['tribunal']} id='tribunal' label='Tribunal' type='text' placeholder='Digite o Tribunal' />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['numero_orgao']} id='numero_orgao' label='Número do Órgão' type='text' placeholder='Digite o numero do Orgão' />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['natureza']} id='natureza' label='Natureza' type='text' placeholder='Digite a Natureza' required={true} />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['motivo']} id='motivo' label='Motivo' type='text' placeholder='Digite o Motivo' required={true} />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['comarca']} id='comarca' label='Comarca' type='text' placeholder='Digite a Comarca' required={true} />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['valor_causa']} id='valor_causa' label='Valor da Causa' type='number' />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['data_distribuicao']} id='data_distribuicao' label='Data de Distribuição' type='date' />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['valor_contrato']} id='valor_contrato' label='Valor do Contrato' type='number' />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['parcelas']} id='parcelas' label='Parcelas' type='number' />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['entrada']} id='entrada' label='Entrada' type='number' />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['inicio_prestacao']} id='inicio_prestacao' label='Início da Prestação' type='date' />
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
    );
}
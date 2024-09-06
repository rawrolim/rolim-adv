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
        inicio_prestacao: '',
        reus: [{
            nome_reu: '',
            tp_reu: 'Física',
            cpf_reu: '',
            cnpj_reu: '',
            nome_representante_reu: '',
            estado_civil_reu: '',
            rg_reu: '',
            email_reu: '',
            numero_reu: '',
            cep_reu: '',
            endereco_reu: '',
            endereco_numero_reu: '',
            endereco_complemento_reu: '',
            sexo_reu: '',
            profissao_reu: '',
            cnh_reu: ''
        }],
    });

    useEffect(() => {
        fetchAdvogadosClientes();
        if (router.query.id !== 'novo') {
            if (Number(router.query.id)) getProcesso();
        }
    }, []);

    useEffect(() => {
        formData.reus.forEach(async (reu, index) => {
            if (reu.cep_reu && reu.cep_reu.length === 8) {
                await fetchEnderecoByCep(reu.cep_reu, index);
            }
        });
    }, [formData.reus]);

    async function fetchEnderecoByCep(cep, index) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (data.erro) {
                console.error('CEP não encontrado');
                return;
            }
            setFormData(prevFormData => {
                const newReus = [...prevFormData.reus];
                newReus[index] = {
                    ...newReus[index],
                    endereco_reu: `${data.logradouro}, ${data.bairro} - ${data.localidade} - ${data.uf}`,
                    endereco_numero_reu: '',
                    endereco_complemento_reu: data.complemento || '',
                    cep_reu: data.cep,
                };
                return { ...prevFormData, reus: newReus };
            });
        } catch (error) {
            console.error('Erro ao buscar endereço pelo CEP:', error);
        }
    }

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

    const handleReuChange = (index, id, value) => {
        const newReus = [...formData.reus];
        newReus[index] = {
            ...newReus[index],
            [id]: value
        };
        setFormData({ ...formData, reus: newReus });
    };

    const addReu = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            reus: [
                ...prevFormData.reus,
                {
                    nome_reu: '',
                    tp_reu: 'Física',
                    cpf_reu: '',
                    cnpj_reu: '',
                    nome_representante_reu: '',
                    estado_civil_reu: '',
                    rg_reu: '',
                    email_reu: '',
                    numero_reu: '',
                    cep_reu: '',
                    endereco_reu: '',
                    endereco_numero_reu: '',
                    endereco_complemento_reu: '',
                    sexo_reu: '',
                    profissao_reu: '',
                    cnh_reu: ''
                }
            ]
        }));
    };

    const removeReu = (index) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            reus: prevFormData.reus.filter((_, i) => i !== index)
        }));
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
                            <InputField onChange={handleInputChange} value={formData['numero_processo']} id='numero_processo' label='Número processo' type='text' placeholder='Digite o número do processo' />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['instancia']} id='instancia' label='Instância' type='text' placeholder='Digite a instância' />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['tribunal']} id='tribunal' label='Tribunal' type='text' placeholder='Digite o tribunal' />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['numero_orgao']} id='numero_orgao' label='Número Orgão' type='text' placeholder='Digite o Número do Orgão' />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['natureza']} id='natureza' label='Natureza' type='text' placeholder='Digite a Natureza' />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['motivo']} id='motivo' label='Motivo' type='text' placeholder='Digite o Motivo' />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['comarca']} id='comarca' label='Comarca' type='text' placeholder='Digite a Comarca' />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['valor_causa']} id='valor_causa' label='Valor da Causa' type='text' placeholder='Digite o Valor da Causa' />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['data_distribuicao']} id='data_distribuicao' label='Data Distribuição' type='date' />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['valor_contrato']} id='valor_contrato' label='Valor do Contrato' type='text' placeholder='Digite o Valor do Contrato' />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['parcelas']} id='parcelas' label='Parcelas' type='number' placeholder='Digite a Quantidade de Parcelas' />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['entrada']} id='entrada' label='Entrada' type='text' placeholder='Digite o Valor de Entrada' />
                        </div>
                        <div className="col-md-4">
                            <InputField onChange={handleInputChange} value={formData['inicio_prestacao']} id='inicio_prestacao' label='Início Prestação' type='date' />
                        </div>

                        {formData.reus.map((reu, index) => (
                            <div key={index} className="col-md-12 mb-3 border border-3 p-3 rounded">
                                <div>
                                <h5>Réu Pessoa {reu.tp_reu} {index + 1}</h5>
                                    <ReuForm  reu={reu}  index={index}  onChange={handleReuChange}  onRemove={removeReu} />
                                </div>
                            </div>
                        ))}
                       <button type="button" className="btn btn-secondary w-25 mb-3" onClick={addReu}>
                                Adicionar Réu
                            </button>
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

const ReuForm = ({ reu, index, onChange, onRemove }) => {
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        onChange(index, id, value);
    };

    return (
        <div className='row g-3 mt-3'>
            <div className="col-md-4">
                <InputField id="nome_reu" label="Nome do Réu" placeholder='Digite o Nome do Reú' type="text" value={reu.nome_reu} onChange={handleInputChange}
                />
            </div>
            <div className="col-md-4">
                <label htmlFor={`tp_reu_${index}`} className="form-label">
                    Tipo de Réu
                </label>
                <select
                    id={`tp_reu_${index}`}
                    className="form-select"
                    value={reu.tp_reu}
                    onChange={(e) => onChange(index, 'tp_reu', e.target.value)}
                >
                    <option value="Física">Física</option>
                    <option value="Jurídica">Jurídica</option>
                </select>
                </div>
            {reu.tp_reu === 'Física' && (
                <>
                <div className="col-md-4">
                    <InputField id="cpf_reu" label="CPF" type="text" placeholder='Digite o CPF do Reú' value={reu.cpf_reu} onChange={handleInputChange}/>
                    </div>
                    <div className="col-md-4">
                    <InputField id="rg_reu" label="RG" type="text" placeholder='Digite o RG do Reú' value={reu.rg_reu} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-4">
                    <InputField id="cnh_reu" label="CNH" type="text" placeholder='Digite a CNH do Reú'  value={reu.cnh_reu}  onChange={handleInputChange} />
                    </div>
                </>
            )}
            {reu.tp_reu === 'Jurídica' && (
                <>
                <div className="col-md-4">
                    <InputField id="cnpj_reu" label="CNPJ" type="text" placeholder='Digite o CNPJ do Reú'  value={reu.cnpj_reu}  onChange={handleInputChange}/>
                    </div>
                    <div className="col-md-4">
                    <InputField id="nome_representante_reu" label="Nome do Representante" placeholder='Digite o Nome do Representante do Reú' type="text" value={reu.nome_representante_reu}  onChange={handleInputChange} />
                    </div>
                </>
            )}
                <div className="col-md-4">
                <InputField  id="email_reu"  label="E-mail" placeholder='Digite o email do Reú'  type="email"  value={reu.email_reu}  onChange={handleInputChange}
                />
                </div>
                <div className="col-md-4">
                <InputField  id="numero_reu"  label="Número"  type="text" placeholder='Digite o Telefone do Reú'  value={reu.numero_reu}  onChange={handleInputChange}
                />
                </div>
                <div className="col-md-4">
                <InputField  id="cep_reu"  label="CEP"  type="text" placeholder='Digite o Cep do Reú'  value={reu.cep_reu}  onChange={handleInputChange}
                />
                </div>
                <div className="col-md-4">
                <InputField  id="endereco_reu"  label="Endereço" placeholder='Digite o Endereço'  type="text"  value={reu.endereco_reu}  onChange={handleInputChange}
                />
                </div>
                <div className="col-md-4">
                <InputField id="endereco_numero_reu" label="Número" placeholder='Digite o Número do Endereço' type="text" value={reu.endereco_numero_reu} onChange={handleInputChange}
                />
                </div>
                <div className="col-md-4">
                <InputField id="endereco_complemento_reu" placeholder='Digite o complemento Endereço' label="Complemento" type="text" value={reu.endereco_complemento_reu} onChange={handleInputChange}
                />
                </div>

                <div className="col-md-4">
                <label htmlFor={`sexo_reu`} className="form-label">
                    Sexo
                </label>
                <select
                    id={`sexo_reu`}
                    className="form-select"
                    value={reu.sexo_reu}
                    onChange={(e) => onChange(index, 'sexo_reu', e.target.value)}
                >
                    <option value="">Selecione o Sexo</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Não Informado">Prefiro não Informar</option>
                </select>
                </div>

                <div className="col-md-4">
                <label htmlFor={`estado_civil_reu`} className="form-label">
                    Estado Civil
                </label>
                <select
                    id={`estado_civil_reu`}
                    className="form-select"
                    value={reu.estado_civil_reu}
                    onChange={(e) => onChange(index, 'estado_civil_reu', e.target.value)}
                >
                    <option value="">Selecione o Estado Civil</option>
                    <option value="Solteiro">Solteiro(a)</option>
                    <option value="Casado">Casado(a)</option>
                    <option value="Divorciado">Divorciado(a)</option>
                    <option value="Viúvo">Viúvo(a)</option>
                    <option value="Outros">Outros(a)</option>
                    <option value="Separado">Separado(a) Judicialmente</option>
                    <option value="União Estável">União Estável</option>
                </select>
            </div>

                <div className="col-md-4">
                <InputField id="profissao_reu" label="Profissão" placeholder='Digite a profissão' type="text" value={reu.profissao_reu} onChange={handleInputChange} />
                </div>
                <div className='w-100'>
                    <button type="button" className="btn btn-danger mb-2 w-25" onClick={() => onRemove(index)}>
                        Remover Réu
                    </button>
                </div>
        </div>
    );
};


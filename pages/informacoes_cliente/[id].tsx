import { useEffect, useState } from 'react';
import styles from '../../styles/informacoes_cliente.module.css';
import { useRouter } from 'next/router';
import http from '../../config/http';
const pdfMakeX = require('pdfmake/build/pdfmake.js');
const pdfFontsX = require('pdfmake-unicode/dist/pdfmake-unicode.js');
pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;
import * as pdfMake from 'pdfmake/build/pdfmake';
import { FaFilePdf, FaRegFilePdf } from 'react-icons/fa';

interface User {
    id: number;
    tp_pessoa: string;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    numero: string;
    endereco: string;
    endereco_complemento: string;
    endereco_num: string;
    cep: string;
    rg: string;
    orgao: string;
    nome_mae: string;
    nome_pai: string;
    estado_civil: string;
    sexo: string;
    data_nascimento: string;
    profissao: string;
    cnh: string;
    status: string;
    cnpj: string;
    razao_social: string
    inscricao_municipal: string;
    inscricao_estadual: string;
    nome_representante: string;
    cpf_representante: string;
    profissao_representante: string;
    numero_representante: string;
    email_empresa: string;
    cep_empresa: string;
    endereco_empresa: string;
    endereco_numero_empresa: string;
    endereco_complemento_empresa: string;
}

export default function InformacoesCliente() {
    const [selectedClient, setSelectedClient] = useState<User | null>();
    const router = useRouter();

    useEffect(() => {
        getClients();
    }, [router.query]);

    async function getClients() {
        if (router.query.id) {
            const res = await http.get("/api/cliente/" + router.query.id);
            setSelectedClient(res);
        }
    }

    async function getProcuracao(id, nome) {
        const pdf = await http.post("/api/pdf/procuracao", {
            id
        });
        pdfMake.createPdf(pdf).download("Procuração " + nome + ".pdf");
    }

    async function getHipo(id, nome) {
        const pdf = await http.post("/api/pdf/hipo", {
            id
        });
        pdfMake.createPdf(pdf).download("Hipo " + nome + ".pdf");
    }

    return (
        <div className={styles.container}>
            <div className={'border p-4 rounded'}>
                <h3 className='text-center'>Informações do Cliente</h3>
                <ul className="nav nav-tabs justify-content-end">
                {selectedClient &&
                        <li className="nav-item">
                          <a>
                            Pessoa {selectedClient.tp_pessoa}
                          </a>
                        </li>
                }
                      </ul>
                <div className='mt-3'>
                      <div className={styles.buttons}>
                            <button className={`btn btn-outline-primary border-end-0 border-start-0 rounded-4`} onClick={() => router.push("/lista_clientes")}>Voltar</button>
                            {selectedClient &&
                                <div className={styles.rightButtons}>
                                    <button className={'btn btn-outline-danger'} onClick={() => getHipo(selectedClient.id, selectedClient.nome || selectedClient.nome_representante)}>
                                        <FaRegFilePdf/> Hipossuficiência
                                    </button>
                                    <button className={`btn btn-outline-danger`} onClick={() => getProcuracao(selectedClient.id, selectedClient.nome || selectedClient.nome_representante)}>
                                        <FaRegFilePdf/> Procuração
                                    </button>
                                </div>
                            }
                        </div>
                </div>
                {selectedClient && selectedClient.tp_pessoa === 'Física' && 
                        <div className='row mt-3'>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>ID:</strong> {selectedClient.id}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Nome:</strong> {selectedClient.nome}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>CPF:</strong> {selectedClient.cpf}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Telefone:</strong> {selectedClient.numero}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>CEP:</strong> {selectedClient.cep}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Endereço:</strong> {selectedClient.endereco}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Número:</strong> {selectedClient.endereco_num}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Complemento:</strong> {selectedClient.endereco_complemento}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Email:</strong> {selectedClient.email}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>RG:</strong> {selectedClient.rg}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Órgão Emissor:</strong> {selectedClient.orgao}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Nome da Mãe:</strong> {selectedClient.nome_mae}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Nome do Pai:</strong> {selectedClient.nome_pai}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Estado Civil:</strong> {selectedClient.estado_civil}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Sexo:</strong> {selectedClient.sexo}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Data de Nascimento:</strong> {selectedClient.data_nascimento}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Profissão:</strong> {selectedClient.profissao}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>CNH:</strong> {selectedClient.cnh}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Status:</strong> {selectedClient.status}</div>
                    </div>
                   }

 {selectedClient && selectedClient.tp_pessoa === 'Jurídica' && 
    <div className='row mt-4'>
        <div className='col-12 col-md-6 border-bottom p-2'><strong>ID:</strong> {selectedClient.id}</div>
        <div className='col-12 col-md-6 border-bottom p-2'><strong>Nome:</strong> {selectedClient.nome_representante}</div>
        <div className='col-12 col-md-6 border-bottom p-2'><strong>Cnpj:</strong> {selectedClient.cnpj}</div>
        <div className='col-12 col-md-6 border-bottom p-2'><strong>Razão Social:</strong> {selectedClient.razao_social}</div>
        <div className='col-12 col-md-6 border-bottom p-2'><strong>Inscricao Municipal:</strong> {selectedClient.inscricao_municipal}</div>
        <div className='col-12 col-md-6 border-bottom p-2'><strong>Inscrição Estadual:</strong> {selectedClient.inscricao_estadual}</div>
        <div className='col-12 col-md-6 border-bottom p-2'><strong>Cpf:</strong> {selectedClient.cpf_representante}</div>
        <div className='col-12 col-md-6 border-bottom p-2'><strong>Profissão:</strong> {selectedClient.profissao_representante}</div>
        <div className='col-12 col-md-6 border-bottom p-2'><strong>Número:</strong> {selectedClient.numero_representante}</div>
        <div className='col-12 col-md-6 border-bottom p-2'><strong>Email:</strong> {selectedClient.email_empresa}</div>
        <div className='col-12 col-md-6 border-bottom p-2'><strong>CEP Empresa:</strong> {selectedClient.cep_empresa}</div>
        <div className='col-12 col-md-6 border-bottom p-2'><strong>Endereço Empresa:</strong> {selectedClient.endereco_empresa}</div>
        <div className='col-12 col-md-6 border-bottom p-2'><strong>Número:</strong> {selectedClient.endereco_numero_empresa}</div>
        <div className='col-12 col-md-6 border-bottom p-2'><strong>Complemento:</strong> {selectedClient.endereco_complemento_empresa}</div>
        <div className='col-12 col-md-6 border-bottom p-2'><strong>Status:</strong> {selectedClient.status}</div>
    </div>
 }

            </div>
        </div>
)}
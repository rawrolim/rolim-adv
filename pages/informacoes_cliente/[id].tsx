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
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    número: string;
    endereço: string;
    endereço_complemento: string;
    cep: string;
    rg: string;
    orgão: string;
    nome_mãe: string;
    nome_pai: string;
    estado_civil: string;
    sexo: string;
    data_nascimento: string;
    profissão: string;
    cnh: string;
    status: string;
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
                <div className={styles.buttons}>
                    <button className={`btn btn-outline-primary border-end-0 border-start-0 rounded-4`} onClick={() => router.push("/lista_clientes")}>Voltar</button>
                    {selectedClient &&
                        <div className={styles.rightButtons}>
                            <button className={'btn btn-outline-danger'} onClick={() => getHipo(selectedClient.id, selectedClient.nome)}>
                                <FaRegFilePdf/> Hipossuficiência
                            </button>
                            <button className={`btn btn-outline-danger`} onClick={() => getProcuracao(selectedClient.id, selectedClient.nome)}>
                                <FaRegFilePdf/> Procuração
                            </button>
                        </div>
                    }
                </div>

                {selectedClient &&
                    <div className='row mt-2'>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>ID:</strong> {selectedClient.id}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Nome:</strong> {selectedClient.nome}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>CPF:</strong> {selectedClient.cpf}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Número:</strong> {selectedClient.número}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Email:</strong> {selectedClient.email}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Endereço:</strong> {selectedClient.endereço}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Complemento:</strong> {selectedClient.endereço_complemento}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>CEP:</strong> {selectedClient.cep}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>RG:</strong> {selectedClient.rg}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Órgão Emissor:</strong> {selectedClient.orgão}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Nome da Mãe:</strong> {selectedClient.nome_mãe}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Nome do Pai:</strong> {selectedClient.nome_pai}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Estado Civil:</strong> {selectedClient.estado_civil}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Sexo:</strong> {selectedClient.sexo}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Data de Nascimento:</strong> {selectedClient.data_nascimento}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Profissão:</strong> {selectedClient.profissão}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>CNH:</strong> {selectedClient.cnh}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Status:</strong> {selectedClient.status}</div>
                    </div>
                }
            </div>
        </div>
    );
}
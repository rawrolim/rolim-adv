import { useEffect, useState } from 'react';
import styles from '../styles/informacoesCliente.module.css';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import http from '../config/http';
import Table from '../components/table';
import { FaFilePdf } from 'react-icons/fa';
import { toast } from 'react-toastify';
const pdfMakeX = require('pdfmake/build/pdfmake.js');
const pdfFontsX = require('pdfmake-unicode/dist/pdfmake-unicode.js');
pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;
import * as pdfMake from 'pdfmake/build/pdfmake';

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
}

export default function InformacoesCliente() {
    const [userData, setUserData] = useState<User[]>([]);
    const [selectedClient, setSelectedClient] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        getClients();
    }, []);

    async function getClients() {
        const res = await http.get("/api/cliente");
        setUserData(res.data);
    }

    async function getProcuracao(id, nome) {
        const pdf = await http.post("/api/pdf/procuracao", { id });
        pdfMake.createPdf(pdf.data).download("Procuração " + nome + ".pdf");
    }

    async function getHipo(id, nome) {
        const pdf = await http.post("/api/pdf/hipo", { id });
        pdfMake.createPdf(pdf.data).download("Hipo " + nome + ".pdf");
    }

    function handleClientSelect(client: User) {
        setSelectedClient(client);
    }

    return (
        <div className={styles.container}>
            <div className={styles.cliente}>
                <h1>Informações do Cliente</h1>
                <div className={styles.buttons}>
                    <button className={`${styles.button} ${styles.voltar}`} onClick={() => router.push("./")}>Voltar</button>
                </div>

                <Table
                    title={'Lista de clientes'}
                    dataInit={userData}
                    columns={[
                        {
                            name: '#',
                            field: 'index'
                        },
                        {
                            name: 'Nome',
                            field: 'nome'
                        },
                        {
                            name: 'E-mail',
                            field: 'email'
                        },
                        {
                            name: 'Telefone',
                            field: 'telefone'
                        },
                        {
                            name: 'Ações',
                            actions: [
                                {
                                    handler: (arrReplaced = []) => router.push(`/formulario_cliente/${arrReplaced[0]}`),
                                    fieldParams: ['id'],
                                    name: 'Editar',
                                    icon: <EditIcon />
                                },
                                {
                                    handler: (arrReplaced = []) => getProcuracao(arrReplaced[0], arrReplaced[1]),
                                    fieldParams: ['id', 'nome'],
                                    name: 'Procuração',
                                    icon: <FaFilePdf />
                                },
                                {
                                    handler: (arrReplaced = []) => getHipo(arrReplaced[0], arrReplaced[1]),
                                    fieldParams: ['id', 'nome'],
                                    name: 'Hipo',
                                    icon: <FaFilePdf />
                                },
                                {
                                    handler: (arrReplaced = []) => handleClientSelect(userData.find(user => user.id === arrReplaced[0])),
                                    fieldParams: ['id'],
                                    name: 'Selecionar',
                                    icon: <EditIcon />
                                },
                            ]
                        }
                    ]}
                />

                {selectedClient && (
                    <div className={styles.info}>
                        <p><strong>ID:</strong> {selectedClient.id}</p>
                        <p><strong>Nome:</strong> {selectedClient.nome}</p>
                        <p><strong>CPF:</strong> {selectedClient.cpf}</p>
                        <p><strong>Número:</strong> {selectedClient.número}</p>
                        <p><strong>Email:</strong> {selectedClient.email}</p>
                        <p><strong>Endereço:</strong> {selectedClient.endereço}</p>
                        <p><strong>Complemento:</strong> {selectedClient.endereço_complemento}</p>
                        <p><strong>CEP:</strong> {selectedClient.cep}</p>
                        <p><strong>RG:</strong> {selectedClient.rg}</p>
                        <p><strong>Órgão Emissor:</strong> {selectedClient.orgão}</p>
                        <p><strong>Nome da Mãe:</strong> {selectedClient.nome_mãe}</p>
                        <p><strong>Nome do Pai:</strong> {selectedClient.nome_pai}</p>
                        <p><strong>Estado Civil:</strong> {selectedClient.estado_civil}</p>
                        <p><strong>Sexo:</strong> {selectedClient.sexo}</p>
                        <p><strong>Data de Nascimento:</strong> {selectedClient.data_nascimento}</p>
                        <p><strong>Profissão:</strong> {selectedClient.profissão}</p>
                        <p><strong>CNH:</strong> {selectedClient.cnh}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
import { useEffect, useState } from 'react';
import styles from '../../styles/informacoes_cliente.module.css';
import { useRouter } from 'next/router';
import http from '../../config/http';
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
    const [selectedClient, setSelectedClient] = useState<User | null>();
    const router = useRouter();

    useEffect(() => {
        getClients();
    }, [router.query]);

    async function getClients() {
        if(router.query.id){
            const res = await http.get("/api/cliente/"+ router.query.id);
            setSelectedClient(res);
        }
    }

    async function getProcuracao(id, nome){
        const pdf = await http.post("/api/pdf/procuracao",{
          id
        });
        pdfMake.createPdf(pdf).download("Procuração "+nome+".pdf");
      }
    
      async function getHipo(id, nome){
        const pdf = await http.post("/api/pdf/hipo",{
          id
        });
        pdfMake.createPdf(pdf).download("Hipo "+ nome +".pdf");
      }

    return (
        <div className={styles.container}>
            <div className={styles.cliente}>
                <h1>Informações do Cliente</h1>
                <div className={styles.buttons}>
    <button className={`${styles.button} ${styles.voltar}`} onClick={() => router.push("./")}>Voltar</button>
    {selectedClient && 
        <div className={styles.rightButtons}>
            <button className={`${styles.button} ${styles.hipo}`} onClick={() => getHipo(selectedClient.id, selectedClient.nome)}>Hipo</button>
            <button className={`${styles.button} ${styles.procuracao}`} onClick={() => getProcuracao(selectedClient.id, selectedClient.nome)}>Procuração</button>
        </div>
    }
</div>

                {selectedClient && 
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
                }
            </div>
        </div>
    );
}
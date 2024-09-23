import { useEffect, useState } from 'react';
import styles from '../../styles/informacoes_cliente.module.css';
import { useRouter } from 'next/router';
import http from '../../config/http';
import AnexoProcesso from '../../components/anexoProcesso';

export default function InformacoesProcesso() {
    const [selectedProcess, setSelectedProcess] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (router.query.id) {
            getProcesso();
        }
    }, [router.query]);

    async function getProcesso() {
        try {
            const resData = await http.get(`/api/processo/${router.query.id}`);
            setSelectedProcess(resData);
        } catch (error) {
            console.error('Erro ao obter o Processo:', error);
        }
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    return (
        <div className={styles.container}>
            <div className={'border p-4 rounded'}>
                <h3 className='text-center'>Informações do Processo</h3>
                <button className={`btn btn-outline-primary border-end-0 border-start-0 rounded-4`} onClick={() => router.push("/processos/0")}>Voltar</button>
                <div className='mt-3'></div>
                {selectedProcess &&
                    <div className='row mt-3'>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>ID:</strong> {selectedProcess.id}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Número Processo:</strong> {selectedProcess.numero_processo}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Advogado:</strong> {selectedProcess.nome_advogado}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Cliente:</strong> {selectedProcess.nome_cliente}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Instância:</strong> {selectedProcess.instancia}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Tribunal:</strong> {selectedProcess.tribunal}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Número Orgão:</strong> {selectedProcess.numero_orgao}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Natureza:</strong> {selectedProcess.natureza}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Motivo:</strong> {selectedProcess.motivo}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Comarca:</strong> {selectedProcess.comarca}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Valor Causa:</strong> {selectedProcess.valor_causa}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Data Distribuição:</strong> {formatDate(selectedProcess.data_distribuicao)}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Valor Contrato:</strong> {selectedProcess.valor_contrato}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Parcelas:</strong> {selectedProcess.parcelas}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Entrada:</strong> {formatDate(selectedProcess.entrada)}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Início Prestação:</strong> {formatDate(selectedProcess.inicio_prestacao)}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Primeira Rescisão:</strong> {formatDate(selectedProcess.primeira_rescisao)}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Segunda Rescisão:</strong> {formatDate(selectedProcess.segunda_rescisao)}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Terceira Rescisão:</strong> {formatDate(selectedProcess.terceira_rescisao)}</div>
                    </div>
                }
            </div>
            <AnexoProcesso />
        </div>
    );
}
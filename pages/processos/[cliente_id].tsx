import { useEffect, useState } from 'react';
import styles from '../../styles/listaCliente.module.css';
import { useRouter } from 'next/router';
import http from '../../config/http';
import Table from '../../components/table';
import { MdEdit } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { FaFilePdf } from 'react-icons/fa';
const pdfMakeX = require('pdfmake/build/pdfmake.js');
const pdfFontsX = require('pdfmake-unicode/dist/pdfmake-unicode.js');
pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;
import * as pdfMake from 'pdfmake/build/pdfmake';

export default function ListaProcessos() {
  const [processos, setProcessos] = useState([]);
  const router = useRouter();


  useEffect(() => {
    if (router.query.cliente_id != "0" && router.query.cliente_id != undefined) {
      getProcessosCliente();
    } else {
      getProcessos();
    }
  }, [router.query.cliente_id]);

  async function getProcessosCliente() {
    const resData = await http.get(`/api/processos/${router.query.cliente_id}`);
    if (resData) {
      const transformedData = resData.map(processo => ({
        ...processo,
      }));
      setProcessos(transformedData);
    }
  }

  async function getProcessos() {
    const resData = await http.get("/api/processos");
    const transformedData = resData.map(processo => ({
      ...processo
    }));
    setProcessos(transformedData);
  }
  
  async function getContrato(id, nome_cliente){
    const pdf = await http.post("/api/pdf/contratoProcesso",{
      id
    });
    pdfMake.createPdf(pdf).download("Contrato "+ nome_cliente +".pdf");
  }
  
  return (
    <div>
      <main className={styles.main}>
        <div className='col-12 text-end mb-3'>
          <button onClick={() => router.push(`/cadastro_processo/novo`)} className={'btn btn-primary col-12 col-sm-6 col-md-4 col-lg-2'}>
            Cadastrar Processo
          </button>
        </div>

        <Table title={'Lista de Processos'} dataInit={processos}
          columns={[
            {
              name: 'Nº Processo',
              field: 'numero_processo'
            },
            {
              name: 'Cliente',
              field: 'nome_cliente'
            },
            {
              name: 'Advogado',
              field: 'nome_advogado'
            },
            {
              name: 'Motivo',
              field: 'motivo'
            },
            {
              name: 'Data Distribuição',
              field: 'data_distribuicao'
            },
            {
              name: 'Ações',
              actions: [
                {
                  handler: (arrReplaced = []) => router.push(`/cadastro_processo/${arrReplaced[0]}`),
                  fieldParams: ['id'],
                  name: 'Editar',
                  icon: <MdEdit />
                },
                {
                  handler: (arrReplaced = []) => getContrato(arrReplaced[0],arrReplaced[1]),
                  fieldParams: ['id','nome_cliente'],
                  name: 'Contrato',
                  icon: <FaFilePdf />
                },
                {
                  handler: (arrReplaced = []) => router.push(`/informacoes_processos/${arrReplaced[0]}`),
                  fieldParams: ['id'],
                  name: 'Informações',
                  icon: <FaFileAlt />
                },
              ]
            }

          ]}
        />
      </main>
    </div>
  );
}
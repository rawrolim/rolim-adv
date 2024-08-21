import { useEffect, useState } from 'react';
import styles from '../styles/listaCliente.module.css';
import { useRouter } from 'next/router';
import http from '../config/http';
import Table from '../components/table';
import { MdEdit } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";

export default function ListaProcessos() {
    const [users, setUsers] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getProcessos();
      }, []);

      async function getProcessos() {
        const resData = await http.get("/api/processo");
        const transformedData = resData.map(user => ({
          ...user
        }));
        setUsers(transformedData);
      }

    return (
        <div>
        <main className={styles.main}>
          <div className='col-12 text-end mb-3'>
            <button onClick={() => router.push("/lista_clientes")} className={'btn btn-primary col-12 col-sm-6 col-md-4 col-lg-2'}>
              Clientes
            </button>
          </div>
  
          <Table title={'Lista de Processos'} dataInit={users}
            columns={ [
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
                name: 'Data Distribuicao',
                field: 'data_distribuicao'
              },
              {
                name: 'Ações',
                actions: [
                  {
                    handler: (arrReplaced = []) => router.push(`/cadastro_processo/${arrReplaced[0]}`),
                    fieldParams: ['id'],
                    name: 'Editar',
                    icon: <MdEdit/>
                  },
                  {
                    handler: (arrReplaced = []) => router.push(`/informacoes_processos/${arrReplaced[0]}`),
                    fieldParams: ['id'],
                    name: 'Informações',
                    icon: <FaFileAlt />
                  },
                ]
              }
              
            ] }
          />
        </main>
      </div>
);
}
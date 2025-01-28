import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/listaCliente.module.css';
import http from '../config/http';
import Table from '../components/table';
import { MdEdit } from "react-icons/md";

interface entrada {
  id: number;
  numero_processo: string;
  data_entrada:string;
  valor: number;
}

export default function ListaEntrada() {

  const [entradaData] = useState<entrada[]>([]);
  const [entrada, setEntrada] = useState<entrada[]>(entradaData);
  const router = useRouter();

  useEffect(() => {
    getEntrada();
  }, []);

  async function getEntrada() {
    const resData = await http.get("/api/entrada");
    const transformedData = resData.map(user => ({
      ...user,
    }));
    setEntrada(transformedData);
  }

  return (
    <div>
    <main className={styles.main}>
      <div className='col-12 text-end mb-3'>
        <button onClick={() => router.push("/cadastro_entrada/novo")} className={'btn btn-primary col-12 col-sm-6 col-md-auto'}>
          Cadastrar Entrada
        </button>
      </div>
      <Table title={'Lista Entradas'} dataInit={entrada}
        columns={ [
          {
            name: '#',
            field: 'index'
          },
          {
            name: 'Nº Processo',
            field: 'numero_processo'
          },
          {
            name: 'Data Entrada',
            field: 'data_entrada'
          },
          {
            name: 'Valor',
            field: 'valor'
          },
          {
            name: 'Ações',
            actions: [
              {
                handler: (arrReplaced = []) => router.push(`/cadastro_entrada/${arrReplaced[0]}`),
                fieldParams: ['id'],
                name: 'Editar',
                icon: <MdEdit />
              }
            ]
          }
        ] }
      />
    </main>
  </div>
  );
}
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/listaCliente.module.css';
import http from '../config/http';
import Table from '../components/table';
import { MdEdit } from "react-icons/md";

interface despesa {
  id: number;
  nome: string;
  data_pagamento:string;
  valor: number;
}

export default function ListaDespesa() {

  const [despesaData] = useState<despesa[]>([]);
  const [despesa, setDespesa] = useState<despesa[]>(despesaData);
  const router = useRouter();

  useEffect(() => {
    getDespesas();
  }, []);

  async function getDespesas() {
    const resData = await http.get("/api/despesa");
    const transformedData = resData.map(user => ({
      ...user,
    }));
    setDespesa(transformedData);
  }

  return (
    <div>
    <main className={styles.main}>
      <div className='col-12 text-end mb-3'>
        <button onClick={() => router.push("/cadastro_despesa/novo")} className={'btn btn-primary col-12 col-sm-6 col-md-auto'}>
          Cadastrar Despesa
        </button>
      </div>
      <Table title={'Lista Despesas'} dataInit={despesa}
        columns={ [
          {
            name: '#',
            field: 'index'
          },
          {
            name: 'Tipo Despesa',
            field: 'nome'
          },
          {
            name: 'Data Pagamento',
            field: 'data_pagamento'
          },
          {
            name: 'Valor',
            field: 'valor'
          },
          {
            name: 'Ações',
            actions: [
              {
                handler: (arrReplaced = []) => router.push(`/cadastro_despesa/${arrReplaced[0]}`),
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
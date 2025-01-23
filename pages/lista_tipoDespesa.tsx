import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/listaCliente.module.css';
import http from '../config/http';
import Table from '../components/table';
import { toast } from 'react-toastify';
import { MdEdit } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";

interface tpdespesa {
  id: number;
  nome: string;
  status: string;
}

export default function ListaTipoDespesa() {

  const [tpdespesaData] = useState<tpdespesa[]>([]);
  const [tpdespesa, setTpdespesa] = useState<tpdespesa[]>(tpdespesaData);
  const router = useRouter();

  useEffect(() => {
    getTipoDespesas();
  }, []);

  async function getTipoDespesas() {
    try {
      const res = await http.get("/api/despesa/tipo_despesa");
      const transformedData = res.map(despesas => ({
        ...despesas,
      }));
      setTpdespesa(transformedData);
    } catch (err) {
      console.error("Erro ao carregar os tipos de despesa:", err);
    }
  }
  async function deletetpDespesa(id) {
    const res = await http.delete("/api/despesa/tipo_despesa/" + id);
    console.log(res)
    getTipoDespesas();
    toast.success("Status do Tipo Despesa alterado com sucesso.")
  }
  return (
    <div>
      <main className={styles.main}>
        <div className='d-flex flex-wrap col-12 p-0 m-0 mb-3' style={{'justifyContent': 'space-between'}}>
          <button className="btn btn-outline-primary border-end-0 border-start-0 rounded-4" onClick={() => router.push('despesas')}>Voltar</button>
          <button onClick={() => router.push("/cadastro_tipo_despesa/novo")} className={'btn btn-primary col-12 col-sm-6 col-md-auto'}>
            Cadastrar Tipo de Despesa
          </button>
        </div>
        <Table title={'Lista de Tipo de Despesas'} dataInit={tpdespesa}
          columns={[
            {
              name: '#',
              field: 'index'
            },
            {
              name: 'Tipo Despesa',
              field: 'nome'
            },
            {
              name: 'Status',
              field: 'status'
            },
            {
              name: 'Ações',
              actions: [
                {
                  handler: (arrReplaced = []) => router.push(`/cadastro_tipo_despesa/${arrReplaced[0]}`),
                  fieldParams: ['id'],
                  name: 'Editar',
                  icon: <MdEdit />
                },
                {
                  handler: (arrReplaced = []) => deletetpDespesa(arrReplaced[0]),
                  fieldParams: ['id'],
                  name: 'Alterar status',
                  icon: <GrUpdate />
                },
              ]
            }
          ]}
        />
      </main>
    </div>
  );
}
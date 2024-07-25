import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/listaCliente.module.css';
import http from '../config/http';
import Table from '../components/table';
import { GrUpdate } from "react-icons/gr";
import { toast } from 'react-toastify';
import { FaUser } from "react-icons/fa";
import EditIcon from '@mui/icons-material/Edit';

interface User {
  id: number;
  nome: string;
  email: string;
  nome_acesso: string;
  status:string;
}

export default function ListaUsuarios() {

  const [userData] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>(userData);
  const router = useRouter();

  useEffect(() => {
    getUsuarios();
  }, []);

  async function getUsuarios() {
    const resData = await http.get("/api/usuario");
    setUsers(resData);
  }

  async function deleteUsuario(id){
    await http.delete("/api/usuario/"+id);
    getUsuarios();
    toast.success("Status do Usuário alterado com sucesso.")
  }


  return (
    <div>
    <main className={styles.main}>
      <div className='col-12 text-end mb-3'>
        <button onClick={() => router.push("/cadastro_usuario/novo")} className={'btn btn-primary col-12 col-sm-6 col-md-auto'}>
          Cadastrar usuário
        </button>
      </div>

      <Table title={'Lista de Usuários'} dataInit={users}
        columns={ [
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
            name: 'Tipo Usuário',
            field: 'nome_acesso'
          },
          {
            name: 'Status',
            field: 'status'
          },
          {
            name: 'Ações',
            actions: [
              {
                handler: (arrReplaced = []) => router.push(`/cadastro_usuario/${arrReplaced[0]}`),
                fieldParams: ['id'],
                name: 'Editar',
                icon: <EditIcon />
              },
              {
                handler: (arrReplaced = []) => deleteUsuario(arrReplaced[0]),
                fieldParams: ['id'],
                name: 'Alterar status',
                icon: <GrUpdate />
              },
            ]
          }
        ] }
      />
    </main>
  </div>
  );
}
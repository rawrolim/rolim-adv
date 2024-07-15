import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/listaCliente.module.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import http from '../config/http';
import Table from '../components/table';
import { toast } from 'react-toastify';
import { FaUser } from "react-icons/fa";

interface User {
  id: number;
  nome: string;
  email: string;
}

export default function ListaUsuarios() {
  const [userData, setUserData] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>(userData);
  const router = useRouter();

  useEffect(() => {
    getUsuarios();
  }, []);

  async function getUsuarios() {
    const resData = await http.get("/api/usuario");
    setUserData(resData);
    setUsers(resData);
  }

  async function deleteUsuario(id){
    await http.delete("/api/usuario/"+id);
    toast.success("Usuario deletado com sucesso.")
  }


  return (
    <div>
      <main className={styles.main}>
        <div className='col-12 text-end mb-3'>
          <button onClick={() => router.push("/cadastro_usuario/novo")} className={'btn btn-primary col-12 col-sm-6 col-md-4 col-lg-2'}>
            Cadastrar Usuário
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
              name: 'Ações',
              actions: [
                {
                  handler: (arrReplaced = []) => router.push(`/formulario_usuario/${arrReplaced[0]}`),
                  fieldParams: ['id'],
                  name: 'Editar',
                  icon: <EditIcon />
                },
                {
                  handler: (arrReplaced = []) => deleteUsuario(arrReplaced[0]),
                  fieldParams: ['id'],
                  name: 'Deletar',
                  icon: <DeleteIcon />
                },
                {
                  handler: (arrReplaced = []) => router.push(`/informacoes_usuario/${arrReplaced[0]}`),
                  fieldParams: ['id'],
                  name: 'Informações do Usuário',
                  icon: <FaUser />
                },
              ]
            }
          ] }
        />
      </main>
    </div>
  );
}
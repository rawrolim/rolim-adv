import { useEffect, useState } from 'react';
import styles from '../styles/listaCliente.module.css';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import http from '../config/http';
import Table from '../components/table';

interface User {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

export default function ListaCliente() {
  const [userData, setUserData] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>(userData);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('all');
  const router = useRouter();

  useEffect(() => {
    getClients();
  }, []);

  async function getClients() {
    const resData = await http.get("/api/cliente");
    setUserData(resData);
    setUsers(resData);
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    applyFilters(value, searchField);
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const field = event.target.value;
    setSearchField(field);
    applyFilters(searchTerm, field);
  };

  async function deleteClient(id){

  }

  const applyFilters = (term: string, field: string) => {
    let filteredUsers = [...userData];

    if (term) {
      if (field === 'all') {
        filteredUsers = filteredUsers.filter(user =>
          Object.values(user).some(value => {
            if (value) {
              return value.toString().toLowerCase().includes(term)
            }
          }
          )
        );
      } else {
        filteredUsers = filteredUsers.filter(user =>
          user[field as keyof User].toString().toLowerCase().includes(term)
        );
      }
    }

    setUsers(filteredUsers);
  };

  return (
    <div>
      <main className={styles.main}>
        <div className='col-12 text-end mb-3'>
          <button onClick={() => router.push("/formulario_cliente/novo")} className={'btn btn-primary col-12 col-sm-6 col-md-4 col-lg-2'}>
            Cadastrar cliente
          </button>
        </div>

        <Table title={'Lista de clientes'} dataInit={users}
          columns={ [
            {
              name: 'ID',
              field: 'id'
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
                  icon: <EditIcon />,
                  btnColor: 'primary'
                },
                {
                  handler: (arrReplaced = []) => deleteClient(arrReplaced[0]),
                  fieldParams: ['id'],
                  icon: <DeleteIcon />,
                  btnColor: 'danger'
                },
              ]
            }
          ] }
        />
      </main>
    </div>
  );
}
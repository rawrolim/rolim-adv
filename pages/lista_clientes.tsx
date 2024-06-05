import { useEffect, useState } from 'react';
import styles from '../styles/listaCliente.module.css';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import http from '../config/http';

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

  useEffect(()=>{
    getClients();
  },[]);

  async function getClients(){
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

  const applyFilters = (term: string, field: string) => {
    let filteredUsers = [...userData];

    if (term) {
      if (field === 'all') {
        filteredUsers = filteredUsers.filter(user =>
          Object.values(user).some(value =>{
              if(value){
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
        <div className={styles.container}>
          <h1>Lista de Clientes</h1>
          
          <div className={styles.actions}>
            <select value={searchField} onChange={handleFieldChange} className={styles.searchSelect}>
              <option value="all">Todos</option>
              <option value="id">ID</option>
              <option value="nome">Nome</option>
              <option value="email">Email</option>
              <option value="telefone">Telefone</option>
            </select>
            <div className={styles.inputContainer}>
              <input
                className={styles.searchInput}
                type="text"
                id="searchInput"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder='Pesquisar...'
              />
              <label htmlFor="searchInput" className={styles.searchLabel}>
              {`Pesquisar por ${searchField === 'all' ? 'todos' : searchField}`}
              </label>
            </div>
            <button onClick={() => router.push("/formulario_cliente/novo")} className={styles.addUserButton}>Cadastrar Cliente</button>
          </div>
          
          <div className={styles.tableWrapper}>
            <table id="userTable" className={styles.table}>
              <thead className={styles.thead}>
                <tr className={styles.tr}>
                  <th className={styles.th}>ID</th>
                  <th className={styles.th}>Nome</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Telefone</th>
                  <th className={styles.th}>Ações</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {users.map((user, index) => (
                  <tr key={index} className={styles.tr}>
                    <td className={styles.td}>{user.id}</td>
                    <td className={styles.td}>{user.nome}</td>
                    <td className={styles.td}>{user.email}</td>
                    <td className={styles.td}>{user.telefone}</td>
                    <td>
                      <button className={styles.editButton} onClick={()=>router.push(`/formulario_cliente/${user.id}`)}>
                        <EditIcon />
                      </button>
                      <button className={styles.deleteButton}>
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
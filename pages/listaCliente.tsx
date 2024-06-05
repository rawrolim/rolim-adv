import { useState } from 'react';
import styles from '../styles/listaCliente.module.css';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface User {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

const usersData: User[] = [
  { id: 1, nome: 'joao', email: 'joao@example.com', telefone: '1111111' },
  { id: 2, nome: 'pedro', email: 'pedro@example.com', telefone: '88888888' },
  { id: 3, nome: 'gabriel', email: 'gabriel@example.com', telefone: '666666' },
  { id: 4, nome: 'bernardo', email: 'bernardo@example.com', telefone: '3333333' },
  { id: 5, nome: 'gabriel', email: 'gabriel@example.com', telefone: '666666' },
  { id: 6, nome: 'gabriel', email: 'gabriel@example.com', telefone: '666666' },
  { id: 7, nome: 'gabriel', email: 'gabriel@example.com', telefone: '666666' },
];
export default function ListaCliente() {
  const [users, setUsers] = useState<User[]>(usersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('all');
  const router = useRouter();

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
    let filteredUsers = usersData;

    if (term) {
      if (field === 'all') {
        filteredUsers = filteredUsers.filter(user =>
          Object.values(user).some(value =>
            value.toString().toLowerCase().includes(term)
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
            <button onClick={() => router.push("/FormCliente")} className={styles.addUserButton}>Cadastrar Cliente</button>
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
                    <button className={styles.editButton}>
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
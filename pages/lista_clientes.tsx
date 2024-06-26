import { useEffect, useState } from 'react';
import styles from '../styles/listaCliente.module.css';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import http from '../config/http';
import Table from '../components/table';
import { FaFilePdf } from 'react-icons/fa';
import { toast } from 'react-toastify';
const pdfMakeX = require('pdfmake/build/pdfmake.js');
const pdfFontsX = require('pdfmake-unicode/dist/pdfmake-unicode.js');
pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;
import * as pdfMake from 'pdfmake/build/pdfmake';

interface User {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

export default function ListaCliente() {
  const [userData, setUserData] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>(userData);
  const router = useRouter();

  useEffect(() => {
    getClients();
  }, []);

  async function getClients() {
    const resData = await http.get("/api/cliente");
    setUserData(resData);
    setUsers(resData);
  }

  async function deleteClient(id){
    await http.delete("/api/cliente/"+id);
    toast.success("Cliente deletado com sucesso.")
  }

  async function getProcuracao(id, nome){
    const pdf = await http.post("/api/pdf/procuracao",{
      id
    });
    pdfMake.createPdf(pdf).download("Procuração "+nome+".pdf");
  }

  async function getHipo(id, nome){
    const pdf = await http.post("/api/pdf/hipo",{
      id
    });
    pdfMake.createPdf(pdf).download("Hipo "+ nome +".pdf");
  }

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
                  name: 'Editar',
                  icon: <EditIcon />
                },
                {
                  handler: (arrReplaced = []) => deleteClient(arrReplaced[0]),
                  fieldParams: ['id'],
                  name: 'Deletar',
                  icon: <DeleteIcon />
                },
                {
                  handler: (arrReplaced = []) => getProcuracao(arrReplaced[0],arrReplaced[1]),
                  fieldParams: ['id','nome'],
                  name: 'Procuração',
                  icon: <FaFilePdf />
                },
                {
                  handler: (arrReplaced = []) => getHipo(arrReplaced[0],arrReplaced[1]),
                  fieldParams: ['id','nome'],
                  name: 'Hipo',
                  icon: <FaFilePdf />
                },
              ]
            }
          ] }
        />
      </main>
    </div>
  );
}
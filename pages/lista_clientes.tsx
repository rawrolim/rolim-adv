import { useEffect, useState } from 'react';
import styles from '../styles/listaCliente.module.css';
import { useRouter } from 'next/router';
import { MdEdit } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import http from '../config/http';
import Table from '../components/table';
import { FaFilePdf } from 'react-icons/fa';
import { toast } from 'react-toastify';
const pdfMakeX = require('pdfmake/build/pdfmake.js');
const pdfFontsX = require('pdfmake-unicode/dist/pdfmake-unicode.js');
pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;
import { FaUser } from "react-icons/fa";
import * as pdfMake from 'pdfmake/build/pdfmake';
import { FaFileAlt } from "react-icons/fa";

export default function ListaCliente() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getClients();
  }, []);

  async function getClients() {
    const resData = await http.get("/api/cliente");
    const transformedData = resData.map(user => ({
      ...user,
      nome: user.nome || user.nome_representante,
      email: user.email || user.email_empresa,
      numero: user.numero || user.numero_representante
    }));
    setUsers(transformedData);
  }

  async function deleteClient(id){
    await http.delete("/api/cliente/"+id);
    getClients();
    toast.success("Status do cliente alterado com sucesso.")
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
              name: 'Telefone',
              field: 'numero'
            },
            {
              name: 'Tipo Pessoa',
              field: 'tp_pessoa'
            },
            {
              name: 'Status',
              field: 'status'
            },
            {
              name: 'Ações',
              actions: [
                {
                  handler: (arrReplaced = []) => router.push(`/formulario_cliente/${arrReplaced[0]}`),
                  fieldParams: ['id'],
                  name: 'Editar',
                  icon: <MdEdit/>
                },
             {
                  handler: (arrReplaced = []) => router.push(`/processos/${arrReplaced[0]}`),
                  fieldParams: ['id'],
                  name: 'Processos',
                  icon: <FaFileAlt />
                },
                {
                  handler: (arrReplaced = []) => deleteClient(arrReplaced[0]),
                  fieldParams: ['id'],
                  name: 'Alterar status',
                  icon: <GrUpdate />
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
                {
                  handler: (arrReplaced = []) => router.push(`/informacoes_cliente/${arrReplaced[0]}`),
                  fieldParams: ['id'],
                  name: 'Informações',
                  icon: <FaUser />
                }
              ]
            }
          ] }
        />
      </main>
    </div>
  );
}
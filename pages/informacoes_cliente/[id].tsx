import { useEffect, useState } from 'react';
import styles from '../../styles/informacoes_cliente.module.css';
import { useRouter } from 'next/router';
import http from '../../config/http';
const pdfMakeX = require('pdfmake/build/pdfmake.js');
const pdfFontsX = require('pdfmake-unicode/dist/pdfmake-unicode.js');
pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;
import * as pdfMake from 'pdfmake/build/pdfmake';
import { FaDownload, FaFilePdf, FaRegFilePdf, FaTrash } from 'react-icons/fa';
import User from '../../interfaces/User';
import { toast } from 'react-toastify';

export default function InformacoesCliente() {
    const [selectedClient, setSelectedClient] = useState<User | null>();
    const [attachs, setAttachs] = useState([]);
    const [file, setFile] = useState<FileList>(null);
    const router = useRouter();

    useEffect(() => {
        getClients();
        getAttachs();
    }, [router.query]);

    async function getClients() {
        if (router.query.id) {
            const res = await http.get("/api/cliente/" + router.query.id);
            setSelectedClient(res);
        }
    }

    async function getProcuracao(id, nome) {
        const pdf = await http.post("/api/pdf/procuracao", {
            id
        });
        pdfMake.createPdf(pdf).download("Procuração " + nome + ".pdf");
    }

    async function getHipo(id, nome) {
        const pdf = await http.post("/api/pdf/hipo", {
            id
        });
        pdfMake.createPdf(pdf).download("Hipo " + nome + ".pdf");
    }

    async function getAttachs() {
        if (router.query.id) {
            const data = await http.get(`/api/cliente/anexos/${router.query.id}`);
            setAttachs(data);
        }
    }

    async function deleteAttach(anexo_id) {
        const resposta = confirm("Deseja realmente excluir o anexo?");
        if(!resposta)
            return
        await http.delete(`/api/cliente/anexos/${router.query.id}?anexo_id=${anexo_id}`);
        await getAttachs();
        toast.success("Arquivo deletado com sucesso")
    }

    async function attachFiles() {
        if (file.length == 0) {
            toast.error("Necessário escolher ao menos um arquivo")
            return
        }

        for (let i = 0; i < file.length; i++) {
            let reader = new FileReader();
            reader.onload = async () => {
                const authToken = localStorage.getItem('token');
                await http.post(`/api/cliente/anexos/${router.query.id}`,
                    {
                        nome_arquivo: file.item(i).name,
                        arquivo: reader.result
                    },
                    {
                        headers: {
                            authorization: authToken,
                        },
                    }
                );
                toast.success("Arquivo anexado com sucesso");
                await getAttachs();
            }
            await reader.readAsDataURL(file.item(i));
        }
        setAttachs(null);
    }

    return (
        <div className={styles.container}>
            <div className={'border p-4 rounded'}>
                <h3 className='text-center'>Informações do Cliente</h3>
                <ul className="nav nav-tabs justify-content-end">
                    {selectedClient &&
                        <li className="nav-item">
                            <a>
                                Pessoa {selectedClient.tp_pessoa}
                            </a>
                        </li>
                    }
                </ul>
                <div className='mt-3'>
                    <div className={styles.buttons}>
                        <button className={`btn btn-outline-primary border-end-0 border-start-0 rounded-4`} onClick={() => router.push("/lista_clientes")}>Voltar</button>
                        {selectedClient &&
                            <div className={styles.rightButtons}>
                                <button className={'btn btn-outline-danger'} onClick={() => getHipo(selectedClient.id, selectedClient.nome || selectedClient.nome_representante)}>
                                    <FaRegFilePdf /> Hipossuficiência
                                </button>
                                <button className={`btn btn-outline-danger`} onClick={() => getProcuracao(selectedClient.id, selectedClient.nome || selectedClient.nome_representante)}>
                                    <FaRegFilePdf /> Procuração
                                </button>
                            </div>
                        }
                    </div>
                </div>
                {selectedClient && selectedClient.tp_pessoa === 'Física' &&
                    <div className='row mt-3'>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>ID:</strong> {selectedClient.id}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Nome:</strong> {selectedClient.nome}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>CPF:</strong> {selectedClient.cpf}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Telefone:</strong> {selectedClient.numero}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>CEP:</strong> {selectedClient.cep}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Endereço:</strong> {selectedClient.endereco}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Número:</strong> {selectedClient.endereco_num}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Complemento:</strong> {selectedClient.endereco_complemento}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Email:</strong> {selectedClient.email}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>RG:</strong> {selectedClient.rg}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Órgão Emissor:</strong> {selectedClient.orgao}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Nome da Mãe:</strong> {selectedClient.nome_mae}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Nome do Pai:</strong> {selectedClient.nome_pai}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Estado Civil:</strong> {selectedClient.estado_civil}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Sexo:</strong> {selectedClient.sexo}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Data de Nascimento:</strong> {selectedClient.data_nascimento}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Profissão:</strong> {selectedClient.profissao}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>CNH:</strong> {selectedClient.cnh}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Status:</strong> {selectedClient.status}</div>
                    </div>
                }

                {selectedClient && selectedClient.tp_pessoa === 'Jurídica' &&
                    <div className='row mt-4'>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>ID:</strong> {selectedClient.id}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Nome:</strong> {selectedClient.nome_representante}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Cnpj:</strong> {selectedClient.cnpj}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Razão Social:</strong> {selectedClient.razao_social}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Inscricao Municipal:</strong> {selectedClient.inscricao_municipal}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Inscrição Estadual:</strong> {selectedClient.inscricao_estadual}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Cpf:</strong> {selectedClient.cpf_representante}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Profissão:</strong> {selectedClient.profissao_representante}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Número:</strong> {selectedClient.numero_representante}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Email:</strong> {selectedClient.email_empresa}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>CEP Empresa:</strong> {selectedClient.cep_empresa}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Endereço Empresa:</strong> {selectedClient.endereco_empresa}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Número:</strong> {selectedClient.endereco_numero_empresa}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Complemento:</strong> {selectedClient.endereco_complemento_empresa}</div>
                        <div className='col-12 col-md-6 border-bottom p-2'><strong>Status:</strong> {selectedClient.status}</div>
                    </div>
                }
            </div>

            <div className='p-4 border rounded mt-3'>
                <h3 className='text-center border-bottom'>Anexos</h3>
                <div className='col-12 text-end'>
                    <button className='btn border' data-bs-toggle="modal" data-bs-target="#AttachModal">Anexar</button>
                </div>
                <div className='d-flex flex-wrap'>
                    {attachs && attachs.map((attach,i) =>
                        <div key={`attach-${i.toString()}`} className='p-2 col-12 col-sm-6 col-md-4 col-lg-3'>
                            <div className='border rounded p-3'>
                                <div className='mb-3'>{attach.nome_arquivo}</div>
                                <div className='text-center'>
                                    <a className='btn btn-primary me-2' download={attach.nome_arquivo} href={attach.arquivo}><FaDownload/> Baixar</a>
                                    <button className='btn btn-danger' onClick={() => deleteAttach(attach.id)}><FaTrash/> Excluir</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="modal fade" style={{ zIndex: '999999' }} id="AttachModal" tabIndex={-1} aria-labelledby="AttachModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="AttachModalLabel">Anexar arquivo</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type='file' onChange={e => setFile(e.target.files)} multiple={true} name='attach-files' className='form-control' />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={attachFiles} data-bs-dismiss="modal" aria-label="Close">Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

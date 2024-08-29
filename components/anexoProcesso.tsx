import router from "next/router";
import { useEffect, useState } from "react";
import { FaDownload, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import http from "../config/http";

export default function AnexoProcesso(){
    const [attachs, setAttachs] = useState([]);
    const [file, setFile] = useState<FileList>(null);
    
    useEffect(()=>{
        getAttachs();
    },[])
    
    async function getAttachs() {
        if (router.query.id) {
            const data = await http.get(`/api/processo/anexos/${router.query.id}`);
            setAttachs(data);
        }
    }

    async function deleteAttach(anexo_id) {
        const resposta = confirm("Deseja realmente excluir o anexo?");
        if(!resposta)
            return
        await http.delete(`/api/processo/anexos/${router.query.id}?anexo_id=${anexo_id}`);
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
                await http.post(`/api/processo/anexos/${router.query.id}`,
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
    
    return(
        <>
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
        </>
    )
}
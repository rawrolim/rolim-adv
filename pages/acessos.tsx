import { ChangeEventHandler, useEffect, useState } from "react"
import http from "../config/http";
import Table from "../components/table";
import { FaTrash } from "react-icons/fa";

export default function Acessos() {
    const [type, setType] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [formData, setFormData] = useState({
        tipo_usuario: '',
        rota: ''
    });

    useEffect(() => {
        getTypes();
    }, []);

    useEffect(() => {
        getRoutes();
    }, [formData.tipo_usuario]);

    async function getTypes() {
        const data = await http.get("api/usuario/tipos");
        setType(data.tipo_usuario);
    }

    async function getRoutes() {
        if (formData.tipo_usuario) {
            const res = await http.get("/api/acessos?tipo_usuario_id=" + formData.tipo_usuario)
            setRoutes(res);
        }
    }

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const save = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            await http.post('/api/acessos/', formData);
            setFormData({ ...formData, rota: '' });
            getRoutes();
        } catch (err) {
            console.error(err)
        }
    };

    async function deleteRoute(id) {
        await http.delete(`/api/acessos?id=${id}`);
        getRoutes();
    }

    return (
        <div className="p-5">
            <form onSubmit={save} className="col-12 border p-4 rounded">
                <h4 className="text-center">Formulário de acesso de rotas</h4>
                <div className="col-12 ">
                    <label>Tipo de acesso</label>
                    <select onChange={handleChange} id='tipo_usuario' value={formData.tipo_usuario} className="form-control">
                        <option value=''>Selecione</option>
                        {type.length > 0 && type.map(field => {
                            return <option key={field.id} value={field.id}>{field.nome}</option>
                        })}
                    </select>
                </div>
                <div className="col-12 mt-2">
                    <label>Endpoint</label>
                    <input onChange={handleChange} type='text' id='rota' value={formData.rota} className="form-control" />
                </div>
                <div className="mt-4 text-center">
                    <button className="btn col-12 col-sm-6 col-md-3 btn-primary">Adicionar</button>
                </div>
            </form>

            {routes.length > 0 &&
                <div className="mt-4">
                    <Table title={'Listagem de rotas'} dataInit={routes} columns={
                        [
                            {
                                name: '#',
                                field: 'index'
                            },
                            {
                                name: 'Rota',
                                field: 'rota'
                            },
                            {
                                name: 'Data criação',
                                field: 'createdAt'
                            },
                            {
                                name: 'Ações',
                                actions: [
                                    {
                                        handler: (arrReplaced = []) => deleteRoute(arrReplaced[0]),
                                        fieldParams: ['id'],
                                        name: 'Deletar',
                                        icon: <FaTrash />
                                    },
                                ]
                            }
                        ]
                    } />
                </div>
            }
        </div>
    )
}
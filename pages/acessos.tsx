import { ChangeEventHandler, useEffect, useState } from "react"
import http from "../config/http";

export default function Acessos() {
    const [type, setType] = useState(null);
    const [formData, setFormData] = useState({
        tipo_usuario: ''
    });

    useEffect(() => {
        getTypes();
    }, []);

    async function getTypes() {
        const data = await http.get("api/usuario/tipos");
        setType(data.tipo_usuario);
    }

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const save = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            const res = await http.post('/api/cliente/', formData);
        } catch (err) {
            console.error(err)
        }
    };

    return (
        <div className="p-5">
            <form onSubmit={save} className="col-12 border shadow p-5 rounded">
                <div className="form-float">
                    <label>Tipo de acesso</label>
                    <select onChange={handleChange} id='tipo_usuario' value={formData.tipo_usuario} className="form-control">
                        <option value=''>Selecione</option>
                        { type && type.map(field => {
                            return <option value={field.id}>{field.nome}</option>
                        })}
                    </select>
                </div>
            </form>
        </div>
    )
}
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useRouter } from 'next/router';
import http from '../../config/http';

export default function CadastroTipoDespesa() {
  const router = useRouter();

  useEffect(() => {
    if (router.query.id != 'novo')
      if (Number(router.query.id))
        getTipoDespesa()
  }, []);

  async function getTipoDespesa() {
    const resData = await http.get(`/api/despesa/tipo_despesa/${router.query.id}`);
    setFormData(resData);
  }

  const [formData, setFormData] = useState({
    id: 0,
    nome: ''
  });

  const [focused, setFocused] = useState<{ [key: string]: boolean }>({});

  const placeholders: { [key: string]: string } = {
    nome: 'Digite o nome'
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: id === 'tipo_despesa' ? parseInt(value) : value });
  };

  const handleFocus = (id: string) => {
    setFocused({ ...focused, [id]: true });
  };

  const handleBlur = (id: string) => {
    setFocused({ ...focused, [id]: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.id === 0) {
      try {
        const res = await http.post('/api/despesa/tipo_despesa/', formData);
        router.push("/lista_tipoDespesa");
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const res = await http.put(`/api/despesa/tipo_despesa/${formData.id}`, formData);
        router.push("/lista_tipoDespesa");
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <div className="d-flex flex-column align-items-center py-5" style={{ minHeight: '75vh' }}>
      <div className="shadow p-4 rounded">
        <button className="btn btn-outline-primary border-end-0 border-start-0 rounded-4" onClick={() => router.push('/lista_tipoDespesa')}>Voltar</button>

        <h2 className="mb-4 text-center">Cadastro de Tipo Despesa</h2>
        <form onSubmit={handleSubmit} className="bg-white" style={{ maxWidth: '1200px', width: '100%', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {Object.entries(formData).map(([key, value]) => (
            <div className="form-group position-relative" key={key} style={{ flex: '1 1 calc(50% - 20px)', minWidth: '230px' }}>


              <InputMask
                value={value as string}
                onChange={handleChange}
                id={key}
                placeholder={focused[key] ? placeholders[key] : ''}
                onFocus={() => handleFocus(key)}
                onBlur={() => handleBlur(key)}
                required={['nome'].includes(key)}
                className="form-control border-0 border-bottom"
              />


              <label
                htmlFor={key}
                className={`position-absolute ${key === 'id' || focused[key] || (value && value.toString().length > 0) ? 'top-0 left-1 text-primary' : 'top-50 left-2'}`}
                style={{
                  transform: 'translateY(-50%)',
                  cursor: 'auto',
                  padding: '0 5px',
                  transition: 'all 0.3s ease',
                  color: key === 'id' || focused[key] || (value && value.toString().length > 0) ? '#007bff' : '#555555',
                  fontSize: key === 'id' || focused[key] || (value && value.toString().length > 0) ? '12px' : 'inherit'
                }}
              >
                {key.replace(/_/g, ' ').toUpperCase()} {['nome'].includes(key) && '*'}
              </label>

            </div>
          ))}
          <div className="col-6 mx-auto text-center w-100">
            <button type="submit" className="btn btn-primary w-50">{formData.id === 0 ? 'Cadastrar' : 'Atualizar Tipo despesa'}</button>
          </div>

        </form>
      </div>
    </div>
  );
}
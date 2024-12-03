import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useRouter } from 'next/router';
import http from '../../config/http';
import SelectSearch from "../../components/SelectSearch";

export default function CadastroTipoDespesa() {
  const router = useRouter();
  const [id_tipo, setTipo] = useState({ value: 0, label: "" });
  const [tiposOptions, setTipos] = useState([]);

  const [formData, setFormData] = useState({
    id: 0,
    data_pagamento: '',
    valor: '',
    tipoDespesa: null
  });

  useEffect(() => {
    fetchTipos();
    if (router.query.id !== "novo") {
      if (Number(router.query.id)) getDespesa();
    }
  }, [router.query.id]);

  async function fetchTipos() {
    try {
      const response = await http.get("/api/despesa/tipos");
      console.log("Resposta da API:", response.data);
      const tiposDespesas = response.tiposDespesas.map((tiposDespesas) => ({
        value: tiposDespesas.id,
        label: tiposDespesas.nome,
      }));
      console.log("Opções mapeadas:", tiposDespesas);
      setTipos(tiposDespesas);
    } catch (error) {
      console.error("Erro ao obter Tipos de despesa:", error);
    }
  }

  async function getDespesa() {
    try {
      const resData = await http.get(`/api/despesa/${router.query.id}`);
      const tipoSelecionado = tiposOptions.find(
        (option) => option.value === resData.data.id_tipo
      );

      setFormData({
        ...resData.data,
        data_pagamento: resData.data.data_pagamento
          ? new Date(resData.data.data_pagamento).toLocaleDateString('pt-BR')
          : '',
        tipoDespesa: tipoSelecionado || null,
      });
      console.log(tipoSelecionado)
      setTipo(tipoSelecionado);
    } catch (err) {
      console.error('Erro ao buscar despesa:', err);
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === 'valor' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      data_pagamento: formData.data_pagamento
        ? formData.data_pagamento.split('/').reverse().join('-')
        : null,
      tipoDespesa: id_tipo.value || null,
    };

    try {
      if (formData.id === 0) {
        await http.post('/api/despesa/', formattedData);
      } else {
        await http.put(`/api/despesa/${formData.id}`, formattedData);
      }
      router.push('/despesas');
    } catch (err) {
      console.error('Erro ao salvar despesa:', err);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center py-5" style={{ minHeight: '75vh' }}>
      <div className="shadow p-4 rounded">
        <button
          className="btn btn-outline-primary border-end-0 border-start-0 rounded-4"
          onClick={() => router.push('/despesas')}
        >
          Voltar
        </button>

        <h2 className="mb-4 text-center">Cadastro de Despesa</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white"
          style={{ maxWidth: '1200px', width: '100%', display: 'flex', flexWrap: 'wrap', gap: '20px' }}
        >
          <div className="form-group position-relative" style={{ flex: '1 1 calc(50% - 20px)', minWidth: '230px' }}>
            <input
              type="number"
              value={formData.id}
              onChange={handleChange}
              id="id"
              placeholder="ID"
              className="form-control border-0 border-bottom"
              readOnly
            />
            <label htmlFor="id" className="position-absolute top-0 left-1 text-primary" style={{
              transform: 'translateY(-50%)', cursor: 'auto', padding: '0 5px', fontSize: '12px', color: '#007bff',
              transition: 'none',
            }}>
              ID
            </label>
          </div>

          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="tipoDespesa" className="form-label">Tipo Despesa*</label>
              {tiposOptions.length > 0 ? (
                <SelectSearch
                  value={{value: 2, label: 'Escritorio'}}
                  onChange={setTipo}
                  options={tiposOptions}
                  required={true}
                />
              ) : (
                <p>Carregando tipos de despesas...</p>
              )}
            </div>
          </div>

          <div className="form-group position-relative" style={{ flex: '1 1 calc(50% - 20px)', minWidth: '230px' }}>
            <InputMask
              value={formData.data_pagamento}
              onChange={handleChange}
              id="data_pagamento"
              mask="99/99/9999"
              placeholder="Digite a data de pagamento"
              required={true}
              className="form-control border-0 border-bottom"
            />
            <label htmlFor="data_pagamento" className="position-absolute top-0 left-1 text-primary" style={{
              transform: 'translateY(-50%)', cursor: 'auto', padding: '0 5px', fontSize: '12px', color: '#007bff',
              transition: 'none',
            }}>
              DATA PAGAMENTO *
            </label>
          </div>

          <div className="form-group position-relative" style={{ flex: '1 1 calc(50% - 20px)', minWidth: '230px' }}>
            <input
              type="number"
              value={formData.valor}
              onChange={handleChange}
              id="valor"
              placeholder="Digite o Valor"
              required={true}
              className="form-control border-0 border-bottom"
            />
            <label htmlFor="valor" className="position-absolute top-0 left-1 text-primary" style={{
              transform: 'translateY(-50%)', cursor: 'auto', padding: '0 5px', fontSize: '12px', color: '#007bff',
              transition: 'none',
            }}>
              VALOR *
            </label>
          </div>

          <div className="col-6 mx-auto text-center w-100">
            <button type="submit" className="btn btn-primary w-50">
              {formData.id === 0 ? 'Cadastrar' : 'Atualizar despesa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


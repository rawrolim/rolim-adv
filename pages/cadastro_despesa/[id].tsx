import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useRouter } from 'next/router';
import http from '../../config/http';
import SelectSearch from "../../components/SelectSearch";

export default function CadastroDespesa() {
  const router = useRouter();
  const [id_tipo, setTipo] = useState({ value: 0, label: "" });
  const [tiposOptions, setTipos] = useState([]);

  const [formData, setFormData] = useState({
    id: 0,
    data_pagamento: '',
    valor: '',
    tipo_despesa: null
  });

  useEffect(() => {
    fetchTipos();
  }, [router.query.id]);

  useEffect(()=>{
    if (router.query.id !== "novo") {
      if (Number(router.query.id)) {
        getDespesa()
      }
    }
  },[tiposOptions]);

  async function fetchTipos() {
    try {
      const response = await http.get("/api/despesa/tipos");
      const tipo_despesas = response.tipo_despesas.map((tipo_despesas) => ({
        value: tipo_despesas.id,
        label: tipo_despesas.nome,
      }));
      setTipos(tipo_despesas);
    } catch (error) {
      console.error("Erro ao obter Tipos de despesa:", error);
    }
  }

  async function getDespesa() {
    try {
      const resData = await http.get(`/api/despesa/${router.query.id}`);
      const tipoSelecionado = tiposOptions.find((tipoDespesaCurrent) => tipoDespesaCurrent.value === resData.tipo_despesa);
  
      const dataFormatada = resData.data_pagamento
        ? new Date(resData.data_pagamento.split('/').reverse().join('-')).toLocaleDateString('pt-BR')
        : '';

      setFormData({
        ...resData,
        data_pagamento: dataFormatada,
      });

      if (tipoSelecionado) {
        setTipo(tipoSelecionado);
      }
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
      tipo_despesa: id_tipo?.value || null,
    };

    try {
      if (formData.id === 0) {
        await http.post('/api/despesa', formattedData);
      } else {
        await http.put(`/api/despesa/${formData.id}`, formattedData);
      }
      router.push('/despesas');
    } catch (error) {
      console.error('Erro ao salvar despesa:', error);
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
          className="bg-white d-flex flex-wrap"
          style={{ maxWidth: '1200px', width: '100%', display: 'flex', flexWrap: 'wrap', gap: '20px' }}
        >
          <div className="form-group col-12 col-sm-2">
            <label htmlFor="id">ID</label>
            <input
              type="number"
              value={formData.id}
              onChange={handleChange}
              id="id"
              placeholder="ID"
              className="form-control border-0 border-bottom"
              readOnly
            />
          </div>

          <div className="col-12 col-sm-3">
            <label >Tipo Despesa*</label>
            {tiposOptions.length > 0 ? (
              <SelectSearch
                value={id_tipo}
                onChange={setTipo}
                options={tiposOptions}
                required={true}
              />
            ) : (
              <p>Carregando tipos de despesas...</p>
            )}
          </div>

          <div className="col-12 col-sm-3">
            <label htmlFor="data_pagamento">DATA PAGAMENTO</label>
            <InputMask
              value={formData.data_pagamento}
              onChange={handleChange}
              id="data_pagamento"
              mask="99/99/9999"
              placeholder="Digite a data de pagamento"
              required={true}
              className="form-control border-0 border-bottom"
            />
          </div>

          <div className="col-12 col-sm-3">
            <label htmlFor="valor">VALOR</label>
            <input
              type="number"
              value={formData.valor}
              step="0.01"
              onChange={handleChange}
              id="valor"
              placeholder="Digite o Valor"
              required={true}
              className="form-control border-0 border-bottom"
            />
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


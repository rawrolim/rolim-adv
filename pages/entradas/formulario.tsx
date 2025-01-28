import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useRouter } from 'next/router';
import http from '../../config/http';
import SelectSearch from "../../components/SelectSearch";

export default function CadastroDespesa() {
  const router = useRouter();
  const [id_processo, setProcesso] = useState({ value: 0, label: "" });
  const [processosOptions, setProcessos] = useState([]);

  const [formData, setFormData] = useState({
    id: 0,
    data_entrada: '',
    valor: '',
    processo_id: null
  });

  useEffect(() => {
    fetchprocessos();
  }, [router.query.id]);

  useEffect(()=>{
    if (router.query.id !== "novo") {
      if (Number(router.query.id)) {
        getProcesso()
      }
    }
  },[processosOptions]);

  async function getProcesso() {
    try {
      const resData = await http.get(`/api/entrada/${router.query.id}`);
      const processoSelecionado = processosOptions.find((processoCurrent) => processoCurrent.value === resData.processo_id);
  
      const dataFormatada = resData.data_entrada
        ? new Date(resData.data_entrada.split('/').reverse().join('-')).toLocaleDateString('pt-BR')
        : '';

      setFormData({
        ...resData,
        data_entrada: dataFormatada,
      });

      if (processoSelecionado) {
        setProcesso(processoSelecionado);
      }
    } catch (err) {
      console.error('Erro ao buscar entrada:', err);
    }
  }

  async function fetchprocessos() {
    try {
      const response = await http.get("/api/entrada/processos");
      const processos = response.processos.map((processos) => ({
        value: processos.id,
        label: processos.numero_processo,
      }));
      setProcessos(processos);
    } catch (error) {
      console.error("Erro ao obter Tipos de despesa:", error);
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
      data_entrada: formData.data_entrada
        ? formData.data_entrada.split('/').reverse().join('-')
        : null,
      processo_id: id_processo?.value || null,
    };

    try {
      if (formData.id === 0) {
        await http.post('/api/entrada', formattedData);
      } else {
        await http.put(`/api/entrada/${formData.id}`, formattedData);
      }
      router.push('/entradas');
    } catch (error) {
      console.error('Erro ao salvar entrada:', error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center py-5" style={{ minHeight: '75vh' }}>
      <div className="shadow p-4 rounded">
        <button
          className="btn btn-outline-primary border-end-0 border-start-0 rounded-4"
          onClick={() => router.push('/entradas')}
        >
          Voltar
        </button>

        <h2 className="mb-4 text-center">Cadastro de Entrada</h2>
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
            <label >Processo*</label>
            {processosOptions.length > 0 ? (
              <SelectSearch
                value={id_processo}
                onChange={setProcesso}
                options={processosOptions}
                required={true}
              />
            ) : (
              <p>Carregando processos...</p>
            )}
          </div>

          <div className="col-12 col-sm-3">
            <label htmlFor="data_entrada">DATA ENTRADA</label>
            <InputMask
              value={formData.data_entrada}
              onChange={handleChange}
              id="data_entrada"
              mask="99/99/9999"
              placeholder="Digite a data de entrada"
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
              {formData.id === 0 ? 'Cadastrar' : 'Atualizar entrada'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


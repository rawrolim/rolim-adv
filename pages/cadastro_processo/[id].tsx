import React, { useEffect, useState } from "react";
import http from "../../config/http";
import { useRouter } from "next/router";
import styles from "../../styles/formCliente.module.css";
import SelectSearch from "../../components/SelectSearch";
import InputField from "../../components/inputField";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function CadastroProceso() {
  const router = useRouter();
  const [id_advogado, setAdvogado] = useState({ value: 0, label: "" });
  const [cliente_id, setCliente] = useState([{ value: 0, label: "" }]);
  const [advogadosOptions, setAdvogadosOptions] = useState([]);
  const [clientesOptions, setClientesOptions] = useState([]);
  const [formData, setFormData] = useState({
    id: 0,
    advogado: null,
    numero_processo: "",
    instancia: "",
    tribunal: "",
    numero_orgao: "",
    natureza: "",
    motivo: "",
    comarca: "",
    valor_causa: "",
    data_distribuicao: "",
    valor_contrato: "",
    parcelas: "",
    entrada: "",
    inicio_prestacao: "",
        primeira_rescisao: '',
        segunda_rescisao: '',
        terceira_rescisao: '',
        percent_final_processo: '',
    clientes: [],
    reus: [],
  });

  useEffect(() => {
    fetchAdvogadosClientes();
    if (router.query.id !== "novo") {
      if (Number(router.query.id)) getProcesso();
    }
  }, []);

  useEffect(() => {
    formData.reus.forEach(async (reu, index) => {
      if (reu.cep_reu && reu.cep_reu.length === 8) {
        await fetchEnderecoByCep(reu.cep_reu, index);
      }
    });
  }, [formData.reus]);

  async function fetchEnderecoByCep(cep, index) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        console.error("CEP não encontrado");
        return;
      }
      setFormData((prevFormData) => {
        const newReus = [...prevFormData.reus];
        newReus[index] = {
          ...newReus[index],
          endereco_reu: `${data.logradouro}, ${data.bairro} - ${data.localidade} - ${data.uf}`,
          endereco_numero_reu: "",
          endereco_complemento_reu: data.complemento || "",
          cep_reu: data.cep,
        };
        return { ...prevFormData, reus: newReus };
      });
    } catch (error) {
      console.error("Erro ao buscar endereço pelo CEP:", error);
    }
  }

  async function fetchAdvogadosClientes() {
    try {
      const response = await http.get("/api/processo");
      const advogados = response.advogados.map((advogados) => ({
        value: advogados.id,
        label: advogados.nome,
      }));
      const clientes = response.clientes.map((clientes) => ({
        value: clientes.id,
        label: clientes.nome,
      }));
      setAdvogadosOptions(advogados);
      setClientesOptions(clientes);
    } catch (error) {
      console.error("Erro ao obter advogados e clientes:", error);
    }
  }

  async function getProcesso() {
    try {
      const resData = await http.get(`/api/processo/${router.query.id}`);
      console.log(resData);
      setFormData({
        id: resData.processo.id || 0,
        advogado: resData.processo.advogado || null,
        numero_processo: resData.processo.numero_processo || "",
        instancia: resData.processo.instancia || "",
        tribunal: resData.processo.tribunal || "",
        numero_orgao: resData.processo.numero_orgao || "",
        natureza: resData.processo.natureza || "",
        motivo: resData.processo.motivo || "",
        comarca: resData.processo.comarca || "",
        valor_causa: resData.processo.valor_causa || "",
        data_distribuicao: resData.processo.data_distribuicao || "",
        valor_contrato: resData.processo.valor_contrato || "",
        parcelas: resData.processo.parcelas || "",
        entrada: resData.processo.entrada || "",
        inicio_prestacao: resData.processo.inicio_prestacao || "",
                primeira_rescisao: resData.processo.primeira_rescisao || '',
                segunda_rescisao: resData.processo.segunda_rescisao || '',
                terceira_rescisao: resData.processo.terceira_rescisao || '',
                percent_final_processo: resData.processo.percent_final_processo || '',
        clientes: resData.clientes || [],
        reus: resData.reus || [],
      });

      let auxClientes = [];
      (
        resData.clientes as Array<{ nome_cliente: String; cliente_id: number }>
      ).forEach((c) =>
        auxClientes.push({ value: c.cliente_id, label: c.nome_cliente })
      );

      setAdvogado({
        value: resData.processo.advogado,
        label: resData.processo.nome_advogado,
      });
      setCliente(auxClientes);
    } catch (error) {
      console.error("Erro ao obter o Processo:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
        advogado: id_advogado ? id_advogado.value : null,
        clientes: formData.clientes.map((cliente) => ({
          cliente_id: cliente.cliente_id ? cliente.cliente_id.value : null,
        })),
      };
      if (formData.id === 0) {
        await http.post("/api/processo/", updatedFormData);
      } else {
        await http.put(`/api/processo/${formData.id}`, updatedFormData);
      }
      router.push("/processos/0");
    } catch (error) {
      console.error("Erro ao salvar o processo:", error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleReuChange = (index, id, value) => {
    const newReus = [...formData.reus];
    newReus[index] = {
      ...newReus[index],
      [id]: value,
    };
    setFormData((prevFormData) => ({ ...prevFormData, reus: newReus }));
  };

  const handleClienteChange = (index, value) => {
    const newClientes = [...formData.clientes];
    newClientes[index] = {
      ...newClientes[index],
      cliente_id: value.value,
    };

    const auxClientes = [...cliente_id];
    auxClientes[index] = {
      value: value.value,
      label: value.label
    };
    setFormData((prevFormData) => ({ ...prevFormData, clientes: newClientes }));
    setCliente(auxClientes);
  };

  const addReu = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      reus: [
        ...prevFormData.reus,
        {
          nome_reu: "",
          tp_reu: "Física",
          cpf_reu: "",
          cnpj_reu: "",
          nome_representante_reu: "",
          estado_civil_reu: "",
          rg_reu: "",
          email_reu: "",
          numero_reu: "",
          cep_reu: "",
          endereco_reu: "",
          endereco_numero_reu: "",
          endereco_complemento_reu: "",
          sexo_reu: "",
          profissao_reu: "",
          cnh_reu: "",
        },
      ],
    }));
  };
  const addCliente = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      clientes: [
        ...prevFormData.clientes,
        {
          cliente_id: null,
        },
      ],
    }));

    setCliente((prevcliente) => [...prevcliente, { value: 0, label: "" }]);
  };

  const removeReu = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      reus: prevFormData.reus.filter((_, i) => i !== index),
    }));
  };
  const removeCliente = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      clientes: prevFormData.clientes.filter((_, i) => i !== index),
    }));
  };

  const ClienteForm = ({ cliente, index, onChange, onRemove }) => (
    <div className="row g-4 mt-3">
      <div className="col-md-12">
        <div className="mb-3">
          <label htmlFor={`cliente_id_${index}`} className="form-label">
            Cliente *
          </label>
          <SelectSearch
            value={cliente}
            onChange={(value) => onChange(index, value)}
            options={clientesOptions}
            required
          />
        </div>
      </div>
      <div className="w-100">
        <button
          type="button"
          className="btn btn-danger mb-2 w-25"
          onClick={() => onRemove(index)}
        >
          Remover Cliente
        </button>
      </div>
    </div>
  );

  const [step, setStep] = useState(1);
  const handleStepProximo = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };
  const handleStepVoltar = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.conteudoform}>
          <h2 className={styles.h2}>Formulário de Processo</h2>
          <button
            className={styles.buttonVoltar}
            onClick={() => router.push("/processos/0")}
          >
            Voltar
          </button>
          {step === 1 && (
            <>
              <div className="d-flex justify-content-center grid gap-5">
                <div className="etapa1">
                  <div className="border border-3 border-primary rounded-circle d-flex p-4 w-25 mx-auto"></div>
                  <br />
                  <span>Informações</span>
                  <div className="mt2">
                    <div className="text-center">Processos</div>
                  </div>
                </div>
                <div className="etapa2">
                  <div className="border border-3 border-gray rounded-circle d-flex p-4 w-25 mx-auto"></div>
                  <br />
                  <span>Seleção</span>
                  <span> Clientes</span>
                </div>

                <div className="etapa3">
                  <div className="border border-3 border-gray rounded-circle d-flex p-4 w-25 mx-auto"></div>
                  <br />
                  <span>Seleção</span>
                  <span> Réus</span>
                </div>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="d-flex justify-content-center grid gap-5">
                <div className="etapa1">
                  <div className="border border-3 bg-primary border-primary rounded-circle d-flex p-4 w-25 mx-auto"></div>
                  <br />
                  <span>Informações</span>
                  <div className="mt2">
                    <div className="text-center">Processos</div>
                  </div>
                </div>
                <div className={styles.linha}></div>
                <div className="etapa2">
                  <div className="border border-3  border-primary rounded-circle d-flex p-4 w-25 mx-auto"></div>
                  <br />
                  <span>Seleção</span>
                  <span> Clientes</span>
                </div>
                <div className="etapa3">
                  <div className="border border-3 border-gray rounded-circle d-flex p-4 w-25 mx-auto"></div>
                  <br />
                  <span>Seleção</span>
                  <span> Réus</span>
                </div>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className="d-flex justify-content-center grid gap-5">
                <div className="etapa1">
                  <div className="border border-3 bg-primary border-primary rounded-circle d-flex p-4 w-25 mx-auto"></div>
                  <br />
                  <span>Informações</span>
                  <div className="mt2">
                    <div className="text-center">Processos</div>
                  </div>
                </div>
                <div className={styles.linha2}></div>
                <div className="etapa2">
                  <div className="border border-3 bg-primary border-primary rounded-circle d-flex p-4 w-25 mx-auto"></div>
                  <br />
                  <span>Seleção</span>
                  <span> Clientes</span>
                </div>
                <div className={styles.linha3}></div>
                <div className="etapa3">
                  <div className="border border-3 border-primary rounded-circle d-flex p-4 w-25 mx-auto"></div>
                  <br />
                  <span>Seleção</span>
                  <span> Réus</span>
                </div>
              </div>
            </>
          )}
          <form onSubmit={handleSubmit} className="row g-3 mt-3">
            {step === 1 && (
              <>
                <div className="col-md-4">
                  <InputField
                    id="id"
                    label="ID"
                    type="text"
                    disabled={true}
                    value={formData["id"]}
                  />
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="advogado" className="form-label">
                      Advogado *
                    </label>
                    <SelectSearch
                      value={id_advogado}
                      onChange={setAdvogado}
                      options={advogadosOptions}
                      required={true}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <InputField
                    onChange={handleInputChange}
                    value={formData["numero_processo"]}
                    id="numero_processo"
                    label="Número processo"
                    type="text"
                    placeholder="Digite o número do processo"
                  />
                </div>
                <div className="col-md-4">
                  <InputField
                    onChange={handleInputChange}
                    value={formData["instancia"]}
                    id="instancia"
                    label="Instância"
                    type="text"
                    placeholder="Digite a instância"
                  />
                </div>
                <div className="col-md-4">
                  <InputField
                    onChange={handleInputChange}
                    value={formData["tribunal"]}
                    id="tribunal"
                    label="Tribunal"
                    type="text"
                    placeholder="Digite o tribunal"
                  />
                </div>
                <div className="col-md-4">
                  <InputField
                    onChange={handleInputChange}
                    value={formData["numero_orgao"]}
                    id="numero_orgao"
                    label="Número Orgão"
                    type="text"
                    placeholder="Digite o Número do Orgão"
                  />
                </div>
                <div className="col-md-4">
                  <InputField
                    onChange={handleInputChange}
                    value={formData["natureza"]}
                    id="natureza"
                    label="Natureza"
                    type="text"
                    placeholder="Digite a Natureza"
                  />
                </div>
                <div className="col-md-4">
                  <InputField
                    onChange={handleInputChange}
                    value={formData["motivo"]}
                    id="motivo"
                    label="Motivo"
                    type="text"
                    placeholder="Digite o Motivo"
                  />
                </div>
                <div className="col-md-4">
                  <InputField
                    onChange={handleInputChange}
                    value={formData["comarca"]}
                    id="comarca"
                    label="Comarca"
                    type="text"
                    placeholder="Digite a Comarca"
                  />
                </div>
                <div className="col-md-4">
                  <InputField
                    onChange={handleInputChange}
                    value={formData["valor_causa"]}
                    id="valor_causa"
                    label="Valor da Causa"
                    type="text"
                    placeholder="Digite o Valor da Causa"
                  />
                </div>
                <div className="col-md-4">
                  <InputField
                    onChange={handleInputChange}
                    value={formData["data_distribuicao"]}
                    id="data_distribuicao"
                    label="Data Distribuição"
                    type="date"
                  />
                </div>
                <div className="col-md-4">
                  <InputField
                    onChange={handleInputChange}
                    value={formData["valor_contrato"]}
                    id="valor_contrato"
                    label="Valor do Contrato"
                    type="text"
                    placeholder="Digite o Valor do Contrato"
                  />
                </div>
                <div className="col-md-4">
                  <InputField
                    onChange={handleInputChange}
                    value={formData["parcelas"]}
                    id="parcelas"
                    label="Parcelas"
                    type="number"
                    placeholder="Digite a Quantidade de Parcelas"
                  />
                </div>
                <div className="col-md-4">
                  <InputField
                    onChange={handleInputChange}
                    value={formData["entrada"]}
                    id="entrada"
                    label="Entrada"
                    type="text"
                    placeholder="Digite o Valor de Entrada"
                  />
                </div>
                <div className="col-md-4">
                  <InputField
                    onChange={handleInputChange}
                    value={formData["inicio_prestacao"]}
                    id="inicio_prestacao"
                    label="Início Prestação"
                    type="date"
                  />
                </div>

                                <div className="col-md-4">
                                    <InputField onChange={handleInputChange} value={formData['primeira_rescisao']} id='primeira_rescisao' label='Primeira Rescisão' type='text' placeholder='Digite o valor da Rescisão' />
                                </div>
                                <div className="col-md-4">
                                    <InputField onChange={handleInputChange} value={formData['segunda_rescisao']} id='segunda_rescisao' label='Segunda Rescisão' type='text' placeholder='Digite o valor da Rescisão' />
                                </div>
                                <div className="col-md-4">
                                    <InputField onChange={handleInputChange} value={formData['terceira_rescisao']} id='terceira_rescisao' label='Terceira Rescisão' type='text' placeholder='Digite o valor da Rescisão' />
                                </div>
                                <div className="col-md-4">
                                    <InputField onChange={handleInputChange} value={formData['percent_final_processo']} id='percent_final_processo' label='Percentual Final do Processo' type='text' placeholder='Digite o Percentual do Final do Processo' />
                                </div>
              </>
            )}
            {step === 2 && (
              <>
                {cliente_id &&
                  cliente_id.map((cliente, index) => (
                    <div
                      key={index}
                      className="col-md-12 mb-3 border border-3 p-3 rounded"
                    >
                      <div>
                        <h5>Autor {index + 1}</h5>
                        <ClienteForm
                          cliente={cliente}
                          index={index}
                          onChange={handleClienteChange}
                          onRemove={removeCliente}
                        />
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="btn btn-secondary w-25 mb-3"
                  onClick={addCliente}
                >
                  {formData.clientes.length === 0
                    ? "Adicionar um Autor"
                    : "Adicionar Autor"}
                </button>
              </>
            )}
            {step === 3 && (
              <>
                {formData.reus &&
                  formData.reus.map((reu, index) => (
                    <div
                      key={index}
                      className="col-md-12 mb-3 border border-3 p-3 rounded"
                    >
                      <div>
                        <h5>
                          Réu Pessoa {reu.tp_reu} {index + 1}
                        </h5>
                        {/* <ReuForm reu={reu} index={index} onChange={handleReuChange} onRemove={removeReu} /> */}
                        <div className="row g-3 mt-3">
                          <div className="col-md-4">
                            <InputField
                              id="nome_reu"
                              label="Nome do Réu"
                              placeholder="Digite o Nome do Reú"
                              type="text"
                              value={reu.nome_reu}
                              onChange={(e) => handleReuChange(index, e.target.id, e.target.value)}
                            />
                          </div>
                          <div className="col-md-4">
                            <label
                              htmlFor={`tp_reu_${index}`}
                              className="form-label"
                            >
                              Tipo de Réu
                            </label>
                            <select
                              id={`tp_reu_${index}`}
                              className="form-select"
                              value={reu.tp_reu}
                              onChange={(e) => handleReuChange(index, e.target.id, e.target.value)}
                            >
                              <option value="Física">Física</option>
                              <option value="Jurídica">Jurídica</option>
                            </select>
                          </div>
                          {reu.tp_reu === "Física" && (
                            <>
                              <div className="col-md-4">
                                <InputField
                                  id="cpf_reu"
                                  label="CPF"
                                  type="text"
                                  placeholder="Digite o CPF do Reú"
                                  value={reu.cpf_reu}
                                  onChange={(e) => handleReuChange(index, e.target.id, e.target.value)}
                                />
                              </div>
                              <div className="col-md-4">
                                <InputField
                                  id="rg_reu"
                                  label="RG"
                                  type="text"
                                  placeholder="Digite o RG do Reú"
                                  value={reu.rg_reu}
                                  onChange={(e) => handleReuChange(index, e.target.id, e.target.value)}
                                />
                              </div>
                              <div className="col-md-4">
                                <InputField
                                  id="cnh_reu"
                                  label="CNH"
                                  type="text"
                                  placeholder="Digite a CNH do Reú"
                                  value={reu.cnh_reu}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </>
                          )}
                          {reu.tp_reu === "Jurídica" && (
                            <>
                              <div className="col-md-4">
                                <InputField
                                  id="cnpj_reu"
                                  label="CNPJ"
                                  type="text"
                                  placeholder="Digite o CNPJ do Reú"
                                  value={reu.cnpj_reu}
                                  onChange={(e) => handleReuChange(index, e.target.id, e.target.value)}
                                />
                              </div>
                              <div className="col-md-4">
                                <InputField
                                  id="nome_representante_reu"
                                  label="Nome do Representante"
                                  placeholder="Digite o Nome do Representante do Reú"
                                  type="text"
                                  value={reu.nome_representante_reu}
                                  onChange={(e) => handleReuChange(index, e.target.id, e.target.value)}
                                />
                              </div>
                            </>
                          )}
                          <div className="col-md-4">
                            <InputField
                              id="email_reu"
                              label="E-mail"
                              placeholder="Digite o email do Reú"
                              type="email"
                              value={reu.email_reu}
                              onChange={(e) => handleReuChange(index, e.target.id, e.target.value)}
                            />
                          </div>
                          <div className="col-md-4">
                            <InputField
                              id="numero_reu"
                              label="Número"
                              type="text"
                              placeholder="Digite o Telefone do Reú"
                              value={reu.numero_reu}
                              onChange={(e) => handleReuChange(index, e.target.id, e.target.value)}
                            />
                          </div>
                          <div className="col-md-4">
                            <InputField
                              id="cep_reu"
                              label="CEP"
                              type="text"
                              placeholder="Digite o Cep do Reú"
                              value={reu.cep_reu}
                              onChange={(e) => handleReuChange(index, e.target.id, e.target.value)}
                            />
                          </div>
                          <div className="col-md-4">
                            <InputField
                              id="endereco_reu"
                              label="Endereço"
                              placeholder="Digite o Endereço"
                              type="text"
                              value={reu.endereco_reu}
                              onChange={(e) => handleReuChange(index, e.target.id, e.target.value)}
                            />
                          </div>
                          <div className="col-md-4">
                            <InputField
                              id="endereco_numero_reu"
                              label="Número"
                              placeholder="Digite o Número do Endereço"
                              type="text"
                              value={reu.endereco_numero_reu}
                              onChange={(e) => handleReuChange(index, e.target.id, e.target.value)}
                            />
                          </div>
                          <div className="col-md-4">
                            <InputField
                              id="endereco_complemento_reu"
                              placeholder="Digite o complemento Endereço"
                              label="Complemento"
                              type="text"
                              value={reu.endereco_complemento_reu}
                              onChange={(e) => handleReuChange(index, e.target.id, e.target.value)}
                            />
                          </div>

                          <div className="col-md-4">
                            <label htmlFor={`sexo_reu`} className="form-label">
                              Sexo
                            </label>
                            <select
                              id={`sexo_reu`}
                              className="form-select"
                              value={reu.sexo_reu}
                              onChange={(e) => handleReuChange(index, e.target.id, e.target.value)}
                            >
                              <option value="">Selecione o Sexo</option>
                              <option value="Masculino">Masculino</option>
                              <option value="Feminino">Feminino</option>
                              <option value="Não Informado">
                                Prefiro não Informar
                              </option>
                            </select>
                          </div>

                          <div className="col-md-4">
                            <label
                              htmlFor={`estado_civil_reu`}
                              className="form-label"
                            >
                              Estado Civil
                            </label>
                            <select
                              id={`estado_civil_reu`}
                              className="form-select"
                              value={reu.estado_civil_reu}
                              onChange={(e) => handleReuChange(index, e.target.id, e.target.value)}
                            >
                              <option value="">Selecione o Estado Civil</option>
                              <option value="Solteiro">Solteiro(a)</option>
                              <option value="Casado">Casado(a)</option>
                              <option value="Divorciado">Divorciado(a)</option>
                              <option value="Viúvo">Viúvo(a)</option>
                              <option value="Outros">Outros(a)</option>
                              <option value="Separado">
                                Separado(a) Judicialmente
                              </option>
                              <option value="União Estável">
                                União Estável
                              </option>
                            </select>
                          </div>

                          <div className="col-md-4">
                            <InputField
                              id="profissao_reu"
                              label="Profissão"
                              placeholder="Digite a profissão"
                              type="text"
                              value={reu.profissao_reu}
                              onChange={(e) => handleReuChange(index, e.target.id, e.target.value)}
                            />
                          </div>
                          <div className="w-100">
                            <button
                              type="button"
                              className="btn btn-danger mb-2 w-25"
                              onClick={() => removeReu(index)}
                            >
                              Remover Réu
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="btn btn-secondary w-25 mb-3"
                  onClick={addReu}
                >
                  {formData.reus.length === 0
                    ? "Adicionar um Réu"
                    : "Adicionar Réu"}
                </button>

                <div className="col-6 mx-auto text-center w-100">
                  <button type="submit" className="btn btn-primary w-50">
                    {formData.id === 0
                      ? "Criar Processo"
                      : "Atualizar Processo"}
                  </button>
                </div>
              </>
            )}

            <div className="actions row">
              {step > 1 && (
                <div className="col-2">
                  <button
                    type="button"
                    className="btn btn-block btn-primary"
                    onClick={handleStepVoltar}
                  >
                    <GrFormPrevious />
                    <span>Voltar</span>
                  </button>
                </div>
              )}

              {step < 3 && (
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-block btn-primary"
                    onClick={handleStepProximo}
                  >
                    <span>Avançar</span>
                    <GrFormNext />
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

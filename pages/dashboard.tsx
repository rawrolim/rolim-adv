import Head from "next/head";
import useLoacalStorage from "../hooks/useLocalStorage";
import Card from "../components/card";
import Chart from "../components/chart";
import Table from "../components/table";
import { Filter } from "../components/filter";
import http from "../config/http";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [token, setToken] = useLoacalStorage("authorization", "");
  const [data, setData] = useState({
    clientesAtivos: 0,
    clientesTotal: 0,
    processosAtivos: 0,
    usuariosAtivos: 0,
    Advogados: [],
    mes: [],
    Clientes: [],
    ano: []
  });

  useEffect(() => {
    async function getDashboardData() {
      const dashboardData = await http.get("/api/dashboard");
      setData(dashboardData);
    }
    getDashboardData();
  }, []);


  const chartDataExample = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Processos",
        data: [65, 59, 80, 81, 56],
        fill: false,
        borderColor: "blue",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <main>
        <div className="container-full text-center p-5 bg-body-tertiary">
          <h1 className="text-center">Dashboard</h1>
          <div className="row">
            <div className="col-md-2 bg-body-secondary border-5">
              <div className="container-full">
                <h3 className="m-4">Filtros</h3>
                <Filter dataInit={data.mes} select={data.mes} title={"Selecione o mês"} />
                <Filter dataInit={data.ano} select={data.ano} title={"Selecione o ano"} />
                <Filter dataInit={data.Advogados} select={data.Advogados} title={"Selecione o advogado"} />
                <Filter dataInit={data.Clientes} select={data.Clientes} title={"Selecione o cliente"} />
              </div>
            </div>
            <div className="col-md-10">
              <div className="row my-4">
                <div className="col mx-2">
                  <Card data={data.clientesAtivos} cardTitle={"Clientes Ativos"} />
                </div>
                <div className="col mx-2">
                  <Card data={data.processosAtivos} cardTitle={"Processos Ativos"} />
                </div>
                <div className="col mx-2">
                  <Card data={data.clientesTotal} cardTitle={"Total de Clientes"} />
                </div>
                <div className="col mx-2">
                  <Card data={data.processosAtivos} cardTitle={"Total de Processos"} />
                </div>
              </div>
              <div className="row">
                <div className="col-6 mx-3">
                  <Chart data={chartDataExample} title={"Processos por mês"} type={"line"} />
                </div>
                <div className="col-5 mx-3">
                  <Table
                    dataInit={data.Advogados}
                    title={"Advogados"}
                    showFilter={true}
                    columns={[
                      {
                        name: 'Nome',
                        field: 'nome'
                      },
                      {
                        name: 'E-mail',
                        field: 'email'
                      }
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
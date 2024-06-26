import Head from "next/head";
import useLoacalStorage from "../hooks/useLocalStorage";
import Card from "../components/card";
import Chart from "../components/chart";
import Table from "../components/table";
import Filter from "../components/filter";

export default function Dashboard() {
  const [token, setToken] = useLoacalStorage("authorization", "");
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
                <Filter data={["10"]} title={"Selecione o mês"} />
                <Filter data={["10"]} title={"Selecione o ano"} />
                <Filter data={["10"]} title={"Selecione o advogado"} />
                <Filter data={["10"]} title={"Selecione o cliente"} />
              </div>
            </div>
            <div className="col-md-10">
              <div className="row my-4">
                <div className="col mx-2">
                  <Card data={"32"} cardTitle={"Clientes Ativos"} />
                </div>
                <div className="col mx-2">
                  <Card data={"152"} cardTitle={"Processos Ativos"} />
                </div>
                <div className="col mx-2">
                  <Card data={"265"} cardTitle={"Total de Clientes"} />
                </div>
                <div className="col mx-2">
                  <Card data={"7592"} cardTitle={"Total de Processos"} />
                </div>
              </div>
              <div className="row">
                <div className="col-6 mx-3">
                  <Chart
                    data={chartDataExample}
                    title={"Processos por mês"}
                    type={"line"}
                  />
                </div>
                <div className="col-5 mx-3">
                  <Table
                    dataInit={[]}
                    title={"Últimas atualizações"}
                    showFilter={false}
                    columns={[
                      "ID",
                      "Data",
                      "Processo",
                      "Advogado",
                      "Atualização",
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

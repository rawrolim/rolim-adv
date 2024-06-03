import React from "react";
import { Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js";
import { Line, Bar, Scatter, Bubble } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export function Chart({ data, title, type }) {
  
    switch(type) {
      case "line":
        return (<div className="card">
        <div className="card-header bg-primary text-white">{title}</div>
        <div className="card-body">
            <Line data={data}/>
        </div>
    </div>
    )

    case "bar":
      return (
        <div className="card">
          <div className="card-header bg-primary text-white">{title}</div>
          <div className="card-body">
            <Bar data={data}/>
          </div>
        </div>
    )

    case "bubble":
      return (
        <div className="card">
          <div className="card-header bg-primary text-white">{title}</div>
          <div className="card-body">
            <Bubble data={data}/>
          </div>
        </div>
    )

    case "scatter":
      return (
        <div className="card">
          <div className="card-header bg-primary text-white">{title}</div>
          <div className="card-body">
            <Scatter data={data}/>
          </div>
        </div>
    )

    default: 
      return (<div className="card">
          <div className="card-header bg-primary text-white">{title}</div>
          <div className="card-body">
              <Line data={data}/>
          </div>
      </div>
    )
  }
}

export default Chart;

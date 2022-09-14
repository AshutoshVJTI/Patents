import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartProps, Dataset, patent } from "../../Types/types";
import randomBackgroundColor from "../../Utils/randomBackgroundColor";
import './chart.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = (props: ChartProps) => {
  const { data } = props;
  const [labels, setLabels] = useState<string[]>([]);
  const [cpcCodes, setCpcCodes] = useState<any[]>([]);
  const [dataset, setDataset] = useState<Dataset[]>([]);

  useEffect(() => {
    if (data.patents) {
      const dates: string[] = data.patents.map(
        (item: patent) => item.patent_date
      );
      const uniqueDates = dates.filter(
        (item, idx, arr) => arr.indexOf(item) === idx
      );
      setLabels(uniqueDates);
    }
  }, [data.patents]);

  useEffect(() => {
    if (data.patents) {
      const cpc = data.patents.map((item) => item.cpcs[0].cpc_section_id);
      const cpcCount = cpc.reduce((accumulator, value) => {
        return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };
      }, {});
      setCpcCodes(cpcCount);
    }
  }, [data.patents]);

  useEffect(() => {
    for (let i = 0; i < Object.keys(cpcCodes).length; i++) {
      const datasetItem = {
        label: Object.keys(cpcCodes)[i],
        data: [Object.values(cpcCodes)[i]],
        backgroundColor: randomBackgroundColor(),
      };
      setDataset((dataset) => [...dataset, datasetItem]);
    }
    return () => {
      setDataset([]);
    };
  }, [cpcCodes]);

  const options = {
    maintainAspectRatio : false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const chartData = {
    labels,
    datasets: dataset,
  };

  return (
    <div className="root">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Chart;

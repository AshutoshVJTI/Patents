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
import { ChartProps, patent } from "../../Types/types";
import randomBackgroundColor from "../../Utils/randomBackgroundColor";
import "./chart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const labels = ["A", "B", "C", "D", "E", "F", "G", "H", "Y"];

const Chart = (props: ChartProps) => {
  const { data } = props;
  const [dates, setDates] = useState<string[]>([]);
  const [sortedDates, setSortedDates] = useState<any[]>([]);
  const [cpcCodes, setCpcCodes] = useState<any[]>([]);
  const [labelCpcCounts, setLabelCpcCounts] = useState<any>([]);

  useEffect(() => {
    if (data.patents) {
      const dates: string[] = data.patents.map((item: patent) =>
        item.patent_date.slice(0, -3)
      );
      const uniqueDates = dates.filter(
        (item, idx, arr) => arr.indexOf(item) === idx
      );
      setDates(uniqueDates);
    }
  }, [data.patents]);

  useEffect(() => {
    for (let i = 0; i < dates.length; i++) {
      const sortedArr = data.patents.filter(
        (item) => item.patent_date.slice(0, -3) === dates[i]
      );
      setSortedDates((sortedDates) => [...sortedDates, sortedArr]);
    }
  }, [data.patents, dates]);

  useEffect(() => {
    if (data.patents) {
      for (let i = 0; i < sortedDates.length; i++) {
        const cpc = sortedDates[i].map(
          (item: any) => item.cpcs[0].cpc_section_id
        );
        const cpcCount = cpc.reduce((accumulator: any, value: any) => {
          return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };
        }, {});
        setCpcCodes((cpcCodes) => [...cpcCodes, cpcCount]);
      }
    }
  }, [data.patents, sortedDates]);

  useEffect(() => {
    const sortedObj = Object.fromEntries(Object.entries(cpcCodes).sort())
    for (let i = 0; i < labels.length; i++) {
      for (let j = 0; j < cpcCodes.length; j++) {
        let num: any = 0;
        if (Object.keys(sortedObj[j]).includes(labels[i])) {
          num = Object.values(sortedObj[j])[0];
          delete sortedObj[j][Object.keys(sortedObj[j])[0]];
        }
        setLabelCpcCounts((labelCpcCounts: any) => [...labelCpcCounts, num]);
      }
    }
  }, [cpcCodes]);

  const dataset = labels.map((item, index) => {
    return {
      label: item,
      data: labelCpcCounts.slice(
        (labelCpcCounts.length / 9) * index,
        (labelCpcCounts.length / 9) * (index + 1)
      ),
      backgroundColor: randomBackgroundColor(),
    };
  });

  const options = {
    maintainAspectRatio: false,
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
    labels: dates,
    datasets: dataset,
  };

  return (
    <div className="root">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Chart;

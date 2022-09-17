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
  const [sortedDates, setSortedDates] = useState<patent[][]>([]);
  const [cpcCodes, setCpcCodes] = useState<{ [key: string]: number }[]>([]);
  const [labelCpcCounts, setLabelCpcCounts] = useState<number[]>([]);

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
    dates.map((date) => {
      const sortedArr = data.patents.filter(
        (item) => item.patent_date.slice(0, -3) === date
      );
      setSortedDates((sortedDates) => [...sortedDates, sortedArr]);
      return null;
    });
    return () => {
      setSortedDates([]);
    };
  }, [data.patents, dates]);

  useEffect(() => {
    if (data.patents) {
      sortedDates.map((item) => {
        const cpc = item.map((item: patent) => item.cpcs[0].cpc_section_id);
        const cpcCount = cpc.reduce(
          (accumulator: { [key: string]: number }, value: string) => {
            return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };
          },
          {}
        );
        setCpcCodes((cpcCodes) => [...cpcCodes, cpcCount]);
        return null;
      });
    }
    return () => {
      setCpcCodes([]);
    };
  }, [data.patents, sortedDates]);

  useEffect(() => {
    const sortedObj = Object.fromEntries(Object.entries(cpcCodes).sort());
    labels.map((item) => {
      cpcCodes.map((cpcCode, index) => {
        let num = 0;
        if (Object.keys(sortedObj[index]).includes(item)) {
          num = Object.values(sortedObj[index])[0];
          delete sortedObj[index][Object.keys(sortedObj[index])[0]];
        }
        setLabelCpcCounts((labelCpcCounts) => [...labelCpcCounts, num]);
        return null;
      });
      return null;
    });
    return () => {
      setLabelCpcCounts([]);
    };
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

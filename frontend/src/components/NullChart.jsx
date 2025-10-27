import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function NullsChart({ nulls }) {
  const labels = Object.keys(nulls);
  const data = {
    labels,
    datasets: [
      {
        label: 'Missing Values',
        data: Object.values(nulls),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
    ],
  };

  return <Bar data={data} />;
}

export default NullsChart;
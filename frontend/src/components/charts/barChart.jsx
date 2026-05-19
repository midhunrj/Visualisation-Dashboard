'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart=({ labels, values })=> {
  const data = {
    labels,
    datasets: [
      {
        label: 'Intensity',
        data: values,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <Bar data={data} />
    </div>
  );
}
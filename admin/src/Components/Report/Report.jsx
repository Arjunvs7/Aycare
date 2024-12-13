import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Report = () => {
  // Dummy data for the payments report
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // months
    datasets: [
      {
        label: 'Payments ($)',
        data: [1200, 1500, 1800, 2100, 2300, 2000, 2500], // dummy payment data
        borderColor: 'rgba(75, 192, 192, 1)', // line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // background fill color
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Payments Report',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Payments ($)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Payments Report</h2>
      <Line data={data} options={options} />
    </div>
  );
};

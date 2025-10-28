import { Chart as ChartJS, Tooltip, Legend, Title } from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { Chart } from 'react-chartjs-2';

ChartJS.register(MatrixController, MatrixElement, Tooltip, Legend, Title);

function CorrelationHeatmap({ correlation }) {
  if (!correlation || Object.keys(correlation).length === 0) {
    return <p>No correlation data available.</p>;
  }

  const labels = Object.keys(correlation);
  const data = [];

  labels.forEach((row) => {
    labels.forEach((col) => {
      const value = correlation[row]?.[col];
      if (typeof value === 'number') {
        data.push({ x: col, y: row, v: value });
      }
    });
  });

  return (
    <div className="mt-6" key={JSON.stringify(correlation)}>
      <h3 className="font-semibold mb-2">Correlation Heatmap</h3>
      <Chart
  type="matrix"
  data={{
    datasets: [
      {
        label: 'Correlation',
        data,
        backgroundColor(ctx) {
          const point = ctx.dataset.data[ctx.dataIndex];
          if (!point || typeof point.v !== 'number') return 'rgba(0,0,0,0.1)';
          const alpha = Math.abs(point.v);
          return `rgba(${point.v > 0 ? '0,128,0' : '255,0,0'},${alpha})`;
        },
        width: ({ chart }) =>
          chart.chartArea ? chart.chartArea.width / labels.length : 20,
        height: ({ chart }) =>
          chart.chartArea ? chart.chartArea.height / labels.length : 20,
      },
    ],
  }}
  options={{
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        labels,
        offset: true,
        grid: { display: false },
      },
      y: {
        type: 'category',
        labels,
        offset: true,
        grid: { display: false },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `Corr: ${ctx.raw.v}`,
        },
      },
      legend: { display: false },
      title: {
        display: true,
        text: 'Feature Correlation Matrix',
      },
    },
  }}
  height={400}
/>
    </div>
  );
}

export default CorrelationHeatmap;
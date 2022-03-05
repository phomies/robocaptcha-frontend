import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
//TODO: delete faker
import faker from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["1/3/22", "2/3/22", "3/3/22", "4/3/22", "5/3/22", "6/3/22", "7/3/22"];

const data = {
  labels,
  datasets: [
    {
      label: 'Calls Accepted',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      borderColor: 'rgba(74, 222, 128, 0.7)',
      backgroundColor: 'rgba(74, 222, 128, 0.3)',
      borderWidth: 2,
      fill: true,
      pointBackgroundColor: "white",
      tension: 0.4,
    },
    {
      label: 'Calls Blocked',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      borderColor: 'rgba(248, 113, 113, 0.7)',
      backgroundColor: 'rgba(248, 113, 113, 0.1)',
      borderWidth: 2,
      fill: true,
      pointBackgroundColor: "white",
      tension: 0.4,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      // position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};

function CallHistoryGraph() {
  return (
    <div className="py-5 px-7 flex flex-col gap-y-4 mt-7 bg-white shadow-lg rounded-lg w-full">
      <h2 className="text-sm md:text-base font-poppins-semibold">Calls Received (Past 7 days)</h2>
      <div className="w-full h-60">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default CallHistoryGraph;
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

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};

interface Props {
  callsAcceptedArr: string[];
  callsRejectedArr: string[];
  dateTimeArr: string[];
}

function CallHistoryGraph(props: Props) {
  const labels = props.dateTimeArr;

  const data = {
    labels,
    datasets: [
      {
        label: 'Calls Accepted',
        data: labels.map((item: string, index: number) => props.callsAcceptedArr[index]),
        borderColor: 'rgba(74, 222, 128, 0.7)',
        backgroundColor: 'rgba(74, 222, 128, 0.3)',
        borderWidth: 2,
        fill: true,
        pointBackgroundColor: "white",
        tension: 0.4,
      },
      {
        label: 'Calls Blocked',
        data: labels.map((item: string, index: number) => props.callsRejectedArr[index]),
        borderColor: 'rgba(248, 113, 113, 0.7)',
        backgroundColor: 'rgba(248, 113, 113, 0.1)',
        borderWidth: 2,
        fill: true,
        pointBackgroundColor: "white",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="py-5 px-7 flex flex-col gap-y-4 mt-7 bg-white dark:bg-secondary_dark shadow-lg rounded-lg w-full">
      <div className="text-sm md:text-base font-poppins-semibold">Calls Received (Past 7 days)</div>
      <div className="w-full h-40">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default CallHistoryGraph;
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
  },
  scales: {
    y: {
      title: {
        display: true,
      },
      min: 0,
      ticks: {
        precision: 0
      }
    }
  }
};

interface Props {
  callsAccepted: any
  callsRejected: any
  dateTimes: any
}

function CallHistoryGraph(props: Props) {
  const { callsAccepted, callsRejected, dateTimes } = props;

  const labels = dateTimes;
  const data = {
    labels,
    datasets: [
      {
        label: 'Calls Accepted',
        data: labels?.map((item: string, index: number) => callsAccepted[index]),
        borderColor: 'rgba(74, 222, 128, 0.7)',
        backgroundColor: 'rgba(74, 222, 128, 0.3)',
        borderWidth: 2,
        fill: true,
        pointBackgroundColor: "white",
        tension: 0.3,
      },
      {
        label: 'Calls Blocked',
        data: labels?.map((item: string, index: number) => callsRejected[index]),
        borderColor: 'rgba(248, 113, 113, 0.7)',
        backgroundColor: 'rgba(248, 113, 113, 0.1)',
        borderWidth: 2,
        fill: true,
        pointBackgroundColor: "white",
        tension: 0.3,
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
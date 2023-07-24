'use client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// icons
import CloseIcon from '@/icons/close-icon';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
);

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
  },
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'The number of items per Brand',
    },
  },
};

const StatsProductPopup = ({ open, toggle, brandCount }) => {
  const labels = Object.keys(brandCount)

  const data = {
    labels,
    datasets: [
      {
        label: 'Product',
        data: Object.values(brandCount),
        borderColor: '#4f46e5',
        backgroundColor: '#c7d2fe',
      },
    ],
  };

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className={`${open ? 'block' : 'hidden'} fixed inset-0 bg-black bg-opacity-50 transition-opacity`} />

      <div className={`${open ? 'block' : 'hidden'} fixed inset-0 z-10 overflow-y-auto`}>
        <div className="flex min-h-full items-end justify-center text-center sm:items-center p-0">
          <div className="relative transform overflow-hidden rounded-b-none sm:rounded-md bg-white text-left shadow-sm transition-all sm:my-8 w-full sm:max-w-lg">
            <div className="bg-white p-4 flex flex-col gap-3">
              <div>
                <button className="absolute top-4 right-4 text-gray-700" onClick={toggle}>
                  <CloseIcon className="w-7 h-7" />
                </button>

                <h1 className="text-gray-700 text-xl font-semibold">Stats Product</h1>
              </div>
              
              <div className="h-[700px] overflow-y-scroll">
                <div className="h-[1500px]">
                  <Bar options={options} data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsProductPopup
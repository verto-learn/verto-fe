import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function ResultReport({ ciscCycles, riscCycles }) {
    const chartData = {
        labels: ['CISC', 'RISC'],
        datasets: [
            {
                label: 'Total Siklus Eksekusi',
                data: [ciscCycles, riscCycles],
                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
            },
        ],
    };

    return (
        <div className=" glass-card p-6 rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-6 text-accent">Hasil Akhir</h2>
            <div className="grid grid-cols-2 gap-4 text-center text-2xl mb-6">
                <div className="bg-gray-700 p-4 rounded">
                    <div className="text-red-400">Siklus CISC</div>
                    <div className="font-bold text-4xl">{ciscCycles}</div>
                </div>
                <div className="bg-gray-700 p-4 rounded">
                    <div className="text-blue-400">Siklus RISC</div>
                    <div className="font-bold text-4xl">{riscCycles}</div>
                </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
                <Bar
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: 'Perbandingan Siklus Eksekusi' },
                        },
                    }}
                    data={chartData}
                />
            </div>
            <div className='text-center mt-6 text-lg text-gray-300'>
                <p><b className='text-red-400'>CISC:</b> Butuh {ciscCycles} siklus untuk 1 instruksi kompleks.</p>
                <p><b className='text-blue-400'>RISC:</b> Butuh {riscCycles} siklus untuk {riscCycles} instruksi sederhana.</p>
            </div>
        </div>
    );
}
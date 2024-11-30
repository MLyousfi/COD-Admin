import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement } from 'chart.js';
import {
    ArrowDown01Icon,
    ArrowDownRight01Icon,
    ArrowUpDownIcon,
    ArrowUpRight01Icon,
    FilterIcon,
    MoreVerticalCircle01Icon,
} from "hugeicons-react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { useRef, useEffect } from 'react';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ChartCard = ({ title, data, percentChange, timeRange, header = true }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = chartRef.current;
        if (chart) {
            const gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.height);
            gradient.addColorStop(0, 'rgba(0, 96, 255, 1)');
            gradient.addColorStop(1, 'rgba(0, 96, 255, 0.1)');

            chart.data.datasets[0].borderColor = gradient;
            chart.data.datasets[0].pointBorderColor = gradient;
        }
    }, []);

    const chartData = {
        labels: data.labels,
        datasets: [
            {
                data: data.values,
                borderColor: '#0060FF',
                borderWidth: 2,
                pointBorderColor: '#0060FF',
                pointBackgroundColor: '#fff',
                pointRadius: 0,
                pointHoverRadius: 3,
                fill: true,
                tension: 0.3,
                backgroundColor: (context) => {
                    const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(0, 96, 255, 0.2)');
                    gradient.addColorStop(1, 'rgba(0, 96, 255, 0)');
                    return gradient;
                },
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
                    callback: function (value) {
                        if (value >= 1000) {
                            return `${value / 1000}k$`;
                        } else {
                            return `$${value}`;
                        }

                    },
                    // Manually include the ticks [0, 50, 100, 500, 1000, 3000]
                    stepSize: 500, 
                    color: '#94a3b8', 
                },
                grid: {
                    color: '#ffffff22', 
                },
                beginAtZero: true,
                max: 1500, 
            },
            x: {
                ticks: {
                    color: '#94a3b8', 
                },
                grid: {
                    color: '#ffffff22', 
                },
            },
        },
        plugins: {
            legend: {
                display: false, 
            },
        },
        elements: {
            line: {
                borderColor: '#0060FF', 
                borderWidth: 2,
                tension: 0.3,
                shadowColor: 'rgba(0, 96, 255, 0.6)', 
                shadowBlur: 20,
            },
        },
    };



    return (
        <div className="w-full lg:w-10/12">
            <div className="p-6 rounded-xl shadow-sm border-gray-200 dark:border-gray-800 border mx-2">
                {header && <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                        <div className="flex items-center mt-1">
                            <span
                                className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${percentChange > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                {percentChange} % {percentChange > 0 ?
                                    <ArrowUpRight01Icon size={16} className="inline-block" />
                                    : <ArrowDownRight01Icon size={16} className="inline-block" />}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{timeRange}</span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="bordered" className="rounded-full">
                                    <FilterIcon size={16} /> Filter<ArrowDown01Icon size={16} />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="new">Daily</DropdownItem>
                                <DropdownItem key="new">Monthly</DropdownItem>
                                <DropdownItem key="new">Yearly</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="bordered" className="rounded-full">
                                    <ArrowUpDownIcon size={16} /> Sort
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="new">Newest</DropdownItem>
                                <DropdownItem key="new">Oldest</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        <Button isIconOnly variant="light">
                            <MoreVerticalCircle01Icon size={18} />
                        </Button>
                    </div>
                </div>}

                <div className="relative min-h-64 my-4">
                    <Line ref={chartRef} className="max-w-full" data={chartData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default ChartCard;

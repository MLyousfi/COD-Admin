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
import { useThemeProvider } from '../../../core/providers/ThemeContext';


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ChartCard = ({ title, data, percentChange, timeRange, header = true }) => {
    const { currentTheme } = useThemeProvider();

    const createShadowDataset = (offset, opacity) => ({
        data: data.values.map(value => value - offset),
        borderColor: `rgba(0, 96, 255, ${opacity})`,
        borderWidth: 8,
        pointRadius: 0,
        tension: 0.15,
        fill: false,
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
        clip: false,
    });
    const chartData = {
        labels: data.labels,
        datasets: [
            createShadowDataset(0.1, 0.08),
            createShadowDataset(0.04, 0.06),
            {
                data: data.values,
                borderColor: '#0060FF',
                borderWidth: 1.5,
                pointRadius: 0,
                pointHoverRadius: 3,
                tension: 0.15,
                fill: false,
                clip: false,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: Math.max(...data.values) + 1,
                ticks: {
                    color: '#94a3b8',
                    stepSize: 1,
                },
                grid: {
                    display: false,
                },
            },
            // TODO make the lines dashed
            x: {
                ticks: {
                    color: '#94a3b8',
                },
                grid: {
                    color: currentTheme === 'light' ? '#E6E6E6' : '#242325',
                    // TODO make the lines dashed
                    borderDash: [8, 8],
                    lineWidth: 1.5,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="w-full lg:w-2/3">
            <div className="p-6 rounded-xl shadow-sm border-gray-200 dark:border-gray-800 border mx-2">
                {header && <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                        <div className="flex items-center mt-1">
                            <span
                                className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${percentChange > 0 ? 'bg-[#21B53930] text-[#21B539]' : 'bg-red-100 text-red-600'}`}>
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
                    <Line className="max-w-full" data={chartData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default ChartCard;

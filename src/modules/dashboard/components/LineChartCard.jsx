import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';
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
import { callback } from 'chart.js/helpers';
import { label } from 'framer-motion/m';
import { useEffect, useRef } from 'react';


ChartJS.register(LineElement, Tooltip, CategoryScale, LinearScale, PointElement);

const ChartCard = ({ title, data, percentChange, timeRange, header = true }) => {
    const { currentTheme } = useThemeProvider();
    const chartRef = useRef(null);
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                data: data.values,
                borderColor: '#0258E8',
                borderWidth: 1.5,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: '#0258E8',
                pointHoverBackgroundColor: '#FFFFFF',
                tension: 0,
                fill: true,
                shadowColor: '#0258E8',  // Color of the glow
                shadowBlur: 60,          // Blur effect for the glow
                shadowOffsetX: 0,        // Horizontal offset of the shadow
                shadowOffsetY: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
            mode: 'index',
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 5,
                ticks: {
                    color: currentTheme === 'light' ? '#00000030' : '#FFFFFF30',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0)',
                },
            },
            x: {
                ticks: {
                    color: currentTheme === 'light' ? '#00000030' : '#FFFFFF30',
                },
                grid: {
                    color: currentTheme === 'light' ? '#00000010' : '#FFFFFF10',
                    borderDash: [8, 4],

                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false, // Disable default tooltip
                external: function (context) {
                    const { chart, tooltip } = context;
                    let tooltipEl = chart.canvas.parentNode.querySelector('div.custom-tooltip');

                    // Create tooltip element if it doesn't exist
                    if (!tooltipEl) {
                        tooltipEl = document.createElement('div');
                        tooltipEl.className = 'custom-tooltip';
                        tooltipEl.style.borderRadius = '100px';
                        tooltipEl.style.padding = '10px';
                        tooltipEl.style.position = 'absolute';
                        tooltipEl.style.pointerEvents = 'none';
                        tooltipEl.style.transition = 'all 0.3s ease';
                        tooltipEl.style.opacity = 0;
                        chart.canvas.parentNode.appendChild(tooltipEl);
                    }

                    // Update tooltip color based on current theme
                    tooltipEl.style.backgroundColor = currentTheme === 'light' ? '#98BFFF' : '#98BFFF10';
                    tooltipEl.style.color = '#FFFFFF';

                    // Hide the tooltip when not visible
                    if (tooltip.opacity === 0) {
                        tooltipEl.style.opacity = 0;
                        return;
                    }

                    // Set the text content of the tooltip
                    if (tooltip.body) {
                        const titleLines = tooltip.title || [];
                        const bodyLines = tooltip.body.map(b => b.lines);

                        let innerHtml = ``;
                        bodyLines.forEach(body => {
                            innerHtml += `<div>${body} - ${titleLines[0]}</div>`;
                        });

                        tooltipEl.innerHTML = innerHtml;
                    }

                    // Set the position of the tooltip
                    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
                    tooltipEl.style.opacity = 1;
                    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
                    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
                }
            }
        }
    };

    // Update the chart tooltip when the theme changes
    // useEffect(() => {
    //     if (chartRef.current) {
    //         // Force chart update to apply new tooltip styles
    //         chartRef.current.chartInstance.update();
    //     }
    // }, [currentTheme]);

    useEffect(() => {
        const chartInstance = chartRef.current?.chartInstance || chartRef.current;

        if (chartInstance && chartInstance.ctx) {
            const ctx = chartInstance.ctx;

            // Save the original stroke method
            const originalStroke = ctx.stroke;

            // Override the stroke function to add shadow
            ctx.stroke = function () {
                ctx.save();
                ctx.shadowColor = ctx.strokeStyle; // Set shadow color to the stroke color
                ctx.shadowBlur = 40; // Apply a shadow blur
                ctx.shadowOffsetX = 0; // X-axis offset
                ctx.shadowOffsetY = 0; // Y-axis offset
                originalStroke.apply(this, arguments); // Call the original stroke method
                ctx.restore();
            };

        }

        // Clean up: restore original stroke method if the component unmounts or updates
        return () => {
            const chartInstance = chartRef.current?.chartInstance || chartRef.current;
            if (chartInstance && chartInstance.ctx) {
                const ctx = chartInstance.ctx;
                const originalStroke = ctx.stroke;
                ctx.stroke = originalStroke; // Restore the original stroke method
            }
        };
    }, [currentTheme]);

    return (
        <div className="w-full lg:w-2/3 relative">
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

                <div className=" min-h-64 my-4">
                    <Line ref={chartRef} key={currentTheme} className="max-w-full" data={chartData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default ChartCard;

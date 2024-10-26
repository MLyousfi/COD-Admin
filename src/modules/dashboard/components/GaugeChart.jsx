import GaugeComponent from 'react-gauge-component';
import { ArrowDown01Icon, Calendar01Icon } from "hugeicons-react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";

const GaugeCard = () => {
    return (
        <div className="w-full lg:w-1/3">
            <div className="p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-900 mx-2 my-4 lg:my-0 ">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="">Confirmation Rate</h2>
                        <p className="text-sm text-gray-400">Call Center</p>
                    </div>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="bordered" className="rounded-full">
                                <Calendar01Icon size={18} /> This Year <ArrowDown01Icon size={16} />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="new">Daily</DropdownItem>
                            <DropdownItem key="new">Monthly</DropdownItem>
                            <DropdownItem key="new">Yearly</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>

                {/* Gauge Chart */}
                <div className="flex justify-center mb-4 relative">
                    <GaugeComponent
                        type="semicircle"
                        arc={{
                            colorArray: ['#34A853', '#ED0006', '#0258E8', '#6461FC'],
                            padding: 0.03,
                            subArcs: [
                                { length: 48 },
                                { length: 20 },
                                { length: 14 },
                                { length: 18 },
                            ]
                        }}
                        pointer={{ hide: true, type: "blob", animationDelay: 0 }}
                        value={66}
                        labels={{
                            valueLabel: { style: { fontSize: "48px", fill: "#aaa", textShadow: "none" } },
                            tickLabels: { hideMinMax: true }
                        }}
                    />
                </div>

                {/* Percentage and Info */}
                <div className="text-center">
                    <p className="font-medium text-sm text-[#2f2f2f]">
                        The average of calls between 19%
                    </p>
                    <p className="text-gray-400 text-xs">
                        Last check on 21 Apr
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GaugeCard;

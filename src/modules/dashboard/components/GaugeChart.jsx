import GaugeComponent from 'react-gauge-component';
import { ArrowDown01Icon, Calendar01Icon } from "hugeicons-react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { color } from 'chart.js/helpers';
import { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useEffect } from 'react';




const StyledGauge = styled(GaugeComponent)`
  width: 500px;
  height: 250px;

  .subArc.active {
    ${({ colorFilter }) =>
        colorFilter &&
        css`
        filter: drop-shadow(10px 10p 40px ${colorFilter});
      `}
  }
`;
const GaugeCard = () => {

    const [ClickedSubArc, setClickedSubArc] = useState(0)

    const [selectedItem, setSelectedItem] = useState(null);

    const handleArcClick = (e, arcIndex) => {
        e.stopPropagation()
        e.target.style.filter = `drop-shadow(0 0 10px ${DATA.find(i => i.key === ClickedSubArc).color})`
        setClickedSubArc(arcIndex)
    };




    const DATA = [
        {
            key: 0,
            length: 48,
            color: '#34A853',
        },
        {
            key: 1,
            length: 20,
            color: '#ED0006',
        },
        {
            key: 2,
            length: 14,
            color: '#0258E8',
        },
        {
            key: 3,
            length: 18,
            color: '#6461FC',
        },
    ]

    return (
        <div className="w-full h-full lg:w-[45%]">
            <div className="p-6 h-full rounded-lg shadow-sm border border-gray-200 dark:border-[#ffffff10] mx-2 my-4 lg:my-0 ">
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
                <div className="flex flex-col justify-center items-center min-h-56 mb-4 relative w-full mx-auto">
                    <StyledGauge
                        key={selectedItem}
                        colorFilter={DATA.find(i => i.key === ClickedSubArc).color}
                        animate={true}
                        type="semicircle"
                        arc={{
                            padding: 0.03,
                            cornerRadius: 50,
                            subArcs: DATA.map((item) => ({
                                length: item.length,
                                color: item.key === ClickedSubArc ? item.color : `${item.color}80`,

                                onClick: (e) => handleArcClick(e, item.key),

                            })),
                        }}
                        pointer={{ hide: true, type: "blob", animationDelay: 0 }}
                        value={DATA.find(i => i.key === ClickedSubArc).length}
                        labels={{
                            valueLabel: { style: { fontSize: "48px", fill: "#aaa", textShadow: "none" } },
                            tickLabels: { hideMinMax: true }
                        }}
                    />
                    <div className={`w-24 h-4 rounded-full mx-auto mb-3`}
                        style={{ backgroundColor: DATA.find(i => i.key === ClickedSubArc).color }}></div>
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

import Transition from "@/core/utils/Transition.jsx";
import { useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { Cancel01Icon, Search01Icon } from "hugeicons-react";
import { SignupSteps } from "@/core/constants/signup.js";
import { COUNTRIES } from "@/core/constants/countries.js";
import { Select, SelectItem } from "@nextui-org/select";

export default function FilterModal({ id, modalOpen, setModalOpen }) {
  const modalContent = useRef(null);

  const [seller, setSeller] = useState(null);
  const [agent, setAgent] = useState(null);
  const [product, setProduct] = useState(null);
  const [fromCountry, setFromCountry] = useState(null);
  const [toCountry, setToCountry] = useState(null);
  const [shippingBy, setShippingBy] = useState(null);

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-[#00000090] bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="bg-white dark:bg-[#161414] border border-transparent dark:border-[#ffffff10] max-w-2xl w-full max-h-full rounded-lg shadow-lg px-6 py-4 overflow-y-auto"
        >
          <div className="flex flex-row justify-between items-center w-full border-b border-b-gray-200 dark:border-b-[#ffffff10] mb-6 pb-4">
            <h3 className="text-lg font-bold">Filter</h3>
            <Button
              isIconOnly
              className="rounded-full bg-gray-200 dark:bg-base_card"
              onClick={() => setModalOpen(false)}
            >
              <Cancel01Icon />
            </Button>
          </div>
          <div>
            {/* Sellers Select */}
            <div className="w-full flex items-center">
              <Select
                selectedKeys={seller ? [seller] : []}
                id="sellers"
                placeholder="Sellers"
                labelPlacement="outside"
                classNames={{
                  value: "dark:!text-[#ffffff] !text-[#00000085]",
                  trigger:
                    "bg-transparent focus:border-none border-none rounded-lg",
                }}
                onSelectionChange={(keys) => setSeller(keys.currentKey)}
              >
                <SelectItem key="seller1">Seller 1</SelectItem>
                <SelectItem key="seller2">Seller 2</SelectItem>
                {/* Add more sellers as needed */}
              </Select>
            </div>
            {/* Agent Select */}
            <div className="w-full flex items-center">
              <Select
                selectedKeys={agent ? [agent] : []}
                id="agent"
                placeholder="Agent"
                labelPlacement="outside"
                classNames={{
                  value: "dark:!text-[#ffffff] !text-[#00000085]",
                  trigger:
                    "bg-transparent focus:border-none border-none rounded-lg",
                }}
                onSelectionChange={(keys) => setAgent(keys.currentKey)}
              >
                <SelectItem key="agent1">Agent 1</SelectItem>
                <SelectItem key="agent2">Agent 2</SelectItem>
                {/* Add more agents as needed */}
              </Select>
            </div>
            {/* Product Select */}
            <div className="w-full flex items-center">
              <Select
                selectedKeys={product ? [product] : []}
                id="product"
                placeholder="Product"
                labelPlacement="outside"
                classNames={{
                  value: "dark:!text-[#ffffff] !text-[#00000085]",
                  trigger:
                    "bg-transparent focus:border-none border-none rounded-lg",
                }}
                onSelectionChange={(keys) => setProduct(keys.currentKey)}
              >
                <SelectItem key="product1">Product 1</SelectItem>
                <SelectItem key="product2">Product 2</SelectItem>
                {/* Add more products as needed */}
              </Select>
            </div>
            {/* From Country Select */}
            <div className="w-full flex items-center">
              <Select
                selectedKeys={fromCountry ? [fromCountry] : []}
                id="fromCountry"
                placeholder="From Country"
                labelPlacement="outside"
                classNames={{
                  value: "dark:!text-[#ffffff] !text-[#00000085]",
                  trigger:
                    "bg-transparent focus:border-none border-none rounded-lg",
                }}
                onSelectionChange={(keys) => setFromCountry(keys.currentKey)}
              >
                {COUNTRIES.map((country) => (
                  <SelectItem key={country.value}>{country.label}</SelectItem>
                ))}
              </Select>
            </div>
            {/* To Country Select */}
            <div className="w-full flex items-center">
              <Select
                selectedKeys={toCountry ? [toCountry] : []}
                id="toCountry"
                placeholder="To Country"
                labelPlacement="outside"
                classNames={{
                  value: "dark:!text-[#ffffff] !text-[#00000085]",
                  trigger:
                    "bg-transparent focus:border-none border-none rounded-lg",
                }}
                onSelectionChange={(keys) => setToCountry(keys.currentKey)}
              >
                {COUNTRIES.map((country) => (
                  <SelectItem key={country.value}>{country.label}</SelectItem>
                ))}
              </Select>
            </div>
            {/* Shipping By Select */}
            <div className="w-full flex items-center">
              <Select
                selectedKeys={shippingBy ? [shippingBy] : []}
                id="shippingBy"
                placeholder="Shipping By"
                labelPlacement="outside"
                classNames={{
                  value: "dark:!text-[#ffffff] !text-[#00000085]",
                  trigger:
                    "bg-transparent focus:border-none border-none rounded-lg",
                }}
                onSelectionChange={(keys) => setShippingBy(keys.currentKey)}
              >
                <SelectItem key="method1">Shipping Method 1</SelectItem>
                <SelectItem key="method2">Shipping Method 2</SelectItem>
                {/* Add more shipping methods as needed */}
              </Select>
            </div>
            <div className="mt-6 pt-4 border-t border-t-gray-200 dark:border-t-[#ffffff10] flex flex-row justify-center items-center gap-4">
              <Button
                className="rounded-full bg-blue-600 text-white px-4 py-2"
                onClick={() => setModalOpen(false)}
              >
                <Search01Icon /> Search
              </Button>
              <Button
                className="rounded-full bg-gray-200 dark:bg-base_card px-4 py-2"
                onClick={() => setModalOpen(false)}
              >
                <Cancel01Icon size={16} /> Cancel
              </Button>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}

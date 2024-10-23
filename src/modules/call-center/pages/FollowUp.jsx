import DashboardLayout from "@shared/layouts/DashboardLayout.jsx";
import {
    ArrowDown01Icon,
    ArrowLeft02Icon,
    ArrowRight02Icon,
    Calling02Icon,
    CustomerService01Icon,
    PencilEdit01Icon
} from "hugeicons-react";
import {Tab, Tabs} from "@nextui-org/tabs";
import {Chip} from "@nextui-org/chip";
import {Button} from "@nextui-org/button";
import {Pagination} from "@nextui-org/pagination";
import {useCallback, useMemo, useState} from "react";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import {Link} from "react-router-dom";

const rows = [
    {
        key: "1",
        orderNum: "CSABSJDHRJFHDDHDUIDHDGDHDJDDUEHDGFSHDS",
        subNum: "JDHSKDHD",
        store: "Store 1",
        product: "Product X",
        productId: "123456789",
        name: "John Doe",
        country: "Saudi Arabia",
        price: "12.564 SAR",
        agent: "Alice Smith",
        status: "Confirmed at 09/09/2024",
    },
    {
        key: "2",
        orderNum: "CSABSJDHRJFHDDHDUIDHDGDHDJDDUEHDGFSHDS",
        subNum: "JDHSKDHD",
        store: "Store 1",
        product: "Product X",
        productId: "123456789",
        name: "John Doe",
        country: "Saudi Arabia",
        price: "12.564 SAR",
        agent: "Alice Smith",
        status: "Confirmed at 09/09/2024",
    },
    {
        key: "3",
        orderNum: "CSABSJDHRJFHDDHDUIDHDGDHDJDDUEHDGFSHDS",
        subNum: "JDHSKDHD",
        store: "Store 1",
        product: "Product X",
        productId: "123456789",
        name: "John Doe",
        country: "Saudi Arabia",
        price: "12.564 SAR",
        agent: "Alice Smith",
        status: "Confirmed at 09/09/2024",
    },
    {
        key: "4",
        orderNum: "CSABSJDHRJFHDDHDUIDHDGDHDJDDUEHDGFSHDS",
        subNum: "JDHSKDHD",
        store: "Store 1",
        product: "Product X",
        productId: "123456789",
        name: "John Doe",
        country: "Saudi Arabia",
        price: "12.564 SAR",
        agent: "Alice Smith",
        status: "Confirmed at 09/09/2024",
    },
    {
        key: "5",
        orderNum: "CSABSJDHRJFHDDHDUIDHDGDHDJDDUEHDGFSHDS",
        subNum: "JDHSKDHD",
        store: "Store 1",
        product: "Product X",
        productId: "123456789",
        name: "John Doe",
        country: "Saudi Arabia",
        price: "12.564 SAR",
        agent: "Alice Smith",
        status: "Confirmed at 09/09/2024",
    },
    {
        key: "6",
        orderNum: "CSABSJDHRJFHDDHDUIDHDGDHDJDDUEHDGFSHDS",
        subNum: "JDHSKDHD",
        store: "Store 1",
        product: "Product X",
        productId: "123456789",
        name: "John Doe",
        country: "Saudi Arabia",
        price: "12.564 SAR",
        agent: "Alice Smith",
        status: "Confirmed at 09/09/2024",
    },
];

const columns = [
    {
        key: "orderNum",
        label: "Order Number",
    },
    {
        key: "store",
        label: "Store",
    },
    {
        key: "product",
        label: "Product",
    },
    {
        key: "name",
        label: "Name",
    },
    {
        key: "country",
        label: "Country",
    },
    {
        key: "price",
        label: "Price",
    },
    {
        key: "agent",
        label: "Agent",
    },
    {
        key: "status",
        label: "Status",
    },
];

export default function FollowUp() {

    const [selectionBehavior, setSelectionBehavior] = useState("toggle");

    const [currentPage, setCurrentPage] = useState(1);

    const renderCell = useCallback((item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case "orderNum":
                return (
                    <div>
                        <p>{item.orderNum}</p>
                        <Link to="#" className="text-blue-500">({item.subNum})</Link>
                    </div>
                );
            case "store":
                return (
                    <span>{item.store}</span>
                );
            case "product":
                return (
                    <div>
                        <p>{item.product}</p>
                        <Link to="#" className="text-blue-500">(SKU: {item.productId})</Link>
                    </div>
                );
            case "name":
                return (
                    <span>{item.name}</span>
                );
            case "country":
                return (
                    <span>{item.country}</span>
                );
            case "price":
                return (
                    <span>{item.price}</span>
                );
            case "agent":
                return (
                    <span>{item.agent}</span>
                );
            case "status":
                return (
                    <span>{item.status}</span>
                );
            case "actions":
                return (
                    <span></span>
                );
            default:
                return cellValue;
        }
    }, []);

    const classNames = useMemo(
        () => ({
            wrapper: ["min-w-full", "bg-black"],
            th: ["bg-transparent", "text-default-500", "border-b", "border-divider", "text-center"],
            td: [
                "text-center",
                // changing the rows border radius
                // first
                "group-data-[first=true]:first:before:rounded-none",
                "group-data-[first=true]:last:before:rounded-none",
                // middle
                "group-data-[middle=true]:before:rounded-none",
                // last
                "group-data-[last=true]:first:before:rounded-none",
                "group-data-[last=true]:last:before:rounded-none",
            ],
        }),
        [],
    );
    return (
        <>
            <DashboardLayout title="Call Center - Follow Up" icon={<CustomerService01Icon className="text-info"/>}
                             additionalContent={
                                 <div className="dark:bg-info/10 w-fit rounded-full px-4 py-1.5 text-center">
                                     <span className="text-lg"><strong
                                         className="text-info">All</strong> Call</span>
                                 </div>}>
                <div>
                    {/*Tabs*/}
                    <div className="flex flex-row justify-between items-center gap-4 px-12">
                        <Tabs aria-label="Options"
                              color="primary"
                              variant="underlined"
                              classNames={{
                                  tabList: "gap-6 w-full relative rounded-none p-0 border-b bg-transparent border-b-transparent",
                                  cursor: "w-full bg-info",
                                  tab: "max-w-fit px-0 h-12 text-red-500",
                                  tabContent: "group-data-[selected=true]:text-info text-gray-600"
                              }}>
                            <Tab
                                key="photos"
                                title={
                                    <div className="flex items-center space-x-2">
                                        <strong>Active</strong>
                                        <Chip color="danger" size="sm">12345</Chip>
                                    </div>
                                }
                            />

                            <Tab
                                key="music"
                                title={
                                    <div className="flex items-center space-x-2">
                                        <strong>Archived</strong>
                                        <Chip color="default" size="sm" className="text-gray-400">12345</Chip>
                                    </div>
                                }
                            />
                        </Tabs>

                        {/*Tab content*/}

                        <div className="flex flex-row gap-2">
                            <Button color="default" className="rounded-full bg-info">
                                <Calling02Icon size={18}/> Start Call
                            </Button>
                            <Button variant="bordered" className="rounded-full">
                                List of Agents <ArrowDown01Icon size={16}/>
                            </Button>
                            <Button color="default" className="rounded-full bg-danger">
                                <PencilEdit01Icon size={18}/> Actions
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="min-w-full py-4 px-8 rounded">
                    <Table
                        isStriped
                        aria-label="Rows actions table example with dynamic content"
                        selectionMode="multiple"
                        classNames={classNames}
                        selectionBehavior={selectionBehavior}
                        onRowAction={(key) => alert(`Opening item ${key}...`)}
                    >
                        <TableHeader columns={columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={rows}>
                            {(item) => (
                                <TableRow key={item.key}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex flex-row gap-2 items-center my-8 mx-auto w-fit">
                    <Button
                        size="sm"
                        variant="flat"
                        color="default"
                        className="rounded dark:bg-950/20"
                        onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}>
                        <ArrowLeft02Icon size={18}/> Previous
                    </Button>
                    <Pagination
                        total={10}
                        color="default"
                        page={currentPage}
                        className="z-0"
                        classNames={{
                            item: "rounded dark:bg-default/40",
                            cursor: "rounded"
                        }}
                        onChange={setCurrentPage}/>
                    <Button
                        size="sm"
                        variant="flat"
                        color="default"
                        className="rounded"
                        onPress={() => setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))}>
                        Next <ArrowRight02Icon size={18}/>
                    </Button>
                </div>
            </DashboardLayout>
        </>
    )
}
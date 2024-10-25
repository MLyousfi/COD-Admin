
import { path } from "framer-motion/client";
import { Briefcase01Icon, ChartHistogramIcon, CustomerService01Icon, DeliveryBox01Icon, DeliveryTruck01Icon, Home01Icon, Home09Icon, InvoiceIcon, Square01Icon, Suit01Icon, Task01Icon } from "hugeicons-react";




const RouteNames = {
    dashboard: '/dashboard',
    login: '/login',
    signup: '/signup',
    forgotPassword: '/forgot-password',
    changePassword: '/change-password',
    recoverEmailSent: '/recover-email-sent',
    callCenter: '/call-center',
    callCenterManager: '/call-center-manager',
    callCenterConfirmation: '/call-center/confirmation',
    callCenterFollowUp: '/call-center/follow-up',
    callCenterMyAgent: '/call-center-manager/my-agent',
    callCenterAgentsRequests: '/call-center-manager/agents-requests',
    StockManagement: '/StockManagement',
    collectsListOfShipments: '/Collects/listOfShipments',
    firstMileDashboard: '/First-Mile/dashboard',
    products: '/StockManagement/products',
    warehouses: '/StockManagement/warehouses',
    ordersManagement: '/ordersManagement',
    listOfOrders: '/ordersManagement/list-of-orders',
    chatBotConfirmation: '/ordersManagement/chatbot-confirmation',
    ConfirmedOrders: '/ordersManagement/confirmed-orders',
    scheduleOrders: '/ordersManagement/schedule-orders',
    collectShippemdTransit: '/collects/shippement-transit',
    collects: '/collects',
    firstMile: '/first-mile',
    firstMileDashboard: '/first-mile/dashboard',
    statisctics: '/statistics',
    statiscticsProducts: '/statistics/products',
    statiscticsFunds: '/statistics/funds',
    statiscticsSponsoring: '/statistics/sponsoring',
    statiscticsAgents: '/statistics/agents',
    statiscticsAgentsActivities: '/statistics/agents/activities',
    statiscticsAgentscallCenter: '/statistics/agents/call-center',
    statiscticsAgentsFollowup: '/statistics/agents/follow-up',
    invoices: '/invoices',
    invoicesSeller: '/invoices/seller-invoices',
    invoicesSourcing: '/invoices/sourcing-invoices',
    invoicesSourcing: '/invoices/sourcing-invoices',
    shippingCost: '/shipping-cost',
    shippingCompanies: '/shipping-companies',



};

const RoutesConfig = [
    {
        name: 'Dashboard',
        path: RouteNames.dashboard,
        showInSidebar: true,
        icon: Home01Icon
    },
    {
        name: 'Login',
        path: RouteNames.login,
        showInSidebar: false,
    },
    {
        name: 'Sign Up',
        path: RouteNames.signup,
        showInSidebar: false,
    },
    {
        name: 'Forgot Password',
        path: RouteNames.forgotPassword,
        showInSidebar: false,
    },
    {
        name: 'Change Password',
        path: RouteNames.changePassword,
        showInSidebar: false,
    },
    {
        name: 'Recover Email Sent',
        path: RouteNames.recoverEmailSent,
        showInSidebar: false,
    },

    {
        name: 'Call Center',
        path: RouteNames.callCenter,
        showInSidebar: true,
        icon: CustomerService01Icon,
        children: [
            {
                name: 'Confirmation',
                path: RouteNames.callCenterConfirmation,
                showInSidebar: true,
            },
            {
                name: 'Follow Up',
                path: RouteNames.callCenterFollowUp,
                showInSidebar: true,
            },
        ],
    },
    {
        name: 'Call Center Manager',
        path: RouteNames.callCenterManager,
        showInSidebar: true,
        icon: Briefcase01Icon,
        children: [
            {
                name: 'My Agent',
                path: RouteNames.callCenterMyAgent,
                showInSidebar: true,
            },
            {
                name: 'Agents Requests',
                path: RouteNames.callCenterAgentsRequests,
                showInSidebar: true,
            },
        ],
    },
    {
        name: 'Orders Management',
        path: RouteNames.callCenterManager,
        showInSidebar: true,
        icon: DeliveryBox01Icon,
        children: [
            {
                name: 'List Of Orders',
                path: RouteNames.listOfOrders,
                showInSidebar: true,
            },
            {
                name: 'ChatBot Confirmation',
                path: RouteNames.chatBotConfirmation,
                showInSidebar: true,
            },
            {
                name: 'Confirmed Orders',
                path: RouteNames.ConfirmedOrders,
                showInSidebar: true,
            },
            {
                name: 'Schedule Orders',
                path: RouteNames.scheduleOrders,
                showInSidebar: true,
            },

        ],
    }, {
        name: 'Stock Management',
        path: RouteNames.StockManagement,
        showInSidebar: true,
        icon: Task01Icon,
        children: [
            {
                name: 'Products',
                path: RouteNames.products,
                showInSidebar: true,
            },
            {
                name: 'Warehouses',
                path: RouteNames.warehouses,
                showInSidebar: true,
            },
        ],
    },
    {
        name: 'Collects',
        showInSidebar: true,
        path: RouteNames.collects,
        icon: DeliveryTruck01Icon,
        children: [
            {
                name: 'List of Shipments',
                path: RouteNames.collectsListOfShipments,
                showInSidebar: true,
            },
            {
                name: 'Shipments in Transit',
                path: RouteNames.collectShippemdTransit,
                showInSidebar: true,
            },
        ],
    },
    {
        name: 'First Mile',
        showInSidebar: true,
        path: RouteNames.firstMile,
        icon: DeliveryBox01Icon,
        children: [
            {
                name: 'Dashboard',
                path: RouteNames.firstMileDashboard,
                showInSidebar: true,
            },
            {
                name: 'Orders',
                path: RouteNames.firstMileDashboard,
                showInSidebar: true,
            },
            {
                name: 'Collects',
                path: RouteNames.firstMileDashboard,
                showInSidebar: true,
            },
            {
                name: 'Stock',
                path: RouteNames.firstMileDashboard,
                showInSidebar: true,
            },
            {
                name: 'Warehouse',
                path: RouteNames.firstMileDashboard,
                showInSidebar: true,
            },
        ],
    },
    {
        name: 'Invoices',
        path: RouteNames.invoices,
        showInSidebar: true,
        icon: InvoiceIcon,
        children: [
            {
                name: 'Seller Invoices',
                path: RouteNames.invoicesSeller,
                showInSidebar: true,
            },
            {
                name: 'Sourcing Invoices',
                path: RouteNames.invoicesSourcing,
                showInSidebar: true,
            },

        ],
    },
    {
        name: 'Statistics',
        showInSidebar: true,
        path: RouteNames.statisctics,
        icon: ChartHistogramIcon,
        children: [
            {
                name: 'Products',
                path: RouteNames.statiscticsProducts,
                showInSidebar: true,
            },
            {
                name: 'Funds',
                path: RouteNames.statiscticsFunds,
                showInSidebar: true,
            },
            {
                name: 'Sponsoring',
                path: RouteNames.statiscticsSponsoring,
                showInSidebar: true,
            },
            {
                name: 'Agents',
                path: RouteNames.statiscticsAgents,
                showInSidebar: true,
                children: [
                    {
                        name: 'Activities',
                        path: RouteNames.statiscticsAgentsActivities,
                        showInSidebar: true,
                    },
                    {
                        name: 'Call Center',
                        path: RouteNames.statiscticsAgentscallCenter,
                        showInSidebar: true,
                    },
                    {
                        name: 'Follow Up',
                        path: RouteNames.statiscticsAgentsFollowup,
                        showInSidebar: true,
                    },

                ]
            },

        ],
    },

];

export { RouteNames, RoutesConfig };



import { path } from "framer-motion/client";
import { Briefcase01Icon, Calculator01Icon, GarageIcon, ChartHistogramIcon, CustomerService01Icon, DeliveryBox01Icon, DeliverySent01Icon, DeliveryTruck01Icon, DollarSquareIcon, EarthIcon, FerryBoatIcon, Home01Icon, Home09Icon, InvoiceIcon, SphereIcon, Square01Icon, Suit01Icon, Task01Icon, UserIcon, UserMultiple02Icon, WhatsappIcon } from "hugeicons-react";




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
    firstMileOrders: '/first-mile/orders',
    firstMileCollects: '/first-mile/collects',
    firstMileStock: '/first-mile/stock',
    firstMileWarehouse: '/first-mile/warehouse',
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
    affiliate: '/affiliate',
    listOfAffiliate: '/affiliate/list-of-affiliate',
    accounting: '/accounting',
    accountingExpences: '/accounting/expenses',
    accountingCallCenterReports: '/accounting/call-center-reports',
    accountingShippingReports: '/accounting/shipping-reports',
    users: '/users',
    listOfUsers: '/users/list-of-users',
    usersRoles: '/users/roles',
    general: '/general',
    generalBanks: '/general/banks',
    generalPartners: '/general/partners',
    generalTemplates: '/general/templates',
    generalConfiguration: '/general/configuration',
    whatsapp: '/whatsapp',
    whatsappTemplates: '/whatsapp/list-of-templates',
    whatsappAccounts: '/whatsapp/list-of-Accounts',
    countries: '/countries',
    currencies: '/currencies',
    sellers: '/sellers',
    sellersList: '/sellers/list-of-sellers',
    salesChannels: '/sellers/sales-channels',
    facebookBusiness: '/sellers/facebook-business',
    notification: '/notifications',
    settings: '/settings',
    referrals: '/referrals',
    help: '/help',



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
        name: 'Help',
        path: RouteNames.help,
        showInSidebar: false,
    },
    {
        name: 'Settings',
        path: RouteNames.settings,
        showInSidebar: false,
    },
    {
        name: 'Referrals',
        path: RouteNames.referrals,
        showInSidebar: false,
    },
    {
        name: 'Notifications',
        path: RouteNames.notification,
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
        icon: Calculator01Icon,
        children: [
            {
                name: 'My Agents',
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
        icon: GarageIcon,
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
                path: RouteNames.firstMileOrders,
                showInSidebar: true,
            },
            {
                name: 'Collects',
                path: RouteNames.firstMileCollects,
                showInSidebar: true,
            },
            {
                name: 'Stock',
                path: RouteNames.firstMileStock,
                showInSidebar: true,
            },
            {
                name: 'Warehouse',
                path: RouteNames.firstMileWarehouse,
                showInSidebar: true,
            },
        ],
    },
    {
        name: 'Accounting',
        path: RouteNames.accounting,
        showInSidebar: true,
        icon: Calculator01Icon,
        children: [
            {
                name: 'Expenses',
                path: RouteNames.accountingExpences,
                showInSidebar: true,
            },
            {
                name: 'Call Center Reports',
                path: RouteNames.accountingCallCenterReports,
                showInSidebar: true,
            },
            {
                name: 'Shipping Reports',
                path: RouteNames.accountingShippingReports,
                showInSidebar: true,
            },

        ],
    },
    {
        name: 'Sellers',
        path: RouteNames.sellers,
        showInSidebar: true,
        icon: UserMultiple02Icon,
        children: [
            {
                name: 'List of Sellers',
                path: RouteNames.sellersList,
                showInSidebar: true,
            },
            {
                name: 'Sales Channels',
                path: RouteNames.salesChannels,
                showInSidebar: true,
            },
            {
                name: 'Facebook Business',
                path: RouteNames.facebookBusiness,
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
        name: 'Shipping Costs',
        path: RouteNames.shippingCost,
        showInSidebar: true,
        icon: DollarSquareIcon,
        children: [
            {
                name: 'Shipping Costs',
                path: RouteNames.shippingCost,
                showInSidebar: true,
            },
            {
                name: 'Shipping Companies',
                path: RouteNames.shippingCompanies,
                showInSidebar: true,
            },

        ],
    },
    {
        name: 'Users',
        path: RouteNames.users,
        showInSidebar: true,
        icon: UserIcon,
        children: [
            {
                name: 'List of Users',
                path: RouteNames.listOfUsers,
                showInSidebar: true,
            },
            {
                name: 'Roles',
                path: RouteNames.usersRoles,
                showInSidebar: true,
            },

        ],
    },
    {
        name: 'Affiliate',
        path: RouteNames.affiliate,
        showInSidebar: true,
        icon: FerryBoatIcon,
        children: [

            {
                name: 'List of Affiliate',
                path: RouteNames.listOfAffiliate,
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
    {
        name: 'Whatsapp',
        path: RouteNames.whatsapp,
        showInSidebar: true,
        icon: WhatsappIcon,
        children: [
            {
                name: 'List of Templates',
                path: RouteNames.whatsappTemplates,
                showInSidebar: true,
            },
            {
                name: 'List of Account',
                path: RouteNames.whatsappAccounts,
                showInSidebar: true,
            },

        ],
    },
    {
        name: 'Countries',
        path: RouteNames.countries,
        showInSidebar: true,
        icon: EarthIcon,
        children: [
            {
                name: 'Countries',
                path: RouteNames.countries,
                showInSidebar: true,
            },
            {
                name: 'Currencies',
                path: RouteNames.currencies,
                showInSidebar: true,
            },

        ],
    },
    {
        name: 'General',
        path: RouteNames.general,
        showInSidebar: true,
        icon: SphereIcon,
        children: [
            {
                name: 'Banks',
                path: RouteNames.generalBanks,
                showInSidebar: true,
            },
            {
                name: 'Partners',
                path: RouteNames.generalPartners,
                showInSidebar: true,
            },
            {
                name: 'Templates',
                path: RouteNames.generalTemplates,
                showInSidebar: true,
            },
            {
                name: 'Configuration',
                path: RouteNames.generalConfiguration,
                showInSidebar: true,
            },

        ],
    },

];

export { RouteNames, RoutesConfig };


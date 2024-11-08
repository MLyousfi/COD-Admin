import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import Dashboard from '../../modules/dashboard/pages/Dashboard.jsx';
import Login from "../../modules/onboarding/pages/Login.jsx";
import ForgotPassword from "../../modules/onboarding/pages/ForgotPassword.jsx";
import ChangePassword from "../../modules/onboarding/pages/ChangePassword.jsx";
import Signup from "../../modules/onboarding/pages/Signup.jsx";
import { RouteNames } from "@/core/constants/routes.js";
import RecoverPasswordEmailSent from "@/modules/onboarding/pages/RecoverPasswordEmailSent.jsx";
import Confirmation from "@/modules/call-center/pages/Confirmation.jsx";
import FollowUp from "@/modules/call-center/pages/FollowUp.jsx";
import StockManagement from "../../modules/stockManagement.jsx/components/StockManagement.jsx";
import ListOfShipments from "../../modules/collects/components/ListOfShipments.jsx";
import FirstMileDashboard from "../../modules/first-mile/components/Dashboard.jsx";
import FirstMileWarehouse from "../../modules/first-mile/components/Warehouse.jsx";
import MyAgent from "../../modules/call-center-manager/pages/MyAgent.jsx";
import AgentsRequests from "../../modules/call-center-manager/pages/AgentsRequests.jsx";
import Products from "../../modules/statistics/pages/Products.jsx";
import Statistics from "../../modules/statistics/pages/Statistics.jsx";
import SellersInvoices from "../../modules/invoices/components/SellersInvoices.jsx";
import ListOfOrders from "../../modules/ordersManagement/pages/ListOfOrders.jsx";
import ShippingCost from "../../modules/shippingCost/pages/ShippingCost.jsx";
import ListOfAffiliate from "../../modules/affiliate/pages/ListOfAffiliate.jsx";
import Expences from "../../modules/accounting/pages/Expenses.jsx";
import Expenses from "../../modules/accounting/pages/Expenses.jsx";
import ListOfUsers from "../../modules/users/pages/ListOfUsers.jsx";
import Banks from "../../modules/general/pages/Banks.jsx";
import Countries from "../../modules/countries/pages/Countries.jsx";
import Templates from "../../modules/whatsapp/pages/Templates.jsx";
import ListOfSellers from "../../modules/sellers/pages/ListOfSellers.jsx";
import Notification from "../../modules/notification/Notification.jsx";
import Orders from "../../modules/first-mile/components/Orders.jsx";
import Collects from "../../modules/first-mile/components/Collects.jsx";
import Stock from "../../modules/first-mile/components/Stock.jsx";
import FollowUpStatistics from "../../modules/statistics/pages/FollowUp.jsx";
import ChatBotConfirmation from "../../modules/ordersManagement/pages/ChatBotConfirmation.jsx";
import ConfirmedOrders from "../../modules/ordersManagement/pages/ConfirmedOrders.jsx";
import ScheduleOrders from "../../modules/ordersManagement/pages/ScheduleOrders.jsx";
import Settings from "../../modules/settings/pages/Settings.jsx";
import Help from "../../modules/help/pages/Help.jsx";
import Referral from "../../modules/referral/pages/Referral.jsx";
import Funds from "../../modules/statistics/pages/Funds.jsx";
import NewCollect from "../../modules/collects/components/NewCollect.jsx";
import SourcingInvoices from "../../modules/invoices/components/SourcingInvoices.jsx";
import Accounts from "../../modules/whatsapp/pages/Accounts.jsx";
import ShippingCompanies from "../../modules/shippingCost/pages/ShippingCompanies.jsx";
import Roles from "../../modules/users/pages/Roles.jsx";
import Partners from "../../modules/general/pages/Partners.jsx";
import { useState } from "react";
import ResideBar from "../../modules/dashboard/components/partials/ReSideBar.jsx";
import Sidebar from "../../modules/dashboard/components/partials/Sidebar.jsx";
import Warehouse from "../../modules/stockManagement.jsx/components/Warehouse.jsx";
import ShipmentsInTransit from "../../modules/collects/components/ShipmentsInTransit.jsx";

const routes = [
    {
        path: "/",
        element: <Navigate to={RouteNames.dashboard} replace />
    },
    {
        path: RouteNames.dashboard,
        element: <Dashboard />
    },
    {
        path: RouteNames.StockManagement,
        children: [
            {
                path: RouteNames.products,
                element: <StockManagement />
            },
            {
                path: RouteNames.warehouses,
                element: <Warehouse />
            },
        ],
    },
    {
        path: RouteNames.Collects,
        children: [
            {
                path: RouteNames.collectsListOfShipments,
                element: <ListOfShipments />
            },
            {
                path: RouteNames.collectShippemdTransit,
                element: <ShipmentsInTransit />
            },
            {
                path: RouteNames.newCollect,
                element: <NewCollect />
            }
        ],
    },
    {
        path: RouteNames.notification,
        element: <Notification />
    },
    {
        path: RouteNames.firstMile,
        children: [
            {
                path: RouteNames.firstMileDashboard,
                element: <FirstMileDashboard />
            },
            {
                path: RouteNames.firstMileOrders,
                element: <Orders />
            },
            {
                path: RouteNames.firstMileCollects,
                element: <Collects />
            },
            {
                path: RouteNames.firstMileStock,
                element: <Stock />
            },
            {
                path: RouteNames.firstMileWarehouse,
                element: <FirstMileWarehouse />
            },
        ],
    },
    {
        path: RouteNames.callCenterManager,
        children: [
            {
                path: RouteNames.callCenterMyAgent,
                element: <MyAgent />
            },
            {
                path: RouteNames.callCenterAgentsRequests,
                element: <AgentsRequests />
            },
        ],
    },
    {
        path: RouteNames.login,
        element: <Login />
    },
    {
        path: RouteNames.signup,
        element: <Signup />
    },
    {
        path: RouteNames.forgotPassword,
        element: <ForgotPassword />
    },
    {
        path: RouteNames.changePassword,
        element: <ChangePassword />
    },
    {
        path: RouteNames.recoverEmailSent,
        element: <RecoverPasswordEmailSent />
    },
    {
        path: RouteNames.invoices,
        children: [
            {
                path: RouteNames.invoicesSeller,
                element: <SellersInvoices />
            },
            {
                path: RouteNames.invoicesSourcing,
                element: <SourcingInvoices />
            },
        ],
    },
    {
        path: RouteNames.affiliate,
        children: [
            {
                path: RouteNames.listOfAffiliate,
                element: <ListOfAffiliate />
            },

        ],
    },
    {
        path: RouteNames.shippingCost,
        element: <ShippingCost />

    },
    {
        path: RouteNames.shippingCompanies,
        element: <ShippingCompanies />

    },
    {
        path: RouteNames.settings,
        element: <Settings />

    },
    {
        path: RouteNames.help,
        element: <Help />

    },
    {
        path: RouteNames.referrals,
        element: <Referral />

    },
    {
        path: RouteNames.shippingCompanies,
        element: <ShippingCost />

    },
    {
        path: RouteNames.countries,
        element: <Countries />

    },
    {
        path: RouteNames.currencies,
        element: <Countries />

    },
    {
        path: RouteNames.sellers,
        children: [
            {
                path: RouteNames.sellersList,
                element: <ListOfSellers />
            },
            {
                path: RouteNames.salesChannels,
                element: <ListOfSellers />
            },
            {
                path: RouteNames.facebookBusiness,
                element: <ListOfSellers />
            },
        ],
    },
    {
        path: RouteNames.whatsapp,
        children: [
            {
                path: RouteNames.whatsappTemplates,
                element: <Templates />
            },
            {
                path: RouteNames.whatsappAccounts,
                element: <Accounts />
            },
        ],
    },
    {
        path: RouteNames.callCenter,
        children: [
            {
                path: RouteNames.callCenterConfirmation,
                element: <Confirmation />
            },
            {
                path: RouteNames.callCenterFollowUp,
                element: <FollowUp />
            },
        ],
    },
    {
        path: RouteNames.ordersManagement,
        children: [
            {
                path: RouteNames.listOfOrders,
                element: <ListOfOrders />
            },
            {
                path: RouteNames.chatBotConfirmation,
                element: <ChatBotConfirmation />
            },
            {
                path: RouteNames.ConfirmedOrders,
                element: <ConfirmedOrders />
            },
            {
                path: RouteNames.scheduleOrders,
                element: <ScheduleOrders />
            },
        ],
    },
    {
        path: RouteNames.accounting,
        children: [
            {
                path: RouteNames.accountingExpences,
                element: <Expenses />
            },
            {
                path: RouteNames.accountingCallCenterReports,
                element: <Expenses />
            },
            {
                path: RouteNames.accountingShippingReports,
                element: <Expenses />
            },

        ],
    },
    {
        path: RouteNames.users,
        children: [
            {
                path: RouteNames.listOfUsers,
                element: <ListOfUsers />
            },
            {
                path: RouteNames.usersRoles,
                element: <Roles />
            },


        ],
    },
    {
        path: RouteNames.general,
        children: [
            {
                path: RouteNames.generalBanks,
                element: <Banks />
            },

            {
                path: RouteNames.generalPartners,
                element: <Partners />
            },

            {
                path: RouteNames.generalTemplates,
                element: <Banks />
            },


            {
                path: RouteNames.generalConfiguration,
                element: <Banks />
            },



        ],
    },
    {
        path: RouteNames.Statistics,
        children: [
            {
                path: RouteNames.statisticsProducts,
                element: <Products />
            },
            {
                path: RouteNames.statisticsFunds,
                element: <Funds />
            },
            {
                path: RouteNames.statisticsSponsoring,
                element: <Products />
            },
            {
                path: RouteNames.statisticsAgents,
                children: [
                    {
                        path: RouteNames.statisticsAgentsActivities,
                        element: <Products />
                    },
                    {
                        path: RouteNames.statisticsAgentscallCenter,
                        element: <Products />
                    },
                    {
                        path: RouteNames.statisticsAgentsFollowup,
                        element: <FollowUpStatistics />
                    },
                ],
            },
        ],
    },
]



export default function RoutersWrapper() {
    // Should log `true`

    function generateRoutes(routes) {
        return routes.map((route, index) => {
            if (route.children) {
                return (
                    <Route key={index} path={route.path} element={route.element}>
                        {generateRoutes(route.children)}
                    </Route>
                );
            }

            return <Route key={index} path={route.path} element={route.element} />;


        });
    }

    return (
        <Router>
            <div className="w-screen h-screen">
                <Routes>

                    {generateRoutes(routes)}
                </Routes>

                {/* Sidebar for Mobile Screens */}
                <ResideBar />

                {/* Sidebar for Larger Screens */}
                <Sidebar />
            </div>
        </Router>

    );
}

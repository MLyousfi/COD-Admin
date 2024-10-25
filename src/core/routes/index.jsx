import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
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

const routes = createBrowserRouter([
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
                element: <FollowUp />
            },
        ],
    },
    {
        path: RouteNames.collectsListOfShipments,
        element: <ListOfShipments />
    },
    {
        path: RouteNames.firstMileDashboard,
        element: <FirstMileDashboard />
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
                element: <SellersInvoices />
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
        element: <ShippingCost />

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
                element: <ListOfOrders />
            },
            {
                path: RouteNames.ConfirmedOrders,
                element: <ListOfOrders />
            },
            {
                path: RouteNames.scheduleOrders,
                element: <ListOfOrders />
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
                element: <ListOfUsers />
            },


        ],
    },
    {
        path: RouteNames.Statistics,
        children: [
            {
                path: RouteNames.statiscticsProducts,
                element: <Products />
            },
            {
                path: RouteNames.statiscticsFunds,
                element: <Products />
            },
            {
                path: RouteNames.statiscticsSponsoring,
                element: <Products />
            },
            {
                path: RouteNames.statiscticsAgents,
                children: [
                    {
                        path: RouteNames.statiscticsAgentsActivities,
                        element: <Products />
                    },
                    {
                        path: RouteNames.statiscticsAgentscallCenter,
                        element: <Products />
                    },
                    {
                        path: RouteNames.statiscticsAgentsFollowup,
                        element: <Products />
                    },
                ],
            },
        ],
    },
]);

export default function RoutersWrapper() {
    return (
        <RouterProvider router={routes} />
    );
}

import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import ListOfOrders from "../../modules/ordersManagement/pages/listOfOrders.jsx";

const routes = createBrowserRouter([
    {
        path: RouteNames.dashboard,
        element: <Dashboard />
    },
    {
        path: RouteNames.StockManagement,
        element: <StockManagement />
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
                element: <Confirmation />
            },
            {
                path: RouteNames.callCenterAgentsRequests,
                element: <FollowUp />
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
]);

export default function RoutersWrapper() {
    return (
        <RouterProvider router={routes} />
    );
}
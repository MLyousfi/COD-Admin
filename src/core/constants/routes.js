import { Briefcase01Icon, CustomerService01Icon, Home01Icon, Task01Icon } from "hugeicons-react";



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
    StockManagement: '/StockManagement'

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
        name: 'Stock Management',
        path: RouteNames.StockManagement,
        showInSidebar: true,
        icon: Task01Icon,
        children: [
            {
                name: 'Products',
                path: RouteNames.StockManagement,
                showInSidebar: true,
            },
            {
                name: 'Warehouses',
                path: RouteNames.callCenterFollowUp,
                showInSidebar: true,
            },
        ],
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

];

export { RouteNames, RoutesConfig };


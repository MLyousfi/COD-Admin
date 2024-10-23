import { CustomerService01Icon, Home01Icon, Task01Icon } from "hugeicons-react";



const RouteNames = {
    dashboard: '/dashboard',
    login: '/login',
    signup: '/signup',
    forgotPassword: '/forgot-password',
    changePassword: '/change-password',
    recoverEmailSent: '/recover-email-sent',
    callCenter: '/call-center',
    callCenterConfirmation: '/call-center/confirmation',
    callCenterFollowUp: '/call-center/follow-up',
    storeManager: '/storemanager'
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
        name: 'Store Management',
        path: RouteNames.storeManager,
        showInSidebar: true,
        icon: Task01Icon,
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

];

export { RouteNames, RoutesConfig };


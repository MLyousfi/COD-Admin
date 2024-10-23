
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';

const store = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    // TODO: to be uncommented in the future
    // cookieSecure: window.location.protocol === 'http:',
    cookieSecure: false,
});

// eslint-disable-next-line react/prop-types
export default function AuthProviderWrapper({ children }) {
    return (
        <AuthProvider store={store}>
            {children}
        </AuthProvider>
    );
}

import ReCaptchaV2 from 'react-google-recaptcha';

// eslint-disable-next-line react/prop-types
export default function Recaptcha({ setToken }) {

    const handleToken = (token) => {
        setToken(token);
    }

    const handleExpire = () => {
        setToken(null);
    }
    return (
        <ReCaptchaV2
            sitekey={import.meta.env.VITE_RECAPTCH_SITE_KEY}
            onChange={handleToken}
            onExpire={handleExpire}
        />
    );
}
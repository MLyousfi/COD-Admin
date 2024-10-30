
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
            sitekey={'6Ld4m1wqAAAAAMKIWlQAZBbBXiHC0TQlJ2tpo8VA'}
            onChange={handleToken}
            onExpire={handleExpire}
        />
    );
}
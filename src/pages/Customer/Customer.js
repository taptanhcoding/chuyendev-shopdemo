import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import Form3 from './component/Form3/Form3';
import SignIn from './component/SignIn/signIn';
import styles from './Customer.module.scss';

const cx = classNames.bind(styles);

function Customer() {
    const { action } = useParams();
    return (
        <>
            {action == 'login' && <Form3 />}
            {action == 'signin' && <SignIn />}
        </>
    );
}

export default Customer;

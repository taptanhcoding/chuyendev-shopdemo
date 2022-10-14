import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Form2.module.scss';
import { handleVerification } from '~/service/customerService';

const cx = classNames.bind(styles);
function Verification() {
    const { token } = useParams();
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const Verification = async () => {
            const result = await handleVerification(token);
            setStatus(result);
        };
        Verification();
    }, []);

    return (
        <>
            <div className={cx('wrapper', 'row', 'h-lg-100', 'container')}>
                {status ? status.message : 'Đang xác minh tài khoản của bạn ...'}
            </div>
        </>
    );
}

export default Verification;

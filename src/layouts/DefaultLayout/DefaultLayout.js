import { Outlet } from 'react-router-dom';
import Footer from '~/layouts/component/Footer/Footer';
import Header from '~/layouts/component/Header/Header';

import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);
function DefaultLayout() {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>
                {' '}
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;

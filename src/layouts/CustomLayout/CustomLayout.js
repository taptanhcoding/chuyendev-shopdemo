import { Outlet } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './CustomLayout.module.scss';
import HeaderCustom from '../component/HeaderCustom/HeaderCustom';

const cx = classNames.bind(styles);
function CustomLayout() {
    return (
        <div className={cx('wrapper')}>
            <HeaderCustom />
            <div className={cx('content')}>
                {' '}
                <Outlet />
            </div>
        </div>
    );
}

export default CustomLayout;

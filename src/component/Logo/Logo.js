import { Link } from 'react-router-dom';

import imgs from '~/assets/img';

import classNames from 'classnames/bind';
import styles from './Logo.module.scss';

const cx = classNames.bind(styles);
function Logo({ className }) {
    return (
        <Link className={cx('band', className)} to="/">
            <div className={cx('logo', 'row', 'm-0', 'align-items-center')}>
                <img src={imgs.logo} className={cx('col-lg-4 col-sm-12 col-12', 'p-0')} />
                <div className={cx('band-title', 'col-lg-8', 'd-flex', 'flex-column', 'justify-content-center')}>
                    <p className={cx('band-name', 'mb-0')}>ChuyenDev</p>
                    <p className={cx('band-phone', 'mb-0')}>0982183222</p>
                </div>
            </div>
        </Link>
    );
}

export default Logo;

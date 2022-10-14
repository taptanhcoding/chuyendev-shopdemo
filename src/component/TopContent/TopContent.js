import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './TopContent.module.scss';
import ProductMenu from '../ProductMenu/ProductMenu';

const cx = classNames.bind(styles);

function TopContent({ data }) {
    return (
        <>
            <div className={cx('breadcrumbs')}>
                <ul className={cx('breadcrumb')}>
                    <li className={cx('breadcrumb-item')}>
                        <Link to="/">Trang chủ</Link>
                    </li>
                    {data.map((slug, index) => (
                        <li key={index} className={cx('breadcrumb-item')}>
                            <span>{slug}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <ProductMenu label hoverToShow />
        </>
    );
}

export default TopContent;

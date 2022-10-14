import classNames from 'classnames/bind';
import styles from './FooterItem.module.scss';

const cx = classNames.bind(styles);
function FooterItem({ title, children, className }) {
    return (
        <div className={cx('wrapper', className, 'flex-column')}>
            {title && <h3 className={cx('tt-footer')}>{title}</h3>}
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default FooterItem;

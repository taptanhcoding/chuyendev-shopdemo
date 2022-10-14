import classNames from 'classnames/bind';
import styles from './Price.module.scss';

const cx = classNames.bind(styles);

function Price({ className, price, currentPrice, fsPrice, fsCurrent }) {
    return (
        <div className={cx('product-price', className)}>
            {currentPrice ? (
                <>
                    <div className={cx('price_current')} style={{ fontSize: fsCurrent }}>
                        {currentPrice}
                    </div>
                    <div className={cx('price')} style={{ fontSize: fsPrice }}>
                        {price}
                    </div>
                </>
            ) : (
                <div className={cx('price_current')}>{price}</div>
            )}
        </div>
    );
}

export default Price;

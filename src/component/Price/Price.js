import classNames from 'classnames/bind';
import { money } from '~/app/money';
import styles from './Price.module.scss';

const cx = classNames.bind(styles);

function Price({ className, price, currentPrice, fsPrice, fsCurrent }) {
    return (
        <div className={cx('product-price', className)}>
            {currentPrice ? (
                <>
                    <div className={cx('price_current')} style={{ fontSize: fsCurrent }}>
                        {money(currentPrice)}
                    </div>
                    <div className={cx('price')} style={{ fontSize: fsPrice }}>
                        {money(price)}
                    </div>
                </>
            ) : (
                <div className={cx('price_current')}>{money(price)}</div>
            )}
        </div>
    );
}

export default Price;

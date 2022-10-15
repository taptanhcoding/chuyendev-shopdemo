import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Price from '../Price/Price';
import styles from './ProductItem.module.scss';

const cx = classNames.bind(styles);
function ProductItem({ data }) {
    return (
        <Link className={cx('wrapper', 'row', 'm-0', 'flex-nowrap')} to={`/detail/${data.slug}`}>
            <img src={data.image[0]} className={cx('img')} />
            <div className={cx('detail', 'd-flex', 'flex-column')}>
                <span className={cx('product-name', 'text-limit')} title={data.name}>
                    {data.name}
                </span>
                <Price className={cx('product-price')} price={data.price} currentPrice={data.new_price} />
            </div>
        </Link>
    );
}

export default ProductItem;

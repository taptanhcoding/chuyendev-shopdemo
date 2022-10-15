import { Link } from 'react-router-dom';
import { ImFire } from 'react-icons/im';

import classNames from 'classnames/bind';
import styles from './CatItem.module.scss';
import Price from '../Price/Price';

const cx = classNames.bind(styles);

function CatItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('product-img', 'position-relative')}>
                <Link to={`/detail/${data.slug}`}>
                    <img src={data.image[0]} />
                </Link>
                <div className={cx('discount')}>
                    <span>
                        <ImFire /> Giảm <label>100.000 đ</label>
                    </span>
                </div>
                <div className={cx('text_small_3', 'text_small_3_2')}>Hàng mới về </div>
            </div>
            <h3 className={cx('wrapper-name')}>
                <Link to={`/detail/${data.slug}`} className={cx('name', 'text-limit', 'text-limit-2', 'text-center')}>
                    {data.name}
                </Link>
            </h3>

            {data.special && <div className={cx('text-small_1', 'text-limit', 'text-center')}>{data.special}</div>}
            <Price price={data.price} currentPrice={data.new_price} />
            <div className={cx('rate-item')}> </div>
        </div>
    );
}

export default CatItem;

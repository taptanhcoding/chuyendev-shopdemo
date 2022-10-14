import { BsChatDots } from 'react-icons/bs';

import classNames from 'classnames/bind';
import styles from './Sale.module.scss';

const cx = classNames.bind(styles);
function Sale() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('timework')}>Bán hàng online(8h - 21h hàng ngày)</div>
            <div className={cx('department')}>
                <div className={cx('wrap-box')}>
                    <div className={cx('title')}>
                        <span> Tư vấn bán hàng</span> (Gọi hoặc chat Zalo)
                    </div>
                    <div className={cx('grid-content')}>
                        <div className={cx('item')}>
                            <BsChatDots />
                            <span> Zalo</span>
                            <a href="tel:"> 0982.183.422 </a>
                            Hotline 1
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sale;

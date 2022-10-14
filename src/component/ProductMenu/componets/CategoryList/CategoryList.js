import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './CategoryList.module.scss';

const cx = classNames.bind(styles);

function CategoryList({ data }) {
    return (
        <ul className={cx('menu_list-inner', 'm-0')}>
            {data.map((category, index) => (
                <li key={index} className={cx('menu_list-item')}>
                    <Link
                        className={cx('item-link', 'ml-4', 'mr-4', 'd-flex', 'flex-row', 'align-items-center')}
                        to={`/products/${category.name}`}
                    >
                        <span className={cx('icon', 'd-flex', 'flex-row', 'align-items-center')}>
                            <img src={category.icon} />
                        </span>
                        <span className={cx('item-title')}>{category.name}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default CategoryList;

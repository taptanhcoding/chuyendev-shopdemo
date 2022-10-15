import classNames from 'classnames/bind';
import styles from './Paging.module.scss';

const cx = classNames.bind(styles);

function amountPage(num) {
    let page_amount = new Array(num);
    for (let i = 0; i < num; i++) {
        page_amount[i] = i + 1;
    }
    return page_amount;
}

function Paging(data) {
    const pages = amountPage(data.total_pages);
    return (
        <div className={cx('wrapper')}>
            <ul className={cx('list_page', 'd-flex', 'justify-content-center', 'align-items-center')}>
                {pages.map((page, index) => (
                    <li
                        key={index}
                        onClick={() => data.onClick((prev) => ({ ...prev, page }))}
                        className={cx({ active: page == data.page })}
                    >
                        {page}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Paging;

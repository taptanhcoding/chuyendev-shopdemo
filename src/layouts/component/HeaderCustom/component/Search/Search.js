import { AiOutlineSearch } from 'react-icons/ai';
import HeadlessTippy from '@tippyjs/react/headless';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import Wrapper from '~/component/Wrapper/Wrapper';
import { useState } from 'react';
import ProductItem from '~/component/ProductItem/ProductItem';

const cx = classNames.bind(styles);
function Search() {
    const [showHeadless, setShowHeadless] = useState(false);

    return (
        <>
            <HeadlessTippy
                visible={showHeadless}
                onClickOutside={() => setShowHeadless(false)}
                placement="bottom-start"
                interactive={true}
                render={(attrs) => (
                    <div className={cx('box')} tabIndex="-1" {...attrs}>
                        <Wrapper className={cx('wrapper-search')}>
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                        </Wrapper>
                    </div>
                )}
            >
                <div className={cx('search', 'row', 'm-0', 'position-relative')}>
                    <input
                        type="text"
                        className={cx('search-input')}
                        placeholder="Tìm kiếm sản phẩm trên chuyendev"
                        onFocus={() => setShowHeadless(true)}
                    />
                    <div className={cx('btn-search', 'd-flex', 'align-items-center', 'justify-content-center')}>
                        <AiOutlineSearch />
                    </div>
                </div>
            </HeadlessTippy>
        </>
    );
}

export default Search;

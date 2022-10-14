import { AiOutlineSearch } from 'react-icons/ai';
import HeadlessTippy from '@tippyjs/react/headless';
import { DebounceInput } from 'react-debounce-input';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import Wrapper from '~/component/Wrapper/Wrapper';
import { useState } from 'react';
import ProductItem from '~/component/ProductItem/ProductItem';
import { search } from '~/service/searchService';

const cx = classNames.bind(styles);
function Search() {
    const [showHeadless, setShowHeadless] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = async (e) => {
        if (e.target.value.trim() != '') {
            let dataSearch = await search({ params: { q: e.target.value } });
            setSearchResult(dataSearch);
        } else setSearchResult([]);
    };
    return (
        <>
            <HeadlessTippy
                visible={searchResult.length > 0 && showHeadless}
                onClickOutside={() => setShowHeadless(false)}
                placement="bottom-start"
                interactive={true}
                render={(attrs) => (
                    <div className={cx('box')} tabIndex="-1" {...attrs}>
                        {searchResult.length > 0 && (
                            <Wrapper className={cx('wrapper-search')}>
                                {searchResult.map((product, index) => (
                                    <ProductItem key={index} data={product} />
                                ))}
                            </Wrapper>
                        )}
                    </div>
                )}
            >
                <div className={cx('search', 'row', 'm-0', 'position-relative')}>
                    <DebounceInput
                        minLength={2}
                        debounceTimeout={400}
                        onChange={handleSearch}
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

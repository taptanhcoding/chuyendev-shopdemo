import LazyLoad from 'react-lazyload';

import { slides } from '~/assets/slide';
import products from '~/assets/products';

import classNames from 'classnames/bind';
import styles from './SearchPage.module.scss';
import TopContent from '~/component/TopContent/TopContent';
import CatItem from '~/component/CatItem/CatItem';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProduct } from '~/service/productService';
import { search } from '~/service/searchService';
import Paging from '~/component/Paging/Paging';

const cx = classNames.bind(styles);

function SearchPage() {
    const { keyword } = useParams();
    const [products, setProducts] = useState({});
    const [searchParams, setSearchParams] = useState({ q: keyword, page: 1 });
    useEffect(() => {
        setSearchParams((prev) => ({ ...prev, q: keyword }));
    }, [keyword]);

    useEffect(() => {
        const Product = async () => {
            let dataSearch = await search({ params: { q: searchParams.q, page: searchParams.page } });
            setProducts(dataSearch);
        };

        Product();
    }, [searchParams]);
    return (
        <div className={cx('wrapper', 'container')}>
            <TopContent data={['Tìm kiếm']} />
            <div className={cx('inner-content', 'mt-4')}>
                <div className={cx('inner-header', 'd-flex', 'justify-content-between', 'align-items-center')}>
                    <span className={cx('category')}>
                        có {products.total || 0} sản phẩm với từ khóa: {keyword}
                    </span>
                </div>
                <div className={cx('inner-content')}>
                    {products.data && products.data.length == 0 ? (
                        'Hiện chưa có sản phẩm nào thuộc mục này'
                    ) : (
                        <div className={cx('catogory-items', 'row')}>
                            {products.data &&
                                products.data.map((product, index) => (
                                    <div key={index} className={cx('col-3', 'p-1')}>
                                        <LazyLoad overflow placeholder={<p>Loading</p>}>
                                            <CatItem data={product} />
                                        </LazyLoad>
                                    </div>
                                ))}
                        </div>
                    )}{' '}
                </div>
                <div className={cx('inner-paging')}>
                    <Paging total_pages={products.total_pages} page={searchParams.page} onClick={setSearchParams} />
                </div>
            </div>
        </div>
    );
}

export default SearchPage;

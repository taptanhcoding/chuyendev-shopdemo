import LazyLoad from 'react-lazyload';

import { slides } from '~/assets/slide';
import products from '~/assets/products';

import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import TopContent from '~/component/TopContent/TopContent';
import CatItem from '~/component/CatItem/CatItem';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProduct } from '~/service/productService';

const cx = classNames.bind(styles);

function Category() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState({ page: 1, category: category });
    useEffect(() => {
        setPage((prev) => ({ ...prev, category }));
    }, [category]);

    useEffect(() => {
        const Product = async () => {
            const listProducts = await getProduct(`${page.category}?page=${page.page}`);
            setProducts(listProducts.data);
        };

        Product();
    }, [page]);
    return (
        <div className={cx('wrapper', 'container')}>
            <TopContent data={[category]} />
            <div className={cx('inner-content', 'mt-4')}>
                <div className={cx('inner-header', 'd-flex', 'justify-content-between', 'align-items-center')}>
                    <span className={cx('category')}>{category}</span>
                    <div className={cx('filter')}>
                        <select className={cx('custom-select')}>
                            <option defaultValue={null}>Sắp xếp theo</option>
                            <option defaultValue="1">Giá từ thấp tới cao</option>
                            <option defaultValue="2">Giá từ cao tới thấp</option>
                            <option defaultValue="3">Mới nhất</option>
                        </select>
                    </div>
                </div>
                <div className={cx('inner-content')}>
                    {products.length == 0 ? (
                        'Hiện chưa có sản phẩm nào thuộc mục này'
                    ) : (
                        <div className={cx('catogory-items', 'row')}>
                            {products.map((product, index) => (
                                <div key={index} className={cx('col-3', 'p-1')}>
                                    <LazyLoad overflow placeholder={<p>Loading</p>}>
                                        <CatItem data={product} />
                                    </LazyLoad>
                                </div>
                            ))}
                        </div>
                    )}{' '}
                </div>
                <div className={cx('inner-paging')}></div>
            </div>
        </div>
    );
}

export default Category;

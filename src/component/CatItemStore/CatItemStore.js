import { Link } from 'react-router-dom';

import SlideStore from '../SlideStore/SlideStore';

import classNames from 'classnames/bind';
import styles from './CatItemStore.module.scss';
import { useEffect, useState } from 'react';
import { getProductSale } from '~/service/productService';

const cx = classNames.bind(styles);
function CatItemStore({ category }) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const Products = async () => {
            const Products = await getProductSale(category);
            setProducts(Products);
        };
        Products();
    }, [category]);
    return (
        <div className={cx('wrapper', 'mt-4')}>
            <div className={cx('cat-title', 'position-relative', 'mb-4')}>
                <Link to="/" className={cx('cat-title-main')}>
                    {category} nổi bật
                </Link>
            </div>
            <div className={cx('bot-block')}>
                <SlideStore data={products} />
            </div>
        </div>
    );
}

export default CatItemStore;

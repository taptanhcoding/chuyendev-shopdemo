import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';

import { GrNext, GrPrevious } from 'react-icons/gr';

import ProductItem from '../ProductItem/ProductItem';
import CatItem from '../CatItem/CatItem';
import products from '~/assets/products';
import slideCategory from '~/assets/slide_category';

import classNames from 'classnames/bind';
import './SlideStore.scss';
import styles from './SlideStore.module.scss';

const data = [
    {
        path: products.product1,
        name: 'Tai nghe Airpod3 rep 1:1',
        slug: '/',
    },
    {
        path: products.product2,
        name: 'Tai nghe Airpod3 rep 1:1',
        slug: '/',
    },
    {
        path: products.product3,
        name: 'Tai nghe Airpod3 rep 1:1',
        slug: '/',
    },
    {
        path: products.product4,
        name: 'Tai nghe Airpod3 rep 1:1',
        slug: '/',
    },
    {
        path: products.product5,
        name: 'Tai nghe Airpod3 rep 1:1',
        slug: '/',
    },
    {
        path: products.product6,
        name: 'Tai nghe Airpod3 rep 1:1',
        slug: '/',
    },
    {
        path: products.product7,
        name: 'Tai nghe Airpod3 rep 1:1',
        slug: '/',
    },
    {
        path: products.product8,
        name: 'Tai nghe Airpod3 rep 1:1',
        slug: '/',
    },
];

const cx = classNames.bind(styles);
function SlideStore({ data, slidesToShow = 4 }) {
    const [slide, setSlide] = useState(null);
    const slideRef = useRef();

    useEffect(() => {
        setSlide(slideRef.current);
    }, []);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow,
        hoverToStop: true,
        slidesToScroll: 4,
    };

    const next = () => {
        slide.slickNext();
    };
    const previous = () => {
        slide.slickPrev();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('category-banner', 'mr-3')}>
                <Link to="#">
                    <img src={slideCategory.airpod} />
                </Link>
            </div>
            <div className={cx('tab-content', 'position-relative')}>
                <Slider ref={slideRef} {...settings}>
                    {data.map((dt, index) => (
                        <CatItem key={index} data={dt} />
                    ))}
                </Slider>
                <button className={cx('button', 'btn-prev', 'position-absolute')} onClick={previous}>
                    <GrPrevious />
                </button>
                <button className={cx('button', 'btn-next', 'position-absolute')} onClick={next}>
                    <GrNext />
                </button>
            </div>
            <div className={cx('clear')}></div>
        </div>
    );
}

export default SlideStore;

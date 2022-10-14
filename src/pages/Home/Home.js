import ProductItem from '~/component/ProductItem/ProductItem';
import ProductMenu from '~/component/ProductMenu/ProductMenu';
import Slide from './component/Slide/Slide';
import { banner, slides2 } from '~/assets/slide';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import CatItemStore from '~/component/CatItemStore/CatItemStore';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser } from '~/features/counter/usersSlice';

const banners = [
    {
        path: slides2.slideshow1,
    },
    {
        path: slides2.slideshow2,
    },
    {
        path: slides2.slideshow3,
    },
];

const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();
    // useEffect(() => {
    //     const user = sessionStorage.getItem('user') || localStorage.getItem('user');
    //     user && dispatch(LoginUser(JSON.parse(user)));
    // }, []);

    return (
        <>
            <div className={cx('slideshow_countdown', 'container', 'position-relative')}>
                <div className={cx('top_menu', 'position-relative')}>
                    <ProductMenu label={false} />
                </div>
                <div className={cx('slideshow')}>
                    <Slide />
                </div>
                <div className={cx('countdown', 'm-0', 'position-absolute')}>
                    {banners.map((slide, index) => (
                        <img key={index} src={slide.path} />
                    ))}
                </div>
            </div>
            <div className={cx('post1', 'mt-4', 'container')}>
                <img src={banner.banner1} />
            </div>

            <div className={cx('wrapper-content-page', 'container')}>
                <CatItemStore category="Tai nghe" />
            </div>
        </>
    );
}

export default Home;

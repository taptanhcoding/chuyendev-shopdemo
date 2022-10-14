import React, { Component, useState, useEffect, useRef } from 'react';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';

import { GrNext, GrPrevious } from 'react-icons/gr';

import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import './slide.scss';

import classNames from 'classnames/bind';
import styles from './Slide.module.scss';
import { slides } from '~/assets/slide';
import { Link } from 'react-router-dom';

const slide1s = [
    {
        id: 1,
        path: slides.slide1,
        desc: 'Khuyến mại Mua 1 tặng 1',
    },
    {
        id: 2,
        path: slides.slide2,
        desc: 'Tai nghe XY-70 chống ổn chủ động (ANC)',
    },
    {
        id: 3,
        path: slides.slide3,
        desc: 'Domi Life 1 pin trâu chống nước',
    },
    {
        id: 4,
        path: slides.slide4,
        desc: 'Anker Nano II 30W - Nhỏ gọn, sạc nhanh',
    },
    {
        id: 5,
        path: slides.slide5,
        desc: 'SDP Remax 20000mAh RPP-179',
    },
];

const cx = classNames.bind(styles);

function Slide({ arrows = false, autoplay = true, slidesToShow = 1, dots = true, infinite = false }) {
    const [slide1L, setSlide1L] = useState(slide1s);
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const slide1 = useRef();
    const slide2 = useRef();
    useEffect(() => {
        setNav1(slide1.current);
        setNav2(slide2.current);
    }, []);

    var settings1 = {
        arrows,
        dots,
        infinite,
        speed: 500,
        slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        dotsClass: cx('d-flex', 'my-dots', 'position-absolute'),
        customPaging: (i) => <div className={cx('dots')}></div>,
    };

    var settings2 = {
        arrows,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: slide1L.length,
        slidesToScroll: 1,
        swipeToSlide: true,
        focusOnSelect: true,
    };

    return (
        <>
            <Slider asNavFor={nav2} ref={slide1} {...settings1}>
                {slide1L.map((slide) => (
                    <Link key={slide.id} className={cx('slide-img')} to="/">
                        <img className={cx("d-block','w-100")} src={slide.path} />
                    </Link>
                ))}
            </Slider>
            <Slider asNavFor={nav1} ref={slide2} {...settings2}>
                {slide1L.map((slide) => (
                    <div key={slide.id} className={cx('slide-desc', 'd-flex', 'align-items-center')} to="/">
                        {slide.desc}
                    </div>
                ))}
            </Slider>
        </>
    );
}

export default Slide;

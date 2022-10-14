import React, { Component, useEffect, useState } from 'react';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';

import classNames from 'classnames/bind';
import styles from './Standard.module.scss';

const cx = classNames.bind(styles);

function Standard2({ data, className }) {
    const [slideActive, setSlideActive] = useState(0);
    const [slide1L, setSlide1L] = useState([]);
    useEffect(() => {
        setSlide1L(data);
    }, [data]);

    useEffect(() => {
        var timeOver = setInterval(nextSl1, 3000);
        return () => clearInterval(timeOver);
    }, [slideActive]);

    const nextSl1 = () => {
        if (slideActive < slide1L.length - 1) {
            setSlideActive((prev) => prev + 1);
        } else setSlideActive(0);
    };

    const prevSl1 = () => {
        if (slideActive > 0) {
            setSlideActive((prev) => prev - 1);
        } else setSlideActive(slide1L.length - 1);
    };

    return (
        <>
            <div className={cx('slide-item', className)}>
                <div className={cx('slide')}>
                    {/* Chỉ báo băng truyền */}
                    {/* <ol className={cx('carousel-indicators')}>
                        {slide1L.map((slide, index) => (
                            <li
                                onClick={() => setSlideActive(index)}
                                key={index}
                                className={cx('carousel-box', {
                                    active: index === slideActive,
                                })}
                            ></li>
                        ))}
                    </ol> */}
                    {/* Hiển thị hình ảnh */}
                    <div className={cx('carousel-inner', 'position-relative')}>
                        {slide1L.map((slide, index) => (
                            <div
                                key={index}
                                className={cx('slide-img', {
                                    active: index === slideActive,
                                })}
                            >
                                <img className={cx("d-block','w-100")} src={slide} />
                            </div>
                        ))}
                    </div>
                    {/* Nút bấm chuyển ảnh */}
                    <span className={cx('btn-trans', 'position-absolute', 'btn-prevs')} onClick={prevSl1}>
                        <GrFormPrevious />
                    </span>
                    <span className={cx('btn-trans', 'position-absolute', 'btn-next')} onClick={nextSl1}>
                        <MdOutlineNavigateNext />
                    </span>
                </div>
            </div>
        </>
    );
}

export default Standard2;

import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './ColorBox.module.scss';

const cx = classNames.bind(styles);

function ColorBox({ dataColor }) {
    return (
        <>
            {dataColor.map((color, index) => (
                <div className={cx('wrapper', 'd-flex', 'align-items-center', 'mr-4')}>
                    <input type={'radio'} name="color" id={color} value={color} hidden />
                    <label style={{ backgroundColor: color }} className={cx('label', 'circle')} htmlFor={color}></label>
                </div>
            ))}
        </>
    );
}

export default ColorBox;

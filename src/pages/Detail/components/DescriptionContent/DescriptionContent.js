import { useEffect, useRef } from 'react';

import classNames from 'classnames/bind';
import styles from './DescriptionContent.module.scss';

const cx = classNames.bind(styles);
function DescriptionContent({ data, className }) {
    const desRef = useRef();
    useEffect(() => {
        desRef.current.innerHTML = data;
    }, [data]);

    return <div ref={desRef} className={cx('wrapper', className)}></div>;
}

export default DescriptionContent;

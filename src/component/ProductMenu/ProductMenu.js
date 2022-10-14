import Tippy from '@tippyjs/react/headless';

import { FiMenu } from 'react-icons/fi';

import { Link } from 'react-router-dom';

import { icons } from '~/assets/icon';

import classNames from 'classnames/bind';
import styles from './ProductMenu.module.scss';
import Wrapper from '../Wrapper/Wrapper';
import { useEffect, useState } from 'react';
import { getCategory } from '~/service/categoryService';
import CategoryList from './componets/CategoryList/CategoryList';

const cx = classNames.bind(styles);
function ProductMenu({ label = true, hoverToShow = false }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const setCategory = async () => {
            const category = await getCategory();
            setCategories(category);
        };

        setCategory();
    }, []);

    return (
        <div className={cx('wrapper', 'd-flex', 'flex-column')}>
            {label && (
                <Tippy
                    interactive
                    placement="bottom-start"
                    render={(attrs) => (
                        <div className="box" tabIndex="-1" {...attrs}>
                            <Wrapper className={cx('wrapper-menu')}>
                                <div className={cx('menu_list')}>
                                    <CategoryList data={categories} />
                                </div>
                            </Wrapper>
                        </div>
                    )}
                >
                    <div className={cx('menu_label', ' position-relative')}>
                        <span className={cx('icon-menu', 'position-absolute')}>
                            <FiMenu />
                        </span>
                        <span className={cx('title-menu')}>Danh mục sản phẩm</span>
                    </div>
                </Tippy>
            )}
            <div className={cx('menu_list', { menuhide: hoverToShow })}>
                <CategoryList data={categories} />
            </div>
        </div>
    );
}

export default ProductMenu;

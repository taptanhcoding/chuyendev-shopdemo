import { Link } from 'react-router-dom';
import HeadLessTippy from '@tippyjs/react/headless';

import { AiOutlineSearch } from 'react-icons/ai';
import { TbPhoneCall } from 'react-icons/tb';
import { BsCheck2Circle, BsCart3 } from 'react-icons/bs';
import { VscAccount } from 'react-icons/vsc';
import imgs from '~/assets/img';
import Search from './component/Search/Search';
import Wrapper from '~/component/Wrapper/Wrapper';
import Sale from './component/Sale/Sale';
import Logo from '~/component/Logo/Logo';

import classnames from 'classnames/bind';
import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import User from './component/User/User';
import { useEffect, useMemo, useState } from 'react';
import { LoginUser } from '~/features/counter/usersSlice';
import { getCartAction, handleAddCartFromApi } from '~/features/cart/cartAction';
import { addCart } from '~/features/cart/cartSlice';
import { getCartApi } from '~/service/cartService';
import { handleLogin } from '~/service/customerService';

const cx = classnames.bind(styles);
function Header() {
    const dispatch = useDispatch();
    const cart = useSelector((store) => store.cart.cart);
    const user = useSelector((store) => store.users.user);
    let quanity = 0;
    cart.forEach((element) => {
        quanity += element.quanity;
    });

    useEffect(() => {
        const userToken = sessionStorage.getItem('token') || localStorage.getItem('token');
        const getDetailUser = async (token) => {
            let detailUser = await handleLogin(token);
            dispatch(LoginUser(detailUser));
        };
        if (userToken) {
            getDetailUser(JSON.parse(userToken));
        }
    }, []);
    useEffect(() => {
        const getUserCart = async (id) => {
            let userCart = await getCartApi(id);
            dispatch(addCart(userCart));
        };

        if (user && Object.values(user).length > 0) {
            getUserCart(user._id);
        }
    }, [user]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('row', 'm-0', 'align-items-center', 'justify-content-between', 'flex-nowrap')}>
                    <Logo />
                    <Search />
                    <div className={cx('support', 'row', 'm-0')}>
                        <HeadLessTippy
                            placement="bottom-start"
                            interactive={true}
                            render={(attrs) => (
                                <div className={cx('box')} tabIndex="-1" {...attrs}>
                                    <Wrapper className={cx('wrapper-support')}>
                                        <Sale />
                                    </Wrapper>
                                </div>
                            )}
                        >
                            <div className={cx('support-item', 'm-0', 'row', 'align-items-center', 'mr-4', 'contact')}>
                                <div
                                    className={cx(
                                        'support-icon',
                                        'd-flex',
                                        'align-items-center',
                                        'mr-2',
                                        'justify-content-center',
                                    )}
                                >
                                    <TbPhoneCall />
                                </div>
                                <div className={cx('support-title')}>
                                    <div className={cx('text-sm')}>Bán hàng</div>
                                    <div className={cx('text-lg')}>Online</div>
                                </div>
                            </div>
                        </HeadLessTippy>
                        {/* <Link
                            to="/insurance"
                            className={cx('support-item', 'm-0', 'row', 'align-items-center', 'mr-4')}
                        >
                            <div
                                className={cx(
                                    'support-icon',
                                    'd-flex',
                                    'align-items-center',
                                    'mr-2',
                                    'justify-content-center',
                                )}
                            >
                                <BsCheck2Circle />
                            </div>
                            <div className={cx('support-title')}>
                                <div className={cx('text-sm')}>Tra cứu</div>
                                <div className={cx('text-lg')}>Bảo hành</div>
                            </div>
                        </Link> */}
                        <Link to="/cart" className={cx('support-item', 'm-0', 'mr-4', 'row', 'align-items-center')}>
                            <div
                                className={cx(
                                    'support-icon',
                                    'd-flex',
                                    'align-items-center',
                                    'mr-2',
                                    'justify-content-center',
                                    'position-relative',
                                )}
                            >
                                <BsCart3 />
                                <span className={cx('quanity', 'position-absolute')}>{quanity}</span>
                            </div>
                            <div className={cx('support-title')}>Giỏ hàng</div>
                        </Link>
                        {user && Object.keys(user).length > 0 ? (
                            <User data={user} />
                        ) : (
                            <Link
                                to="/customer/login"
                                className={cx('support-item', 'm-0', 'row', 'align-items-center')}
                            >
                                <div
                                    className={cx(
                                        'support-icon',
                                        'd-flex',
                                        'align-items-center',
                                        'mr-2',
                                        'justify-content-center',
                                        'position-relative',
                                    )}
                                >
                                    <VscAccount />
                                </div>
                                <div className={cx('support-title')}>Đăng nhập/Đăng ký</div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
{
    /* <div
    className={cx(
        'support-icon',
        'd-flex',
        'align-items-center',
        'mr-2',
        'justify-content-center',
        'position-relative',
    )}
>
    <img src={data.avatar} />
    <FaRegUser />
</div>; */
}

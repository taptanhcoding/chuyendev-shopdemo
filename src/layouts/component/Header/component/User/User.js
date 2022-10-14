import HeadlessTippy from '@tippyjs/react/headless';

import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import Wrapper from '~/component/Wrapper/Wrapper';
import Toast from '~/component/Toast/Toast';

import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { useState } from 'react';
import { logOutUser } from '~/features/counter/usersSlice';
import { removeAllCart } from '~/features/cart/cartSlice';

const cx = classNames.bind(styles);

function User({ data }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [toast, setToast] = useState(false);

    const handleLogout = () => {
        setToast(true);
    };

    return (
        <>
            <HeadlessTippy
                delay={[100, 800]}
                arrow={true}
                interactive
                placement="bottom-end"
                render={(attrs) => (
                    <div className="box" tabIndex="-1" {...attrs}>
                        <Wrapper className={cx('wrap-user')}>
                            <div className={cx('user-action')}>
                                <Link to={`/account/${data.email}`} className={cx('user-link')}>
                                    Tài khoản của tôi
                                </Link>
                            </div>
                            <div className={cx('user-action')}>
                                <div
                                    to={data.slug}
                                    className={cx('user-link', 'cursor-pointer')}
                                    onClick={handleLogout}
                                >
                                    Đăng xuất
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                )}
            >
                <div className={cx('support-item', 'm-0', 'row', 'align-items-center')}>
                    Xin Chào,
                    <div className={cx('support-title')}>{data.name != '' ? data.name : data.email}</div>
                </div>
            </HeadlessTippy>
            <Toast
                text={'Bạn đang đăng xuất ?'}
                classNames={cx('toast-user')}
                continueAction={() => {
                    dispatch(logOutUser());
                    dispatch(removeAllCart());
                    localStorage.removeItem('token');
                    sessionStorage.removeItem('token');
                    navigate('/');
                }}
                toggle={toast}
                close={() => {
                    setToast(false);
                }}
            />
        </>
    );
}

export default User;

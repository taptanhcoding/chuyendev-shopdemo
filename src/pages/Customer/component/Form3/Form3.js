import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { LoginUser, setUser } from '~/features/counter/usersSlice';
import avatar from '~/assets/avatar';

import classNames from 'classnames/bind';
import styles from './Form2.module.scss';
import Toast from '~/component/Toast/Toast';
import { getUser, handleUser } from '~/service/customerService';
import { getCartApi } from '~/service/cartService';
import { addCart } from '~/features/cart/cartSlice';

const cx = classNames.bind(styles);
function Form3() {
    const { action } = useParams();
    const [typePass, setTypePass] = useState('password');
    const navigate = useNavigate();
    const [eror, setEror] = useState(null);
    const [userR, setUserR] = useState({});
    const [toast, setToast] = useState(false);
    const [toastWarning, setToastWarning] = useState(false);
    const dispatch = useDispatch();
    const users = useSelector((store) => store.users.users);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('users') || localStorage.getItem('users'));
        setUserR(data);
    }, []);

    const handleLogin = async (data) => {
        let detailUser = await handleUser(action, data);
        if (Object.keys(detailUser).length != 0) {
            data.remember
                ? localStorage.setItem('token', JSON.stringify(detailUser.token))
                : sessionStorage.setItem('token', JSON.stringify(detailUser.token));
            dispatch(addCart(detailUser.carts));
            if (detailUser.warning) {
                setToastWarning(true);
            } else {
                navigate('/');
            }
        } else {
            setToast(true);
        }
    };

    return (
        <>
            <div className={cx('wrapper', 'row', 'h-lg-100')}>
                <div className={cx('col-lg-3')}></div>
                <div className={cx('col-lg-6', ' d-flex', 'align-items-center', 'justify-content-center')}>
                    <div className={cx('login-box')}>
                        <div className={cx('d-block', 'pb-5')}>
                            <h3 className={cx('login-title', 'text-danger')}>Đăng nhập</h3>
                            <h3 className={cx('login-title2')}>Đăng nhập với tài khoản của bạn</h3>
                            <form onSubmit={handleSubmit(handleLogin)}>
                                <div className={cx('form-group')}>
                                    <label htmlFor="exampleInputEmail1">Email hoặc Số điện thoại</label>
                                    <input
                                        type="text"
                                        className={cx('form-control')}
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter email"
                                        defaultValue={userR?.email}
                                        {...register('email', { required: 'Vui lòng nhập email hoặc Số điện thoại' })}
                                    />
                                    <p className={cx('error')}>{errors.email?.message}</p>
                                </div>
                                <div className={cx('form-group', 'position-relative')}>
                                    <label htmlFor="exampleInputPassword1">Mật khẩu</label>
                                    <div className={cx('position-relative')}>
                                        <input
                                            className={cx('form-control', 'password-control')}
                                            id="exampleInputPassword1"
                                            type={typePass}
                                            placeholder="Password"
                                            {...register('password', {
                                                required: 'Vui lòng nhập mật khẩu',
                                                pattern: {
                                                    value: /^([A-Z]){1}([\w0-9_\.!@#$%^&*()]+){5,31}$/,
                                                    message: 'Mật khẩu bao gồm chữ, số và ký tự đặt biệt',
                                                },
                                            })}
                                        />
                                        <div
                                            className={cx(
                                                'see',
                                                'position-absolute',
                                                'd-flex',
                                                'align-items-center',
                                                'justify-content-center',
                                                { active: typePass !== 'password' },
                                            )}
                                            onClick={() => {
                                                setTypePass((prev) => (prev == 'password' ? 'text' : 'password'));
                                            }}
                                        >
                                            {typePass == 'password' ? <FaEye /> : <FaEyeSlash />}
                                        </div>
                                    </div>
                                    <p className={cx('error')}>{errors.password?.message}</p>
                                </div>
                                <div className={cx('form-check', 'd-flex', 'align-items-center')}>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="exampleCheck1"
                                        {...register('remember')}
                                    />
                                    <label className={cx('form-check-label', 'remember-title')} htmlFor="exampleCheck1">
                                        Chọn để sử dụng cho lần đăng nhập sau
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className={cx(
                                        'btn',
                                        'btn-danger',
                                        ' btn-lg',
                                        'btn-block',
                                        'btn-submit',
                                        'mt-4',
                                        'text-uppercase',
                                    )}
                                >
                                    Đăng nhập
                                </button>
                            </form>
                            <p className={cx('text-secondary font-size-lg mt-5 text-center')}>
                                Bạn cần một tài khoản?{' '}
                                <a href="" className={cx('text-danger')}>
                                    Tạo một tài khoản mới{' '}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={cx('col-lg-3')}></div>
            </div>
            <Toast
                classNames={cx('login-toast')}
                text={'Đăng nhập thất bại. Sai email hoặc mật khẩu'}
                toggle={toast}
                autoHide={() => setToast(false)}
            />

            <Toast
                classNames={cx('login-toast')}
                text={'Vào Gmail của bạn Active tài khoản để mua hàng'}
                toggle={toastWarning}
                continueAction={() => navigate('/')}
            />
        </>
    );
}

export default Form3;

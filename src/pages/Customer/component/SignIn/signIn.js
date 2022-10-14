import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '~/features/counter/usersSlice';

import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { setUser } from '~/features/counter/usersSlice';
import avatar from '~/assets/avatar';

import classNames from 'classnames/bind';
import styles from './Form2.module.scss';
import { createUserApi, handleUser } from '~/service/customerService';

const cx = classNames.bind(styles);
function SignIn() {
    const { action } = useParams();
    const [typePass, setTypePass] = useState('password');
    const navigate = useNavigate();
    const [eror, setEror] = useState(null);
    const [userR, setUserR] = useState({});
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('users'));
        setUserR(data);
    }, []);

    const handleSignIn = async (data) => {
        delete data.re_password;
        const dataUser = await handleUser(action, data);
        console.log(dataUser);
        if (Object.keys(dataUser).length > 0) {
            navigate('/customer/login');
        } else {
            setEror('Tài khoản đã tồn tại');
        }
    };

    const handlePassword = () => {
        if (watch('password') != watch('re_password')) {
            setEror('Kiểm tra lại, bạn nhập lại mật khẩu không khớp');
        } else setEror(null);
    };

    return (
        <div className={cx('wrapper', 'row', 'h-lg-100')}>
            <div className={cx('col-lg-3')}></div>
            <div className={cx('col-lg-6', ' d-flex', 'align-items-center', 'justify-content-center')}>
                <div className={cx('login-box')}>
                    <div className={cx('d-block', 'pb-5')}>
                        <h3 className={cx('login-title', 'text-danger')}>Đăng ký</h3>
                        <h3 className={cx('login-title2')}>Đăng ký tài khoản mới của bạn</h3>
                        <form onSubmit={handleSubmit(handleSignIn)}>
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
                            <div className={cx('form-group', 'position-relative')}>
                                <label htmlFor="exampleInputPassword2">Nhập lại mật khẩu</label>
                                <div className={cx('position-relative')}>
                                    <input
                                        className={cx('form-control', 'password-control')}
                                        id="exampleInputPassword2"
                                        type={typePass}
                                        placeholder="re-Password"
                                        {...register('re_password', {
                                            required: 'Vui lòng nhập lại mật khẩu',
                                            onBlur: handlePassword,
                                        })}
                                    />
                                </div>
                                <p className={cx('error')}>{errors.re_password?.message}</p>
                                <p className={cx('error')}>{eror}</p>
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
                                disabled={!!eror}
                            >
                                đăng ký
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className={cx('col-lg-3')}></div>
        </div>
    );
}

export default SignIn;

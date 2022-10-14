import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './ChangePass.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function ChangePass({ className }) {
    const [err, setErr] = useState(null);
    const [errOld, setErrOld] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector((store) => store.users.user);
    const password = user.password;
    const navigate = useNavigate();
    useEffect(() => {
        if (Object.values(user).length == 0) {
            navigate('/');
        }
    }, []);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const handleChangePass = (data) => {
        console.log(data);
    };

    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('title', 'mb-4')}>
                <h1 className={cx('title-name')}>Đổi Mật Khẩu</h1>
                <p>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</p>
            </div>
            <form onSubmit={handleSubmit(handleChangePass)}>
                <div className={cx('form-group row')}>
                    <label htmlFor="inputPassword2" className={cx('col-sm-3 col-form-label', 'custom-label')}>
                        Mật khẩu hiện tại
                    </label>
                    <div className={cx('col-sm-9')}>
                        <input
                            type="text"
                            className={cx('form-control', 'custom-control')}
                            id="inputPassword2"
                            placeholder="Mật khẩu hiện tại"
                            {...register('password', { required: 'Bạn chưa nhập mật khẩu cũ' })}
                        />
                    </div>
                </div>
                <div className={cx('form-group row')}>
                    <label htmlFor="inputPassword1" className={cx('col-sm-3 col-form-label', 'custom-label')}>
                        Mật khẩu mới
                    </label>
                    <div className={cx('col-sm-9')}>
                        <input
                            type="email"
                            className={cx('form-control', 'custom-control')}
                            id="inputPassword1"
                            placeholder="Mật khẩu mới"
                            {...register('newPassword', { required: 'bạn phải nhập mật khẩu mới' })}
                        />
                    </div>
                </div>
                <div className={cx('form-group row')}>
                    <label htmlFor="inputPassword2" className={cx('col-sm-3 col-form-label', 'custom-label')}>
                        Xác nhận mật khẩu
                    </label>
                    <div className={cx('col-sm-9')}>
                        <input
                            type="tel"
                            className={cx('form-control', 'custom-control')}
                            id="inputPassword2"
                            placeholder="Nhập lại mật khẩu"
                            {...register('reNew', {
                                required: 'bạn phải nhập lại mật khẩu',
                                onBlur: (e) => {
                                    if (watch('newPassword') != e.target.value) {
                                        setErr('Mật khẩu mới không giống nhau');
                                    } else {
                                        setErr(null);
                                    }
                                },
                            })}
                        />
                    </div>
                </div>
                {err && <p className={cx()}>{err}</p>}
                <div className={cx('form-group row')}>
                    <label htmlFor="staticEmail" className={cx('col-sm-3 col-form-label')}></label>
                    <div className={cx('col-sm-9')}>
                        <button className={cx('btn btn-primary btn-lg', 'btn-custom')} type="submit">
                            Cập nhật
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ChangePass;

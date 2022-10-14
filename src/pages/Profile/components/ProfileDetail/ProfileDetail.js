import { useForm } from 'react-hook-form';

import classNames from 'classnames/bind';
import styles from './ProfileDetail.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateAction } from '~/features/counter/userAction';

const cx = classNames.bind(styles);
function ProfileDetail({ className }) {
    const user = useSelector((store) => store.users.user);
    const dispatch = useDispatch();
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

    const handleUpdate = async (data) => {
        await updateAction({ ...user, ...data })(dispatch);
    };
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('title', 'mb-4')}>
                <h1 className={cx('title-name')}>hồ sơ của tôi</h1>
                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>
            <form onSubmit={handleSubmit(handleUpdate)}>
                <div className={cx('form-group row')}>
                    <label htmlFor="staticEmail" className={cx('col-sm-2 col-form-label', 'custom-label')}>
                        Tên
                    </label>
                    <div className={cx('col-sm-10')}>
                        <input
                            type="text"
                            className={cx('form-control-plaintext')}
                            id="staticEmail"
                            defaultValue={user?.name}
                            {...register('name')}
                        />
                    </div>
                </div>
                <div className={cx('form-group row')}>
                    <label htmlFor="inputPassword1" className={cx('col-sm-2 col-form-label', 'custom-label')}>
                        Email
                    </label>
                    <div className={cx('col-sm-10')}>
                        <input
                            type="email"
                            className={cx('form-control', 'custom-control')}
                            id="inputPassword1"
                            placeholder="Email"
                            defaultValue={user?.email}
                            {...register('email')}
                        />
                    </div>
                </div>
                <div className={cx('form-group row')}>
                    <label htmlFor="inputPassword2" className={cx('col-sm-2 col-form-label', 'custom-label')}>
                        Số điện thoại
                    </label>
                    <div className={cx('col-sm-10')}>
                        <input
                            type="tel"
                            className={cx('form-control', 'custom-control')}
                            id="inputPassword2"
                            placeholder="Phone"
                            {...register('phone')}
                            defaultValue={user?.phone}
                        />
                    </div>
                </div>
                <div className={cx('form-group row')}>
                    <label htmlFor="inputPassword2" className={cx('col-sm-2 col-form-label', 'custom-label')}>
                        Địa chỉ
                    </label>
                    <div className={cx('col-sm-10')}>
                        <input
                            type="text"
                            className={cx('form-control', 'custom-control')}
                            id="inputPassword2"
                            placeholder="Address"
                            defaultValue={user?.address}
                            {...register('address')}
                        />
                    </div>
                </div>
                {/* <div className={cx('form-group row')}>
                    <label className={cx('col-sm-2 col-form-label', 'custom-label')}>Ngày sinh</label>
                    <div className={cx('form-row ', 'col-sm-10')}>
                        <div className={cx('form-group col-md-3')}>
                            <select
                                id="inputState"
                                className={cx('form-control', 'custom-control')}
                                {...register('day')}
                            >
                                <option selected>Choose...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div className={cx('form-group col-md-3')}>
                            <select
                                id="inputState"
                                className={cx('form-control', 'custom-control')}
                                {...register('month')}
                            >
                                <option selected>Choose...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div className={cx('form-group col-md-3')}>
                            <select
                                id="inputState"
                                className={cx('form-control', 'custom-control')}
                                {...register('year')}
                            >
                                <option selected>Choose...</option>
                                <option>...</option>
                            </select>
                        </div>
                    </div>
                </div> */}
                {/* <fieldset className="form-group">
                    <div className="row">
                        <legend className={cx('col-form-label col-sm-2 pt-0', 'custom-label')}>Giới tính</legend>
                        <div className={cx('col-sm-10 form-row align-items-center')}>
                            <div className={cx('form-check', 'mr-4')}>
                                <input
                                    className={cx('form-check-input', 'custom-input-check')}
                                    type="radio"
                                    {...register('gender')}
                                    id="gridRadios1"
                                    defaultValue="male"
                                />
                                <label className={cx('form-check-label', 'custom-label')} htmlFor="gridRadios1">
                                    Nam
                                </label>
                            </div>
                            <div className={cx('form-check', 'mr-4')}>
                                <input
                                    className={cx('form-check-input', 'custom-input-check')}
                                    type="radio"
                                    {...register('gender')}
                                    id="gridRadios2"
                                    defaultValue="female"
                                />
                                <label className={cx('form-check-label', 'custom-label')} htmlFor="gridRadios2">
                                    Nữ
                                </label>
                            </div>
                            <div className="form-check disabled">
                                <input
                                    className={cx('form-check-input', 'custom-input-check')}
                                    type="radio"
                                    {...register('gender')}
                                    id="gridRadios3"
                                    defaultValue="another"
                                />
                                <label className={cx('form-check-label', 'custom-label')} htmlFor="gridRadios3">
                                    Khác
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset> */}
                <div className={cx('form-group row')}>
                    <label htmlFor="staticEmail" className={cx('col-sm-2 col-form-label')}></label>
                    <div className={cx('col-sm-10')}>
                        <button className={cx('btn btn-primary btn-lg', 'btn-custom')} type="submit">
                            Lưu
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ProfileDetail;

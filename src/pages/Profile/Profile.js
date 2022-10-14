import { FiUser } from 'react-icons/fi';

import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useState } from 'react';
import ProfileDetail from './components/ProfileDetail/ProfileDetail';
import Address from './components/Address/Address';
import ChangePass from './components/ChangePass/ChangePass';

const cx = classNames.bind(styles);
function Profile() {
    const [link, setLink] = useState(0);

    return (
        <div className={cx('wrapper', 'container')}>
            <div className={cx('row')}>
                <div className={cx('col-xl-3')}>
                    <p className={cx('profile-title', 'position-relative')}>
                        <FiUser className={cx('position-absolute')} />
                        <span>Tài khoản của tôi</span>
                    </p>
                    <p className={cx('profile-title', { titleActive: link == 0 })} onClick={() => setLink(0)}>
                        <span>Hồ Sơ</span>
                    </p>
                    <p className={cx('profile-title', { titleActive: link == 2 })} onClick={() => setLink(2)}>
                        <span>Đổi mật khẩu</span>
                    </p>
                </div>
                <div className={cx('col-xl-9', 'profile-content')}>
                    <ProfileDetail className={cx('profile-item', { itemActive: link == 0 })} />
                    <ChangePass className={cx('profile-item', { itemActive: link == 2 })} />
                </div>
            </div>
        </div>
    );
}

export default Profile;

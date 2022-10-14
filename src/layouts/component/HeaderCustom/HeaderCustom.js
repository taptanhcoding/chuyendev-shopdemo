import { Link, useParams } from 'react-router-dom';
import HeadLessTippy from '@tippyjs/react/headless';

import { AiOutlineSearch } from 'react-icons/ai';
import { TbPhoneCall } from 'react-icons/tb';
import { BsCheck2Circle, BsCart3 } from 'react-icons/bs';
import { VscAccount } from 'react-icons/vsc';
import imgs from '~/assets/img';

import classnames from 'classnames/bind';
import styles from './Header.module.scss';
import Search from './component/Search/Search';
import Wrapper from '~/component/Wrapper/Wrapper';
import Sale from './component/Sale/Sale';
import Logo from '~/component/Logo/Logo';

const cx = classnames.bind(styles);
function HeaderCustom() {
    const { action } = useParams();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('row', 'm-0', 'align-items-center', 'justify-content-between')}>
                    <Logo />
                    <div className={cx('support', 'row', 'm-0')}>
                        <Link
                            to={`/customer/${action == 'login' ? 'signin' : 'login'}`}
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
                            <div className={cx('support-title')}>{action == 'login' ? 'Đăng ký' : 'Đăng nhập'}</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderCustom;

import { Link } from 'react-router-dom';
import FooterItem from './component/FooterItem/FooterItem';

import imgs from '~/assets/img';

import classnames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classnames.bind(styles);
function Footer() {
    return (
        <div className={cx('wrapper', 'mt-4', 'container')}>
            <div className={cx('row')}>
                <div className={cx('col-sm-6', 'col-12', 'row', 'm-0')}>
                    <FooterItem className={cx('col-lg-6', 'p-0')} title={'CHUYENDEV'}>
                        <ul className={cx('footer-list')}>
                            <li className={cx('footer-item')}>
                                <Link className={cx('footer-link')} to="">
                                    Tin tức
                                </Link>
                            </li>
                            <li className={cx('footer-item')}>
                                <Link className={cx('footer-link')} to="">
                                    Giới thiệu
                                </Link>
                            </li>
                            <li className={cx('footer-item')}>
                                <Link className={cx('footer-link')} to="">
                                    Tuyển dụng
                                </Link>
                            </li>
                            <li className={cx('footer-item')}>
                                <Link className={cx('footer-link')} to="">
                                    Văn phòng làm việc
                                </Link>
                            </li>
                            <li className={cx('footer-item')}>
                                <Link className={cx('footer-link')} to="">
                                    Thời gian làm việc( 8h30-17h T2-T7)
                                </Link>
                            </li>
                        </ul>
                    </FooterItem>
                    <FooterItem className={cx('col-lg-6', 'p-0')} title={'Hỗ trợ khách hàng'}>
                        <ul className={cx('footer-list')}>
                            <li className={cx('footer-item')}>
                                <Link className={cx('footer-link')} to="">
                                    Chính sách, quy định chung
                                </Link>
                            </li>
                            <li className={cx('footer-item')}>
                                <Link className={cx('footer-link')} to="">
                                    Chính sách vận chuyển
                                </Link>
                            </li>
                            <li className={cx('footer-item')}>
                                <Link className={cx('footer-link')} to="">
                                    Chính sách bảo hành
                                </Link>
                            </li>
                            <li className={cx('footer-item')}>
                                <Link className={cx('footer-link')} to="">
                                    Chính sách đổi trả
                                </Link>
                            </li>
                            <li className={cx('footer-item')}>
                                <Link className={cx('footer-link')} to="">
                                    Hướng dẫn mua hàng online
                                </Link>
                            </li>
                        </ul>
                    </FooterItem>
                </div>
                <FooterItem className={cx('col-sm-6', 'col-12')} title={'hệ thống của hàng'}>
                    <ul className={cx('footer-list')}>
                        <li className={cx('footer-item')}>
                            <span>- Địa chỉ mua hàng: </span>Số 2 Lê Văn Thiêm, Nhân Chính, Thanh Xuân, Hà Nội
                        </li>
                        <li className={cx('footer-item')}>
                            <span>Hotline: </span>0366696660 - 0903241119
                        </li>
                    </ul>
                </FooterItem>
            </div>
            <div className={cx('row', 'pt-4', 'pb-4')}>
                <div className={cx('col-lg-6')}>
                    <FooterItem className={cx('row')} title={'phương thức thanh toán'}>
                        <Link className={cx('col', 'pay-item')} to="">
                            <img src={imgs.maestro} />
                        </Link>
                        <Link className={cx('col', 'pay-item')} to="">
                            <img src={imgs.paypal} />
                        </Link>
                        <Link className={cx('col', 'pay-item')} to="">
                            <img src={imgs.untitled} />
                        </Link>
                        <Link className={cx('col', 'pay-item')} to="">
                            <img src={imgs.visa} />
                        </Link>
                    </FooterItem>
                    <FooterItem className={cx('row', 'mt-4')} title={'hình thức vận chuyển'}>
                        <Link className={cx('col', 'pay-item')} to="">
                            <img src={imgs.giaohang} />
                        </Link>
                    </FooterItem>
                </div>
                <div className={cx('col-lg-6')}>
                    {/* <iframe
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnoi.song.71&tabs=timeline&width=320px&height=178px&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                        style={{ width: '320px', height: '178px', border: 'none', overflow: 'hidden' }}
                        scrolling="no"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    ></iframe> */}
                    <div
                        className={cx('fb-page')}
                        style={{ height: '178px' }}
                        data-href="https://www.facebook.com/facebook"
                        data-width="380"
                        data-hide-cover="false"
                        data-show-facepile="false"
                    ></div>
                </div>
            </div>
            <div className={cx('text-center', 'copyright')}>
                <span>© CHUYENDEV. All Rights Reserved</span>
            </div>
        </div>
    );
}

export default Footer;

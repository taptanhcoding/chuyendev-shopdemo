import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { TbShoppingCartPlus } from 'react-icons/tb';

import ProductMenu from '~/component/ProductMenu/ProductMenu';
import products from '~/assets/products';

import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
import Price from '~/component/Price/Price';
import ColorBox from '~/component/ColorBox/ColorBox';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleCart } from '~/features/cart/cartSlice';
import { money } from '~/app/money';
import { getDetail } from '~/service/productService';
import DescriptionContent from './components/DescriptionContent/DescriptionContent';
import Standard2 from '~/component/Standard2/Standard2';

const cx = classNames.bind(styles);
function Detail() {
    const navigate = useNavigate();
    const { name } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const submitElement = useRef();

    useEffect(() => {
        const Detail = async () => {
            const detailProduct = await getDetail(name);
            setProduct(detailProduct);
        };
        Detail();
    }, [name]);

    const handleAddCart = () => {};

    const handleColor = (data) => {
        let productData = {};
        if (product.color[0] != '') {
            productData = { quanity: 1, product, ...data };
        } else {
            productData = { quanity: 1, product, color: '' };
        }
        dispatch(handleCart(productData));
        navigate('/cart');
    };

    const handleChange = (e) => {
        console.log(e.targe.value);
    };

    return (
        <>
            <div className={cx('wrapper', 'container')}>
                <div className={cx('breadcrumbs')}>
                    <ul className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <Link to="/">Trang ch???</Link>
                        </li>
                        <li className={cx('breadcrumb-item')}>
                            <span>{product.name}</span>
                        </li>
                    </ul>
                </div>
                <ProductMenu label hoverToShow />
                <div className={cx('container', 'product-detail', 'p-0')}>
                    <div className={cx('product-name')}>
                        <h1 className={cx('name')}>{product.name}</h1>
                        <span className={cx('rate')}></span>
                    </div>
                    <div className={cx('product-content', 'row')}>
                        <div className={cx('product-left', 'col-xl-9', 'col-lg-12')}>
                            <div className={cx('row')}>
                                <div className={cx('col-xl-6')}>
                                    <div className={cx('product-img')}>
                                        {/* <img src={product.image[0]} /> */}
                                        {product.image && (
                                            <Standard2 data={product.image} className={cx('slide-img')} />
                                        )}
                                        <div className={cx('intro')}>{product.info}</div>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit(handleColor)} className={cx('col-xl-6')}>
                                    <div className={cx('product-action')}>
                                        <Price
                                            className={cx('price')}
                                            price={money(product.price)}
                                            fsPrice={'1.5rem'}
                                            currentPrice={money(product.new_price)}
                                            fsCurrent={'2.6rem'}
                                        />
                                        <div className={cx('status')}>
                                            <span className={cx('status1')}>
                                                <span>T??nh tr???ng: {product.amount > 0 ? 'C??n h??ng' : 'H???t h??ng'} </span>
                                                {product.amount > 0 ? (
                                                    <BsCheckCircleFill className={cx('check')} />
                                                ) : (
                                                    <BsXCircleFill className={cx('check-err')} />
                                                )}
                                            </span>
                                            {product.color && product.color[0] != '' && (
                                                <span
                                                    className={cx(
                                                        'status2',
                                                        'd-flex',
                                                        'flex-row',
                                                        'align-items-center',
                                                    )}
                                                >
                                                    Ch???n m??u:
                                                    <span
                                                        className={cx(
                                                            'color',
                                                            'd-flex',
                                                            'flex-row',
                                                            'align-items-center',
                                                            'ml-4',
                                                        )}
                                                    >
                                                        {product.color.map((color, index) => (
                                                            <div
                                                                key={index}
                                                                className={cx(
                                                                    'wrapper',
                                                                    'd-flex',
                                                                    'align-items-center',
                                                                    'mr-4',
                                                                )}
                                                            >
                                                                <input
                                                                    type={'radio'}
                                                                    id={color}
                                                                    defaultValue={color}
                                                                    onChange={handleChange}
                                                                    {...register('color', {
                                                                        required: 'vui l??ng ch???n m??u ',
                                                                    })}
                                                                    hidden
                                                                />
                                                                <label
                                                                    style={{ backgroundColor: color }}
                                                                    className={cx('label', 'circle')}
                                                                    htmlFor={color}
                                                                ></label>
                                                            </div>
                                                        ))}
                                                    </span>{' '}
                                                    <p className={cx('error-color')}>{errors.color?.message}</p>
                                                </span>
                                            )}
                                        </div>
                                        <div className={cx('promotion', 'position-relative')}>
                                            <h3 className={cx('promotion-title', 'position-absolute')}>Khuy???n m??i</h3>
                                            <div className={cx('promotion-item')}>
                                                <span>
                                                    <BsCheckCircleFill className={cx('check')} />
                                                    Ship h??ng to??n qu???c, nh???n h??ng thanh to??n{' '}
                                                </span>
                                            </div>
                                            <div className={cx('promotion-item')}>
                                                <BsCheckCircleFill className={cx('check')} />
                                                <Link to="">Tham gia C???ng ?????ng Smartwatch ????? th???o lu???n t???i ????Y</Link>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className={cx(
                                                'btn btn-primary btn-lg btn-block',
                                                'btn-buy',
                                                'd-flex',
                                                'flex-row',
                                                'justify-content-center',
                                                'align-items-center',
                                            )}
                                            onClick={handleAddCart}
                                        >
                                            <span className={cx('buy-icon', 'mr-2')}>
                                                <TbShoppingCartPlus />
                                            </span>
                                            <span className={cx('buy-title')}>
                                                <p>Mua ngay</p>
                                                <p>Giao h??ng nhanh to??n qu???c</p>
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className={cx('product-right', 'col-xl-3')}>
                            <div className={cx('title')}>C?? th??? b???n quan t??m</div>
                        </div>
                    </div>
                    <div className={cx('product-compare')}></div>
                    <div className={cx('product-para')}>
                        <h1 className={cx('description-title')}>?????c ??i???m n???i b???t c???a {product.name}</h1>
                        <DescriptionContent className={cx('description-content')} data={product.description} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Detail;

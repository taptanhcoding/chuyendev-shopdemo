import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { DebounceInput } from 'react-debounce-input';

import { MdDeleteForever } from 'react-icons/md';

import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { addCart, handleCart, removeAllCart, removeCart, updateCart } from '~/features/cart/cartSlice';
import { money, total } from '~/app/money';
import { useEffect, useMemo, useState } from 'react';
import { addCartApi, orderCartApi } from '~/service/cartService';
import { handleAddCartFromApi } from '~/features/cart/cartAction';
const cx = classNames.bind(styles);

function Cart() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [returnCart, setReturnCart] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((store) => store.users.user);
    const cart = useSelector((store) => store.cart.cart);
    const totalAll = cart.reduce((total, product) => {
        let price = product.product.new_price || product.product.price;
        return total + product.quanity * price;
    }, 0);

    const cartToUp = (data) => {
        console.log(data);
        let cartUp = [];
        data.forEach((product) => {
            cartUp = [
                ...cartUp,
                {
                    color: product.color,
                    quanity: product.quanity,
                    name: product.product.name,
                    price: money(product.product.new_price || product.product.price),
                    slug: product.product.slug,
                    total: total(product.quanity, product.product.new_price || product.product.price),
                },
            ];
        });
        return cartUp;
    };

    const handleChangeQuanity = (e, product_id) => {
        const total = Number.parseInt(e.target.value) || 0;
        dispatch(updateCart({ quanity: total, product_id }));
    };

    const handleDeleteCart = (id) => {
        dispatch(removeCart(id));
    };

    const handleDeleteAll = () => {
        dispatch(removeAllCart());
    };

    useEffect(() => {
        const handleCartUser = async (user) => {
            await addCartApi(user._id, { cart });
        };

        if (Object.values(user).length > 0) {
            handleCartUser(user);
        }
        // addCartApi
    }, [cart]);
    const handleOrder = async (data) => {
        if (user.active) {
            const detailOrder = {
                customer_id: user._id,
                ...data,
                detailOrder: cartToUp(cart),
                totalPay: money(totalAll),
            };
            console.log(detailOrder);
            const result = await orderCartApi(user._id, detailOrder);
            if (result.status) {
                dispatch(removeAllCart());
            }
            setReturnCart(result);
        } else {
            alert('b???n ch??a active t??i kho???n,vui l??ng ki???m tra email');
        }
    };
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <div className={cx('wrapper', 'container')}>
            <h1 className={cx('cart-title')}>????n h??ng</h1>
            <div className={cx('detail-inner')}>
                {cart.length > 0 ? (
                    <div className={cx('cart-inner', 'row')}>
                        <div className={cx('detail-product', 'col-9')}>
                            <h1 className={cx('detail-title')}>Chi ti???t ????n h??ng</h1>

                            <table className={cx('table table-bordered', 'custom-table')}>
                                <thead>
                                    <tr>
                                        <th scope="col">t??n s???n ph???m</th>
                                        <th scope="col">s??? l?????ng </th>
                                        <th scope="col">????n gi??</th>
                                        <th scope="col">T???ng gi??</th>
                                        <th scope="col">x??a</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((product, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className={cx('product-info')}>
                                                    <Link to={`/detail/${product.product.slug}`}>
                                                        <p className={cx('product-name')}>{product.product.name}</p>
                                                        <div className={cx('product-img')}>
                                                            <img src={product.product.image[0]} />
                                                        </div>
                                                    </Link>
                                                    <span className={cx('product-color')}>{product.color}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <DebounceInput
                                                    debounceTimeout={500}
                                                    type={'number'}
                                                    name="quanity"
                                                    min={1}
                                                    value={product.quanity}
                                                    onChange={(e) => handleChangeQuanity(e, product.product.id)}
                                                    required
                                                />
                                            </td>
                                            <td>{money(product.product.new_price || product.product.price)}</td>
                                            <td>
                                                {total(
                                                    product.quanity,
                                                    product.product.new_price || product.product.price,
                                                )}
                                            </td>
                                            <td>
                                                <MdDeleteForever
                                                    className={cx('icon-delete')}
                                                    onClick={() => handleDeleteCart(index)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    <tr style={{ border: 'none' }}>
                                        <td colSpan={4}>
                                            <div className={cx('wrapper-action', 'd-flex', 'justify-content-left')}>
                                                <button
                                                    type="button"
                                                    className={cx('btn btn-danger btn-lg mr-4', 'custom-table-btn')}
                                                    onClick={handleDeleteAll}
                                                >
                                                    X??a h???t
                                                </button>
                                                <button
                                                    // to="/"
                                                    type="button"
                                                    onClick={handleBack}
                                                    className={cx('btn btn-danger btn-lg mr-4', 'custom-table-btn')}
                                                >
                                                    Ti???p t???c xem h??ng
                                                </button>
                                            </div>
                                        </td>
                                        <td colSpan={2} className={cx('text-right')}>
                                            Th??nh ti???n (VN??): {money(totalAll)} VN??
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={cx('detail-pay', 'col-3')}>
                            <h1 className={cx('detail-title')}>?????a ch??? nh???n h??ng</h1>
                            <div className={cx('detail-card')}>
                                {user && Object.values(user).length > 0 ? (
                                    <form onSubmit={handleSubmit(handleOrder)}>
                                        <div className={cx('form-group row')}>
                                            <div className={cx('col-sm-10')}>
                                                <input
                                                    type="text"
                                                    className={cx('form-control-plaintext')}
                                                    id="staticEmail"
                                                    placeholder="T??n ng?????i nh???n"
                                                    defaultValue={user?.name}
                                                    {...register('name', { required: 'vui l??ng nh???p t??n c???a b???n' })}
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('form-group row')}>
                                            <div className={cx('col-sm-10')}>
                                                <input
                                                    type="tel"
                                                    className={cx('form-control-plaintext')}
                                                    id="inputPassword2"
                                                    placeholder="Phone"
                                                    {...register('phone', { required: 'vui l??ng nh???p s??? li??n h???' })}
                                                    defaultValue={user?.phone}
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('form-group row')}>
                                            <div className={cx('col-sm-10')}>
                                                <input
                                                    type="tel"
                                                    className={cx('form-control-plaintext')}
                                                    id="inputPassword2"
                                                    placeholder="th??ng b??o t???i email"
                                                    {...register('email', { required: 'vui l??ng nh???p email li??n h???' })}
                                                    defaultValue={user?.email}
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('form-group row')}>
                                            <div className={cx('col-sm-10')}>
                                                <input
                                                    type="text"
                                                    className={cx('form-control-plaintext')}
                                                    id="inputPassword2"
                                                    placeholder="Address"
                                                    defaultValue={user?.address}
                                                    {...register('address', {
                                                        required: 'vui l??ng nh???p ?????a ch??? nh???n h??ng',
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            className={cx('btn btn-danger btn-lg', 'custom-table-btn')}
                                            type="submit"
                                        >
                                            Mua h??ng
                                        </button>
                                    </form>
                                ) : (
                                    'B???n c???n ????ng nh???p ????? mua h??ng'
                                )}
                            </div>
                        </div>
                    </div>
                ) : returnCart ? (
                    <p>
                        {returnCart.nofication}. B???n c?? mu???n <Link to="/"> ti???p t???c mua?</Link>
                    </p>
                ) : (
                    'Gi??? h??ng hi???n t???i ch??a c?? s???n ph???m n??o'
                )}
            </div>
        </div>
    );
}

export default Cart;

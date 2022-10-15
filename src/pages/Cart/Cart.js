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
            alert('bạn chưa active tài khoản,vui lòng kiểm tra email');
        }
    };
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <div className={cx('wrapper', 'container')}>
            <h1 className={cx('cart-title')}>đơn hàng</h1>
            <div className={cx('detail-inner')}>
                {cart.length > 0 ? (
                    <div className={cx('cart-inner', 'row')}>
                        <div className={cx('detail-product', 'col-9')}>
                            <h1 className={cx('detail-title')}>Chi tiết đơn hàng</h1>

                            <table className={cx('table table-bordered', 'custom-table')}>
                                <thead>
                                    <tr>
                                        <th scope="col">tên sản phẩm</th>
                                        <th scope="col">số lượng </th>
                                        <th scope="col">đơn giá</th>
                                        <th scope="col">Tổng giá</th>
                                        <th scope="col">xóa</th>
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
                                                    Xóa hết
                                                </button>
                                                <button
                                                    // to="/"
                                                    type="button"
                                                    onClick={handleBack}
                                                    className={cx('btn btn-danger btn-lg mr-4', 'custom-table-btn')}
                                                >
                                                    Tiếp tục xem hàng
                                                </button>
                                            </div>
                                        </td>
                                        <td colSpan={2} className={cx('text-right')}>
                                            Thành tiền (VNĐ): {money(totalAll)} VNĐ
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={cx('detail-pay', 'col-3')}>
                            <h1 className={cx('detail-title')}>địa chỉ nhận hàng</h1>
                            <div className={cx('detail-card')}>
                                {user && Object.values(user).length > 0 ? (
                                    <form onSubmit={handleSubmit(handleOrder)}>
                                        <div className={cx('form-group row')}>
                                            <div className={cx('col-sm-10')}>
                                                <input
                                                    type="text"
                                                    className={cx('form-control-plaintext')}
                                                    id="staticEmail"
                                                    placeholder="Tên người nhận"
                                                    defaultValue={user?.name}
                                                    {...register('name', { required: 'vui lòng nhập tên của bạn' })}
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
                                                    {...register('phone', { required: 'vui lòng nhập số liên hệ' })}
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
                                                    placeholder="thông báo tới email"
                                                    {...register('email', { required: 'vui lòng nhập email liên hệ' })}
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
                                                        required: 'vui lòng nhập địa chỉ nhận hàng',
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            className={cx('btn btn-danger btn-lg', 'custom-table-btn')}
                                            type="submit"
                                        >
                                            Mua hàng
                                        </button>
                                    </form>
                                ) : (
                                    'Bạn cần đăng nhập để mua hàng'
                                )}
                            </div>
                        </div>
                    </div>
                ) : returnCart ? (
                    <p>
                        {returnCart.nofication}. Bạn có muốn <Link to="/"> tiếp tục mua?</Link>
                    </p>
                ) : (
                    'Giỏ hàng hiện tại chưa có sản phẩm nào'
                )}
            </div>
        </div>
    );
}

export default Cart;

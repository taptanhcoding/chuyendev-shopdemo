import classNames from 'classnames/bind';
import styles from './Address.module.scss';

const cx = classNames.bind(styles);
function Address({ className }) {
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('title')}>
                <h1 className={cx('title-name')}>Địa chỉ</h1>
            </div>
            <table className="table">
                <tbody>
                    <tr>
                        <th scope="row">Địa chỉ</th>
                        <td>Cập nhật</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Address;

import classNames from 'classnames/bind';
import { useEffect } from 'react';
import styles from './Toast.module.scss';

const cx = classNames.bind(styles);

function Toast({ text, classNames, toggle, continueAction, close, autoHide }) {
    useEffect(() => {
        if (autoHide) {
            var Hide = setTimeout(autoHide, 3000);
        }
        return () => {
            autoHide && clearTimeout(Hide);
        };
    });
    return (
        <>
            <div
                className={cx('toast', 'toast-custom', classNames, { active: toggle })}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div className={cx('toast-header')}>
                    <strong className={cx('mr-auto')}>Chuyendev thông báo</strong>
                    <button
                        type="button"
                        className={cx('ml-2 mb-1 close')}
                        data-dismiss="toast"
                        aria-label="Close"
                    ></button>
                </div>
                <div className={cx('toast-body')}>{text}</div>
                <div className={cx('toast-body', 'd-flex', 'flex-row', 'justify-content-between')}>
                    {close && (
                        <button type="button" className={cx('btn btn-info')} onClick={close}>
                            Hủy
                        </button>
                    )}
                    {continueAction && (
                        <button type="button" className={cx('btn btn-danger')} onClick={continueAction}>
                            Tiếp tục
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

export default Toast;

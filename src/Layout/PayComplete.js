import clsx from "clsx";
import style from "./Checkout/Pay.module.scss"
import { Link } from 'react-router-dom';

function PayComplete() {
    return (
        <div className={clsx('text-center mt-12', style.complete)} style={{minHeight: '40vh'}}>
            <h1 className={clsx('text-2xl uppercase font-semibold', style.title_com)}>Hoàn tất đặt hàng</h1>
            <p className = {clsx('text-lg', style.font_small)}>Cảm ơn bạn đã mua sản phẩm của chung tôi.</p>
            <p className = {clsx('text-lg', style.font_small)}>
                Nhân viên của chúng tôi sẽ sớm liên lạc để xác nhận đơn đặt hàng của bạn trong
                <span className='font-semibold'> 24h </span> tới. Vui lòng chú ý đến điện thoại của bạn.
            </p>
            <p className = {clsx('text-lg', style.font_small)}>
                Quý khách có thể theo dõi đơn hàng của mình tại {" "}
                <Link className={clsx(' text-lg font-semibold text-red-500 no-underline hover:text-yellow-400', style.font_small)} to={"/account"}>đây</Link>
            </p>
            <Link to={'/'} className={clsx(' text-lg font-semibold underline hover:text-yellow-400', style.font_small)}>
                Về trang chủ
            </Link>
        </div>
    );
}

export default PayComplete;

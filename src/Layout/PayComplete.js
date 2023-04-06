
import { Link } from 'react-router-dom';
function PayComplete() {
    return (
        <div className='text-center mt-12' style={{minHeight: '40vh'}}>
            <h1 className='text-2xl' style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Hoàn tất đặt hàng</h1>
            <p className = 'text-lg'>Cảm ơn bạn đã mua sản phẩm trên Website của chung tôi.</p>
            <p className = 'text-lg'>
                Nhân viên của chúng tôi sẽ sớm liên lạc để xác nhận đơn đặt hàng của bạn trong
                <span className='font-semibold'> 24h </span> tới. Vui lòng chú ý đến điện thoại của bạn.
            </p>
            <p className = 'text-lg'>
                Quý khách có thể theo dõi đơn hàng của mình bằng cách đăng nhập trước khi đặt hàng. 
                <Link className=' text-lg font-semibold text-red-500 no-underline uppercase hover:text-yellow-400' to={"/login"}> Đăng nhập tại đây</Link>
            </p>
            <Link to={'/'} className=' text-lg font-semibold text-red-500 no-underline uppercase hover:text-yellow-400'>
                Về trang chủ
            </Link>
        </div>
    );
}

export default PayComplete;

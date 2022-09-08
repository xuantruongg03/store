import { Link } from 'react-router-dom';
import slug from '../../Convert/ConvertStringVNtoTitle';
import './CompListMenu.css';

function ListMenu(props) {
    const lists = [
        'Sản phẩm mới',
        'Máy tính xách tay',
        'Máy tính để bàn',
        'Chuột, Bàn phím, Tai nghe',
        'Màn hình máy tính',
        'Ghế Gaming',
        'Tin tức',
        'Sản phẩm khuyến mãi',
        'Liên hệ',
        'Hệ thống cửa hàng',
        'Tra cứu đơn hàng',
        'Tuyển dụng',
        'Phản ánh, khiếu nại',
    ];
    return (
        <div>
            <ul className="list-group">
                {lists.map((item, index) => (
                    <li key={index} className="list-group-item">
                        <Link to={slug(item)} className="item">
                            {item}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListMenu;

import { Link } from 'react-router-dom';
import slug from '../../Convert/ConvertStringVNtoTitle';
import style from './CompListMenu.module.scss';

function ListMenu(props) {
    const lists = [
        {
            id: 1,
            name: 'Sản phẩm mới',
            path: '/new',
        },
        {
            id: 2,
            name: 'Máy tính xách tay',
            path: '/laptop',
        },
        {
            id: 3,
            name: 'Máy tính để bàn',
            path: '/desktop',
        },
        {
            id: 4,
            name: 'Chuột, Bàn phím, Tai nghe',
            path: '/accessories',
        },
        {
            id: 5,
            name: 'Màn hình máy tính',
            path: '/monitor',
        },
        {
            id: 6,
            name: 'Ghế Gaming',
            path: '/chair',
        },
        {
            id: 7,
            name: 'Tin tức',
            path: '/news',
        },
        {
            id: 8,
            name: 'Sản phẩm khuyến mãi',
            path: '/promotion',
        },
        {
            id: 9,
            name: 'Liên hệ',
            path: '/contact',
        },
        {
            id: 10,
            name: 'Đặt lịch sửa chữa',
            path: '/booking',
        },
        {
            id: 11,
            name: 'Tra cứu đơn hàng',
            path: '/order',
        },
        {
            id: 12,
            name: 'Tuyển dụng',
            path: '/recruitment',
        },
        {
            id: 13,
            name: 'Phản ánh, khiếu nại',
            path: '/complaint',
        },
    ];
    return (
        <div>
            <ul className="list-group">
                {lists.map((item, index) => (
                    <li key={index} className={style.listGroupItem}>
                        <Link to={slug(item.path)} className={style.item}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListMenu;

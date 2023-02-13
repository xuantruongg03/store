import { Link } from 'react-router-dom';
import style from './CompListMenu.module.scss';

const lists = [
    {
        id: 1,
        name: 'Sản phẩm mới',
        path: '/new',
    },
    {
        id: 2,
        name: 'Sản phẩm khuyến mãi',
        path: '/sale',
    },
    {
        id: 3,
        name: 'Máy tính để bàn',
        path: '/pc',
    },
    {
        id: 4,
        name: 'Máy tính xách tay',
        path: '/laptop',
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
        name: 'Chuột, Bàn phím, Tai nghe',
        path: '/accessories',
    },
    {
        id: 8,
        name: 'Tin tức',
        path: '/news',
    },
    {
        id: 9,
        name: 'Giới thiệu',
        path: '/about',
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
function ListMenu() {
    return (
        <div>
            <ul className={style.listGroup}>
                {lists.map((item, index) => (
                    <li key={index} className={style.listGroupItem}>
                        <Link to={`${item.path}`} className={style.item}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListMenu;

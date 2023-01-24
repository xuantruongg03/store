import { faPiggyBank, faScrewdriverWrench, faSearch, faShieldAlt, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import avatar from '../../access/image/avatar.jpg';
import style from './CompHeader.module.scss';

const list = [
    {
        id: 1,
        name: 'Giá siêu ưu đãi',
        icon: faPiggyBank,
    },
    {
        id: 2,
        name: 'Cam kết chất lượng',
        icon: faShieldAlt,
    },
    {
        id: 3,
        name: 'Sửa chữa tại nhà',
        icon: faScrewdriverWrench,
    },
    {
        id: 4,
        name: 'Miễn phí vận chuyển',
        icon: faTruck,
    },
];

function CompHeader(props) {
    const state = useSelector(state => state.login);
    const [stateLogin, setStateLogin] = useState(state != null ? state.state : false);
    const [show, setShow] = useState(false);
    const handleLogout = () => {
        setStateLogin(false);
    };

    const showMenu = () => {
        setShow(!show);
    };

    return (
        <div className={style.CompHeader}>
            <div className={style.contact}></div>
            <nav className={style.nav}>
                <Link to={'/'}>
                    <img
                        className={style.logo}
                        src="https://traffic-edge31.cdn.vncdn.io/nvn/ncdn/store3/96878/logo_1648529159_logo%200338.png"
                        alt="logo"
                    />
                </Link>

                <div className={style.formSearch}>
                    <input type="text" className={style.formSearchInput} placeholder="Tìm kiếm" />
                    <FontAwesomeIcon icon={faSearch} className={style.iconSearch} />
                </div>
                {stateLogin ? (
                    <div className={style.boxAccount}>
                        <img src={avatar} alt="Avatar" className={style.account} onClick={showMenu} />
                        <div className={style.accountName} onClick={showMenu}>
                            {state.data[0].ho + " " + state.data[0].ten}
                        </div>
                        {show ? (
                            <div className={style.accountMenu}>
                                <a href="/" className={style.accountMenuItem}>
                                    Tài khoản
                                </a>
                                <Link to="/cart" className={style.accountMenuItem}>
                                    Giỏ hàng
                                </Link>
                                <div className={style.accountMenuItem} onClick={handleLogout}>
                                    Đăng xuất
                                </div>
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <div className={style.boxBtnLogin}>
                        <Link to="/login" className={style.btnLogin}>
                            Đăng nhập
                        </Link>
                        <Link to="/register" className={style.btnRegister}>
                            Đăng ký
                        </Link>
                    </div>
                )}
            </nav>

            <div className={style.brick} />

            <div className={style.navMenu}>
                <ul className={style.listMenu}>
                    {list.map((item) => (
                        <li className={style.li} key={item.id}>
                            <FontAwesomeIcon icon={item.icon} className={style.icon} />
                            <div className={style.menuItem}>{item.name}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default CompHeader;

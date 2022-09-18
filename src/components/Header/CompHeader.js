import { faBars, faCartShopping, faPiggyBank, faSearch, faShieldAlt, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './CompHeader.css';

function CompHeader(props) {
    return (
        <div className="CompHeader">
            <div className="contact"></div>
            <div className="nav">
                <Link to={'/store'}>
                    <img
                        className="logo"
                        src="https://traffic-edge31.cdn.vncdn.io/nvn/ncdn/store3/96878/logo_1648529159_logo%200338.png"
                    />
                </Link>

                <form className="form-search flex">
                    <input type="text" className="form-search-input" placeholder="Nhập tên sản phẩm muốn tìm..." />
                    <FontAwesomeIcon icon={faSearch} className="iconSearch" />
                </form>

                <div className="cart">
                    <Link to={'cart'} className="btn-cart">
                        <FontAwesomeIcon icon={faCartShopping} className="icon" />
                        Giỏ hàng
                    </Link>
                </div>
            </div>

            <div className="brick" />

            <div className="nav-menu">
                <ul className="list-menu">
                    <li>
                        <FontAwesomeIcon icon={faBars} className="icon" />
                        <div className="menu-item dropDownCategory">Danh mục sản phẩm</div>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faShieldAlt} className="icon" />
                        <a href="#" className="menu-item">
                            Cam kết chất lượng
                        </a>
                    </li>
                    <li>
                        <a href="#" className="menu-item">
                            <FontAwesomeIcon icon={faPiggyBank} className="icon" />
                            Giá ưu đãi nhất
                        </a>
                    </li>

                    <li>
                        <a href="#" className="menu-item">
                            <FontAwesomeIcon icon={faTruck} className="icon" />
                            Miễn phí vận chuyển
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default CompHeader;

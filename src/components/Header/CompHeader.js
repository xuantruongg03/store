import { faPiggyBank, faScrewdriverWrench, faShieldAlt, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProducts } from 'src/api/products';
import avatarInit from '../../access/image/avatar.jpg';
import ConvertMoneyVND from '../../Convert/ConvertMoneyVND';
import ConvertStringVNtoTitle from '../../Convert/ConvertStringVNtoTitle';
import style from './CompHeader.module.scss';
import { getUserAPI } from 'src/api/user';

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

function CompHeader() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.login);
    const [data, setData] = useState(state !== null ? (state.state !== false ? state.data : null) : null);
    const [stateLogin, setStateLogin] = useState(state != null ? state.state : false);
    const [products, setProducts] = useState();
    const [result, setResult] = useState();
    const [show, setShow] = useState(false);
    const [avatar, setAvatar] = useState(avatarInit);

    const handleLogout = () => {
        setStateLogin(false);
        dispatch({
            type: 'LOGIN',
            payload: {
                state: false,
                data: null,
            },
        });
        localStorage.removeItem('token');
        localStorage.removeItem('customer_id');
        window.location.href = '/';
    };

    const showMenu = () => {
        setShow(!show);
    };

    const search = (e) => {
        if (e.target.value !== '') {
            let result = products.filter((products) =>
                products.product_name.toLowerCase().includes(e.target.value.toLowerCase()),
            );
            if (result.length === 0) {
                setResult(null);
            } else {
                setResult(result);
            }
        } else {
            setResult(null);
        }
    };

    const getInf = (e) => {
        dispatch({
            type: 'GET_INFO',
            data: {
                title: e.target.title,
                id_product: e.target.id,
            },
        });
    };

    useEffect(() => {
        const getData = async () => {
            const resProducts = await getAllProducts();
            setProducts(resProducts.data);
            if (resProducts.login) {
                setStateLogin(resProducts.login);
                let data = await getUserAPI(resProducts.customer_id);
                setData(data.data[0]);
                setAvatar(data.data[0].avatar);
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        state: true,
                        data: {
                            customer_id: data.customer_id,
                        },
                    },
                });
            }
        };
        getData();
    }, [dispatch]);

    return (
        <div className={style.CompHeader}>
            <div className={style.contact}></div>
            <nav className={style.nav}>
                <Link to={'/'}>
                    <img className={style.logo} src={require('../../access/image/logo.png')} alt="logo" />
                </Link>

                <div className={style.formSearch}>
                    <input type="text" className={style.formSearchInput} placeholder="Tìm kiếm" onChange={search} />
                    {/* <FontAwesomeIcon icon={faSearch} className={style.iconSearch} /> */}
                </div>
                {(() => {
                    if (result != null) {
                        return (
                            <div className={style.outputSearch}>
                                <ul className={style.listSearch}>
                                    {result.map((item, index) => (
                                        <li className={style.itemSearch} key={index}>
                                            <img
                                                src={item.product_images[0].file_path}
                                                alt="hình ảnh"
                                                className={style.img}
                                            />
                                            <div>
                                                <Link
                                                    to={`/products/${ConvertStringVNtoTitle(
                                                        item.product_name,
                                                    )}?search=${item.product_id}`}
                                                    id={item.product_id}
                                                    title={item.product_name}
                                                    className={style.linkSearch}
                                                    onClick={getInf}
                                                >
                                                    {item.product_name}
                                                </Link>
                                                <p className={style.price}>
                                                    Giá bán: {ConvertMoneyVND(item.product_price)}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    }
                })()}
                {stateLogin ? (
                    <div className={style.boxAccount}>
                        <img
                            src={avatar === null ? avatarInit : avatar}
                            alt="Avatar"
                            className={style.account}
                            onClick={showMenu}
                        />
                        <div className={style.accountName} onClick={showMenu}>
                            {data !== null ? data.first_name + ' ' + data.last_name : null}
                        </div>
                        {show ? (
                            <div className={style.accountMenu}>
                                <Link to={`/account`} className={style.accountMenuItem} onClick={showMenu}>
                                    Tài khoản
                                </Link>
                                <Link to={`/cart`} className={style.accountMenuItem} onClick={showMenu}>
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

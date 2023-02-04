import { faCartShopping, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import formatsMoney from 'src/Convert/ConvertMoneyVND';
import { addToCart } from 'src/api/cart';
import slug from '../../Convert/ConvertStringVNtoTitle';
import style from './CompProductItem.module.scss';

function CompProductItem(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector((state) => state.login);
    const stateLogin = state !== null ? state.state : false;
    const [amount, setAmount] = useState(1);
    const [isSales, setIsSales] = useState(true);
    let sale = Number(props.sale).toFixed();

    const addAmount = () => {
        setAmount(amount + 1);
    };

    const minusAmount = () => {
        if (amount < 2) {
            alert('Số lượng mua tối thiểu là 1 sản phẩm');
        } else {
            setAmount(amount - 1);
        }
    };

    const handleInput = (e) => {
        if (e.target.value < 0) {
            alert('Số lượng mua tối thiểu là 1 sản phẩm');
            setAmount(1);
        } else {
            setAmount(e.target.value);
        }
    };

    useEffect(() => {
        if (sale <= 0) {
            setIsSales(false);
        }
    }, [sale]);

    const handleBuy = () => {
        console.log(state);
        if (stateLogin) {
            // dispatch({
            //     type: 'ADD_TO_CART',
            //     data: {
            //         product_id: props.product_id,
            //         amount: amount,
            //     },
            // });
            const product_id = props.product_id;
            const quantity = amount;
            const customer_id = localStorage.getItem('customer_id');
            const add = async () => {
                const params = {
                    product_id,
                    quantity,
                    customer_id,
                };
                const res = await addToCart(params);
                if (res.message === 'ok') {
                    alert('Đặt hàng thành công! Hãy kiểm tra giỏ hàng của bạn.');
                } else {
                    alert('Lỗi phía Client! Thử lại sau.');
                }
            };
            add();
        } else {
            navigate('/login');
        }
    };

    const getInf = () => {
        dispatch({
            type: 'GET_INFO',
            data: {
                title: props.title,
                product_id: props.product_id,
            },
        });
    };
    return (
        <div className={style.styles}>
            <div className={isSales === true ? style.sale : 'disabled'}>
                <span style={{ fontSize: '12px' }}>OFF</span>
                <span>{sale + '%'}</span>
            </div>
            <img src={props.item} alt="img" className={style.image} />
            <br />
            <Link to={'/products/' + slug(props.title)} className={style.title} onClick={getInf}>
                {props.title}
            </Link>
            <div className={style.boxPrice}>
                <h3 className={style.price}>{formatsMoney(props.price)}</h3>
                <h4 className={isSales === true ? style.cost : 'disabled'}>{formatsMoney(props.cost)}</h4>
            </div>
            <div className={style.add}>
                <FontAwesomeIcon className={style.btnIcon} icon={faMinus} onClick={minusAmount} />
                <input className={style.input} value={amount} onChange={handleInput} disabled />
                <FontAwesomeIcon className={style.btnIcon} icon={faPlus} onClick={addAmount} />
                <FontAwesomeIcon className={style.cartShopping} icon={faCartShopping} onClick={handleBuy} />
            </div>
        </div>
    );
}

export default CompProductItem;

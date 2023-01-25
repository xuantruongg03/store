import { faCartShopping, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import formatsMoney from 'src/Convert/ConvertMoneyVND';
import slug from '../../Convert/ConvertStringVNtoTitle';
import style from './CompProductItem.module.scss';

function CompProductItem(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector(state => state.login);
    const stateLogin = state !== null ? state.state : false;
    const [amount, setAmount] = useState(1);
    const [isSales, setIsSales] = useState(true);
    let sale = Number((100 - (props.price / props.cost) * 100).toFixed(0));

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
        if (stateLogin) {
            dispatch({
                type: 'ADD_TO_CART',
                data: {
                    id_product: props.id_product,
                    amount: amount,
                },
            });
        } else {
            navigate('/login');
        }
    };

    const getInf = () => {
        dispatch({
            type: 'GET_INFO',
            data: {
                title: props.title,
                id_product: props.id_product,
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

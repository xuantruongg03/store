import { faCartShopping, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import formatsMoney from 'src/Convert/ConvertMoneyVND';
import slug from '../../Convert/ConvertStringVNtoTitle';
import './CompProductItem.css';

function CompProductItem(props) {
    let sale = Number((100 - (props.price / props.cost) * 100).toFixed(0));
    const [amount, setAmount] = useState(1);
    const [isSales, setIsSales] = useState(true);
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
    });
    const dispatch = useDispatch();
    const handleBuy = () => {
        dispatch({
            type: 'POST_CART',
            data: {
                src: props.item,
                title: props.title,
                infomation: '1 TB',
                price: props.price,
                amount: amount,
            },
        });
    };
    const getInf = () => {
        dispatch({
            type: 'GET_INFO',
            data: {
                title: props.title,
                subkey: props.subkey
            },
        });
        localStorage.setItem('store-title', props.title);
        localStorage.setItem('store-subkey', props.subkey);
    };
    return (
        <div className="styles">
            <div className={isSales === true ? 'sale' : 'disabled'}>
                <span style={{ fontSize: '12px' }}>OFF</span>
                <span>{sale + '%'}</span>
            </div>

            <img src={props.item} alt="Image" className="image" />
            <br />
            <Link to={"/" + slug(props.title)} className="title" onClick={getInf}>
                {props.title}
            </Link>
            <div className="boxPrice">
                <h3 className="price">{formatsMoney(props.price)}</h3>
                <h4 className={isSales === true ? 'cost' : 'disabled'}>{formatsMoney(props.cost)}</h4>
            </div>

            <div className="add">
                <FontAwesomeIcon className="btn-icon" icon={faMinus} onClick={minusAmount} />

                <input className="input" value={amount} onChange={handleInput} disabled />

                <FontAwesomeIcon className="btn-icon" icon={faPlus} onClick={addAmount} />

                <FontAwesomeIcon className="cartShopping" icon={faCartShopping} onClick={handleBuy} />
            </div>
        </div>
    );
}

export default CompProductItem;

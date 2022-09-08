import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './CompProductItem.css';
import { Link } from 'react-router-dom';
import slug from '../../Convert/ConvertStringVNtoTitle';
import formatsMoney from 'src/Convert/ConvertMoneyVND';

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

    const getInf = () => {
        props.setTitle(props.title);
        props.setImg(props.item);
        props.setPrice(props.price);
        props.setCost(props.cost);
        props.setDes(props.des);
        props.setInf(props.inf);
    };

    useEffect(() => {
        if (sale <= 0) {
            setIsSales(false);
        }
    });
    const handleBuy = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                src: props.item,
                title: props.title,
                infomation: '1 TB',
                price: props.price,
                amount: amount,
            }),
        };
        fetch('http://localhost:3000/cart', requestOptions).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                alert('Đặt hàng thành công! Hãy kiểm tra giỏ hàng của bạn.');
            } else if (response.status === 500) {
                alert('Lỗi phía Client! Thử lại sau.');
            }
        });
    };

    return (
        <div className="styles">
            <div className={isSales === true ? 'sale' : 'disabled'}>
                <span style={{ fontSize: '12px' }}>OFF</span>
                <span>{sale + '%'}</span>
            </div>

            <img src={props.item} alt="Image" className="image" />
            <br />
            <Link to={slug(props.title)} className="title" onClick={getInf}>
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

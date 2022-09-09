import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import formatsMoney from 'src/Convert/ConvertMoneyVND';
import slug from 'src/Convert/ConvertStringVNtoTitle';

import style from './Cart.module.scss';
const selected = [];
function CompCart(props) {
    const [totalPrice, setTotalPrice] = useState(props.data.price);
    useEffect(() => {
        setTotalPrice(props.data.price * props.data.amount);
    });
    const handleAdd = () => {
        props.setAmount((props.data.amount += 1));
    };
    const handleMin = () => {
        props.setAmount((props.data.amount -= 1));
        if (props.data.amount <= 0) {
            alert('số lượng mua tối thiểu là 1 sản phẩm');
            props.setAmount(1);
        }
    };

    const handleSelection = (e) => {
        var check = document.querySelector('.checkbox');
        if (check.checked) {
            selected.push(e.target.value);
            props.setSelect(selected);
        }
        else {
            props.setSelect(selected.filter((select) => {
                return select !== e.target.value
            }));
        }
    };
    return (
        <tbody className={'cart-' + props.data.id}>
            <tr>
                <th style={{ maxWidth: '50px' }}>
                    <img className={style.imgProduct} src={props.data.src} alt="sản phẩm" />
                </th>
                <th className={style.titleProduct}>
                    <Link className={style.titleProduct} to={slug(props.data.title)}>
                        {props.data.title}
                    </Link>
                </th>
                <th className={style.infoProduct}>{props.data.infomation}</th>
                <th className={style.priceProduct}>{formatsMoney(props.data.price)}</th>
                <th>
                    <form className={style.numberProductForm}>
                        <button type="button" className={style.btn} onClick={handleMin}>
                            -
                        </button>
                        <input className={style.numberProduct} value={props.data.amount} disabled></input>
                        <button type="button" className={style.btn} onClick={handleAdd}>
                            +
                        </button>
                    </form>
                </th>
                <th className={style.totalPrice}>{formatsMoney(totalPrice)}</th>
                <th>
                    <input
                        type="checkbox"
                        className={clsx(style.btnSelect, "checkbox")}
                        value={props.data.id}
                        onClick={handleSelection}
                    />
                </th>
            </tr>
        </tbody>
    );
}

export default CompCart;

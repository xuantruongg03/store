import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import formatsMoney from 'src/Convert/ConvertMoneyVND';
import slug from 'src/Convert/ConvertStringVNtoTitle';
import style from './Cart.module.scss';
const selected = [];

function CompCart(props) {
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(props.data.product_price);
    const [quantity, setQuatity] = useState(props.data.quantity);
    let selectedTitlePay = [];
    let selectedPricePay = [];
    let selectedQuatity = [];

    useEffect(() => {
        setTotalPrice(props.data.product_price * props.data.quantity);
        console.log(props.data.product_price * props.data.quantity);
    }, [props.data.quantity, props.data.product_price]);

    const handleAdd = () => {
        setQuatity((props.data.quantity += 1));
    };

    const handleMin = () => {
        setQuatity((props.data.quantity -= 1));
        if (props.data.quantity <= 0) {
            alert('số lượng mua tối thiểu là 1 sản phẩm');
            setQuatity(1);
        }
    };

    const handleSelection = (e) => {
        selectedTitlePay = [...props.value.selectTitlePay];
        selectedPricePay = [...props.value.selectPricePay];
        selectedQuatity = [...props.value.selectQuatity];
        let value = e.target.value;
        if (e.target.checked) {
            selected.push(e.target.value);
            props.func.setSelect(selected);
            selectedPricePay.push(props.data.product_price);
            selectedTitlePay.push(props.data.product_name);
            selectedQuatity.push(quantity);
        } else {
            for (let i = 0; i < selected.length; i++) {
                if (selected[i] === value) {
                    selected.splice(i, 1);
                    selectedTitlePay.splice(i, 1);
                    selectedPricePay.splice(i, 1);
                    selectedQuatity.splice(i, 1);
                }
            }
            props.func.setSelect(selected);
        }
        props.func.setSelectTitlePay([...selectedTitlePay]);
        props.func.setSelectPricePay([...selectedPricePay]);
        props.func.setSelectQuatity([...selectedQuatity]);
        // console.log(selectedQuatity);
    };

    const getInf = () => {
        dispatch({
            type: 'GET_INFO',
            data: {
                title: props.data.product_name,
                product_id: props.data.product_id,
            },
        });
    };

    return (
        <tbody className={clsx('cart-' + props.data.product_id, style.box)}>
            <tr>
                <th className={style.titleProduct}>
                    <Link
                        className={style.titleProduct}
                        to={`/products/${slug(props.data.product_name)}`}
                        onClick={getInf}
                    >
                        {props.data.product_name}
                    </Link>
                </th>
                <th className={style.infoProduct}>1TB</th>
                <th className={style.priceProduct}>{formatsMoney(props.data.product_price)}</th>
                <th>
                    <form className={style.numberProductForm}>
                        <button type="button" className={style.btn} onClick={handleMin}>
                            -
                        </button>
                        <input className={style.numberProduct} value={quantity} disabled></input>
                        <button type="button" className={style.btn} onClick={handleAdd}>
                            +
                        </button>
                    </form>
                </th>
                <th className={style.totalPrice}>{formatsMoney(totalPrice)}</th>
                <th>
                    <input
                        type="checkbox"
                        className={clsx(style.btnSelect, 'checkbox')}
                        value={props.data.product_id}
                        onClick={handleSelection}
                    />
                </th>
            </tr>
        </tbody>
    );
}

export default CompCart;

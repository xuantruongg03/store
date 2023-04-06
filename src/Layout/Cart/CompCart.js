import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import slug from '../../Convert/ConvertStringVNtoTitle'
import formatsMoney from "../../Convert/ConvertMoneyVND";
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
        <tbody className={clsx('cart-' + props.data.product_id, "align-middle")}>
            <tr>
                <th className="max-w-xs min-w-full text-center no-underline hover:tex-red-500  w-96">
                    <Link
                        className="max-w-xs min-w-full text-center no-underline hover:tex-red-500"
                        to={`/products/${slug(props.data.product_name)}`}
                        onClick={getInf}
                    >
                        {props.data.product_name}
                    </Link>
                </th>
                <th className="text-center">{props.info || ""}</th>
                <th>{formatsMoney(props.data.product_price)}</th>
                <th>
                    <form >
                        <button type="button" className="py-7 px-5 mx-1 text-lg border-none bg-transparent" onClick={handleMin}>
                            -
                        </button>
                        <input className="h-8 w-8 text-base text-center" value={quantity} disabled></input>
                        <button type="button" className="py-7 px-5 mx-1 text-lg border-none bg-transparent" onClick={handleAdd}>
                            +
                        </button>
                    </form>
                </th>
                <th>{formatsMoney(totalPrice)}</th>
                <th>
                    <input
                        type="checkbox"
                        className={clsx('checkbox')}
                        value={props.data.product_id}
                        onClick={handleSelection}
                    />
                </th>
            </tr>
        </tbody>
    );
}

export default CompCart;

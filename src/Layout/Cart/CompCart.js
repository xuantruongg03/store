import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import formatsMoney from 'src/Convert/ConvertMoneyVND';
import slug from 'src/Convert/ConvertStringVNtoTitle';
import style from './Cart.module.scss';
const selected = [];

function CompCart(props) {
    const [totalPrice, setTotalPrice] = useState(props.data.giaban);
    const [quatity, setQuatity] = useState(props.data.soluong);
    let selectedTitlePay = [];
    let selectedPricePay = [];
    let selectedQuatity = [];

    useEffect(() => {
        setTotalPrice(props.data.giaban * props.data.soluong);
    }, [props.data.soluong, props.data.giaban]);

    const handleAdd = () => {
        setQuatity((props.data.soluong += 1));
    };
    const handleMin = () => {
        setQuatity((props.data.soluong -= 1));
        if (props.data.soluong <= 0) {
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
            selectedPricePay.push(props.data.giaban);
            selectedTitlePay.push(props.data.tensanpham);
            selectedQuatity.push(quatity);
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
        console.log(selected);
    };
    
    return (
        <tbody className={clsx('cart-' + props.data.id_sanpham, style.box)}>
            <tr>
                <th style={{ maxWidth: '50px' }}>
                    <img className={style.imgProduct} src={props.data.hinhanh} alt="sản phẩm" />
                </th>
                <th className={style.titleProduct}>
                    <Link className={style.titleProduct} to={`/products/${slug(props.data.tensanpham)}`}>
                        {props.data.tensanpham}
                    </Link>
                </th>
                <th className={style.infoProduct}>1TB</th>
                <th className={style.priceProduct}>{formatsMoney(props.data.giaban)}</th>
                <th>
                    <form className={style.numberProductForm}>
                        <button type="button" className={style.btn} onClick={handleMin}>
                            -
                        </button>
                        <input className={style.numberProduct} value={quatity} disabled></input>
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
                        value={props.data.id_sanpham}
                        onClick={handleSelection}
                    />
                </th>
            </tr>
        </tbody>
    );
}

export default CompCart;

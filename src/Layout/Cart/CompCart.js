import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import style from "../../Components/Sass/Cart.module.scss";
import formatsMoney from "../../Convert/ConvertMoneyVND";
import slug from '../../Convert/ConvertStringVNtoTitle';

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
            <tr className={style.box}>
                <th className="max-w-xs min-w-full text-center no-underline hover:tex-red-500 w-96">
                    <Link
                        className="max-w-xs min-w-full text-center no-underline hover:tex-red-500"
                        to={`/products/${slug(props.data.product_name)}`}
                        onClick={getInf}
                    >
                        {props.data.product_name}
                    </Link>
                </th>
                <th className="text-center">{props.info || ""}</th>
                <th >{formatsMoney(props.data.product_price)}</th>
                <th>
                    <form >
                        <button type="button" className={clsx("py-7 px-5 mx-1 text-lg border-none bg-transparent", style.btn)} onClick={handleMin}>
                            -
                        </button>
                        <input className={clsx("h-8 w-8 text-base text-center")} value={quantity} disabled></input>
                        <button type="button" className={clsx("py-7 px-5 mx-1 text-lg border-none bg-transparent", style.btn)} onClick={handleAdd}>
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
            <div className={clsx('my-3', style.box_2)}>
                <div className='flex justify-between items-center'>
                    <img src={props.data.product_images[0].file_path} alt="Hình ảnh sản phẩm" className={style.img}/>
                    <div className='pl-5'>
                        <Link
                            className="text-center text-xs no-underline hover:tex-red-500"
                            to={`/product/${slug(props.data.product_name)}?search=${props.data.product_id}`}
                            onClick={getInf}
                        >
                            {props.data.product_name}
                        </Link>
                        <form >
                            <button type="button" className={clsx("py-7 px-5 mx-1 text-lg border-none bg-transparent", style.btn)} onClick={handleMin}>
                                -
                            </button>
                            <input className={clsx("h-8 w-8 text-base text-center")} value={quantity} disabled></input>
                            <button type="button" className={clsx("py-7 px-5 mx-1 text-lg border-none bg-transparent", style.btn)} onClick={handleAdd}>
                                +
                            </button>
                        </form>
                    </div>
                    <div className='flex flex-col items-end pl-2'>
                        <p className='font-semibold text-red-500'>{formatsMoney(totalPrice)}</p>
                        <input
                        type="checkbox"
                        className={clsx('checkbox')}
                        value={props.data.product_id}
                        onClick={handleSelection}
                    />
                    </div>
                </div>
            </div>
        </tbody>
    );
}

export default CompCart;

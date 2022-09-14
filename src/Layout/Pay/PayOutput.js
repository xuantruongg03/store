import 'bootstrap/dist/css/bootstrap.min.css';
import clsx from 'clsx';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import formatsMoney from 'src/Convert/ConvertMoneyVND';
import style from './Pay.module.scss';

function PayOutput(props) {
    const totalPrice = props.data.totalPrice - props.data.sale - props.data.freeship;
    const handleSelectpayment = (e) => {
        props.setPayment(e.target.value);
    };
    const dispatch = useDispatch();
    const propsData = {
        name: props.data.name,
        phone: props.data.phone,
        address: props.data.address,
        conscious: props.data.conscious,
        district: props.data.district,
        city: props.data.city,
        notes: props.data.notes,
        payment: props.data.payment,
        titleProduct: props.data.title,
        price: totalPrice,
    };
    const handleBuy = () => {
        dispatch({
            type: 'BUY',
            data: propsData,
        });
    };
    return (
        <Form className={clsx(style.output)}>
            <Form.Label className={clsx(style.label, 'mt-2', style.title)}>Thông Tin Đơn Hàng</Form.Label>
            <Row>
                <Form.Group className={style.flex}>
                    <Form.Label className={style.label} style={{ textTransform: 'uppercase', fontWeight: '700' }}>
                        Sản Phẩm
                    </Form.Label>
                    <Form.Label className={style.label} style={{ textTransform: 'uppercase', fontWeight: '700' }}>
                        Tạm Tính
                    </Form.Label>
                </Form.Group>
                <div className={style.bri} />
            </Row>

            <Row>
                <Form.Group className={style.flex}>
                    <div>
                        {props.data.title.map((title, index) => (
                            <li key={index} style={{ padding: '0', display: 'block' }}>
                                <Form.Label className={style.label}>{title}</Form.Label>
                            </li>
                        ))}
                    </div>
                    <Form.Label className={clsx(style.label, style.provisional)}>
                        {formatsMoney(props.data.totalPrice)}
                    </Form.Label>
                </Form.Group>
                <div className={style.bri} />
            </Row>

            <Row>
                <Form.Group className={style.flex}>
                    <Form.Label className={style.label}>Mã giảm giá</Form.Label>
                    <Form.Label className={clsx(style.label, style.provisional)}>
                        {`-` + formatsMoney(props.data.sale)}
                    </Form.Label>
                </Form.Group>
                <div className={style.bri} />
            </Row>
            <Row>
                <Form.Group className={style.flex}>
                    <Form.Label className={style.label}>Phí vận chuyển</Form.Label>
                    <Form.Label className={clsx(style.label, style.provisional)}>
                        {formatsMoney(props.data.freeship)}
                    </Form.Label>
                </Form.Group>
                <div className={style.bri} />
            </Row>
            <Row>
                <Form.Group className={style.flex}>
                    <Form.Label className={style.label}>Tổng tiền</Form.Label>
                    <Form.Label className={clsx(style.label, style.provisional)}>{formatsMoney(totalPrice)}</Form.Label>
                </Form.Group>
                <div className={style.bri} />
            </Row>
            <Row>
                <Form.Group>
                    <Form.Label className={style.label} style={{ minWidth: '400px' }}>
                        Chọn hình thức thanh toán
                    </Form.Label>
                </Form.Group>
                <div className={style.bri} />
            </Row>

            <Row key="radio">
                <Form.Group>
                    <Form.Check
                        onClick={handleSelectpayment}
                        value="cash"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        label="Thanh toán bằng khi nhận hàng (COD)"
                    />
                    <br />
                    <Form.Check
                        onClick={handleSelectpayment}
                        value="banking"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        label="Thanh toán bằng Internet Banking"
                    />
                </Form.Group>
            </Row>
            <Button variant="primary" type="submit" className={style.button}>
                <Link to={'/paycomplete'} className={style.link} onClick={handleBuy}>
                    Xác Nhận Thanh Toán
                </Link>
            </Button>
        </Form>
    );
}

export default PayOutput;

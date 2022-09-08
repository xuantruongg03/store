import { useEffect } from 'react';
import style from './Pay.module.scss';
import PayInput from './PayInput';
import PayOutput from './PayOutput';

const data = {
    title: "Ghế gaming",
    price: 3109000,
    sale: 0,
    freeship: 0
}

function Pay() {
    useEffect(() => {
        document.title = "Thanh Toán"
    }, [])
    return (
        <div className={style.container}>
            <PayInput />

            <PayOutput
                data={data}
            />
            <br />
        </div>
    );
}

export default Pay;

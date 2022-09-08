import CompListMenu from '../../components/CompListMenu/CompListMenu';
import CompBanner from './CompBanner/CompBanner';
import CompTitle from '../../components/CompProducts/CompTitle';
import ProductsHome from './ProductsHome';
import { useEffect } from 'react';

function Home(props) {
    useEffect(() => {
        document.title = "Computer Store"
    })
    return (
        <div>
            <div className="container">
                <CompListMenu setItem={props.setItem} />
                <CompBanner />
            </div>
            <br />
            <CompTitle title="Sản phẩm khuyến mãi" />
            <ProductsHome
                listProducts={props.sale}
                addQuantity={props.setQuantity}
                setTitle={props.setTitle}
                setImg={props.setImg}
                setPrice={props.setPrice}
                setCost={props.setCost}
                setDes = {props.setDes}
                setInf={props.setInf}
            />

            <CompTitle title="Máy tính xách tay" />
            <ProductsHome
                listProducts={props.computer}
                addQuantity={props.setQuantity}
                setTitle={props.setTitle}
                setImg={props.setImg}
                setPrice={props.setPrice}
                setCost={props.setCost}
                setDes = {props.setDes}
                setInf={props.setInf}
            />

            <CompTitle title="Phụ kiện máy tính" />
            <ProductsHome
                listProducts={props.computer}
                addQuantity={props.setQuantity}
                setTitle={props.setTitle}
                setImg={props.setImg}
                setPrice={props.setPrice}
                setCost={props.setCost}
                setDes = {props.setDes}
                setInf={props.setInf}
            />
        </div>
    );
}

export default Home;

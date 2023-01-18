import CompListMenu from '../../components/CompListMenu/CompListMenu';
import CompBanner from './CompBanner/CompBanner';
import CompTitle from '../../components/CompProducts/CompTitle';
import ProductsHome from './ProductsHome';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Home(props) {
    const [sale, setSale] = useState([]);
    const [computer, setComputer] = useState([]);
    useEffect(() => {
        document.title = 'Computer Store';
        //call api

        axios.get('http://localhost:8000/api/v1/get-product')
            .then(res => {  
                setComputer(res.data.data)
            })
    }, []);
    return (
        <div>
            <div className="container">
                <CompListMenu setItem={props.setItem} />
                <CompBanner />
            </div>
            <br />
            {/* <CompTitle title="Sản phẩm khuyến mãi" />
            <ProductsHome listProducts={sale} subkey="sale" /> */}

            <CompTitle title="Máy tính xách tay" />
            <ProductsHome listProducts={computer} subkey="computer" />

            <CompTitle title="Phụ kiện máy tính" />
            <ProductsHome listProducts={computer} subkey="computer" />
        </div>
    );
}

export default Home;

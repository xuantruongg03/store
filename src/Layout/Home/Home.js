import axios from 'axios';
import { useEffect, useState } from 'react';
import CompListMenu from '../../components/CompListMenu/CompListMenu';
import CompTitle from '../../components/CompProducts/CompTitle';
import CompBanner from './CompBanner/CompBanner';
import ProductsHome from './ProductsHome';

function Home(props) {
    // const [sale, setSale] = useState([]);
    const [computer, setComputer] = useState([]);
    useEffect(() => {
        document.title = 'Computer Store';
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
            <ProductsHome listProducts={computer} subkey="sale" /> */}

            <CompTitle title="Máy tính xách tay" />
            <ProductsHome listProducts={computer} subkey="computer" />

            <CompTitle title="Phụ kiện máy tính" />
            <ProductsHome listProducts={computer} subkey="computer" />
        </div>
    );
}

export default Home;

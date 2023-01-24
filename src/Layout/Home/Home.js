import axios from 'axios';
import { useEffect, useState } from 'react';
import CompListMenu from '../../components/CompListMenu/CompListMenu';
import CompTitle from '../../components/CompProducts/CompTitle';
import CompBanner from './CompBanner/CompBanner';
import ProductsHome from './ProductsHome';

function Home (props) {
    const [computer, setComputer] = useState([]);
    const [banner, setBanner] = useState([])
    useEffect(() => {
        document.title = 'Computer Store';
        axios.get('http://localhost:8000/api/v1/get-product').then((res) => {
            setComputer(res.data.data);
        });

        axios.get(`http://localhost:8000/api/v1/get-banners`).then((res) => {
            const banners = res.data.data.banner;
            setBanner(banners);
        });
    }, []);
    return (
        <div>
            <div style={{ margin: '0 130px', display: 'flex' }}>
                <CompListMenu setItem={props.setItem} />
                <CompBanner data={banner}/>
            </div>
            <br />
            {/* <CompTitle title="Sản phẩm khuyến mãi" />
            <ProductsHome listProducts={computer} subkey="sale" /> */}

            <CompTitle title="Máy tính xách tay" subkey="computer"/>
            <ProductsHome listProducts={computer} subkey="computer" />

            <CompTitle title="Phụ kiện máy tính" subkey="computer"/>
            <ProductsHome listProducts={computer} subkey="computer" />
        </div>
    );
}

export default Home;

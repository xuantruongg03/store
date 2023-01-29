import { useEffect, useState } from 'react';
import { getAllProducts } from 'src/api/products';
import CompListMenu from '../../components/CompListMenu/CompListMenu';
import CompTitle from '../../components/CompProducts/CompTitle';
import CompBanner from './CompBanner/CompBanner';
import ProductsHome from './ProductsHome';

function Home(props) {
    const [computer, setComputer] = useState([]);

    useEffect(() => {
        document.title = 'Computer Store';
        const getProducts = async () => {
            const response = await getAllProducts();
            setComputer(response.data);
        };
        getProducts();
    }, []);
    
    return (
        <div>
            <div style={{ margin: '0 130px', display: 'flex' }}>
                <CompListMenu setItem={props.setItem} />
                <CompBanner />
            </div>
            <br />
            {/* <CompTitle title="Sản phẩm khuyến mãi" />
            <ProductsHome listProducts={computer} subkey="sale" /> */}

            <CompTitle title="Máy tính xách tay" subkey="computer" />
            <ProductsHome listProducts={computer} subkey="computer" />

            <CompTitle title="Phụ kiện máy tính" subkey="computer" />
            <ProductsHome listProducts={computer} subkey="computer" />
        </div>
    );
}

export default Home;

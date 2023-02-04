import { useEffect, useState } from 'react';
import { getAllProducts } from 'src/api/products';
import CompListMenu from '../../components/CompListMenu/CompListMenu';
import CompTitle from '../../components/CompProducts/CompTitle';
import CompBanner from './CompBanner/CompBanner';
import ProductsHome from './ProductsHome';

function Home(props) {
    const [computer, setComputer] = useState([]);
    const [accessory, setAccessory] = useState([]);
    const [sale, setSale] = useState([]);
    useEffect(() => {
        document.title = 'Computer Store';
        const getProducts = async () => {
            const response = await getAllProducts();
            let computerData = response.data.filter(
                (element) =>
                    element.product_type.toLowerCase() === 'Máy tính xách tay'.toLowerCase() ||
                    element.product_type.toLowerCase() === 'laptop',
            );
            setComputer(computerData);
            let accessoryData = response.data.filter(
                (element) =>
                    element.product_type.toLowerCase() === 'Phụ kiện máy tính'.toLowerCase() ||
                    element.product_type.toLowerCase() === 'accessory',
            );
            setAccessory(accessoryData);
            let saleData = response.data.filter((element) => element.product_sale_price > 0);
            setSale(saleData);
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
            
            <CompTitle title="Sản phẩm khuyến mãi" subkey="sale" />
            <ProductsHome listProducts={sale} subkey="sale" />

            <CompTitle title="Máy tính xách tay" subkey="computer" />
            <ProductsHome listProducts={computer} subkey="computer" />

            <CompTitle title="Phụ kiện máy tính" subkey="computer" />
            <ProductsHome listProducts={accessory} subkey="accessory" />
        </div>
    );
}

export default Home;

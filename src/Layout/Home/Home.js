import { useEffect, useState } from 'react';
import { getAllProducts } from 'src/api/products';
import CompBanner from '../../components/CompBanner/CompBanner';
import CompListMenu from '../../components/CompListMenu/CompListMenu';
import CompTitle from '../../components/CompProducts/CompTitle';
import ProductsHome from '../../components/ProductsHome/ProductsHome';
import style from './Home.module.scss';

function Home(props) {
    const [computer, setComputer] = useState([]);
    const [accessories, setAccessories] = useState([]);
    const [sale, setSale] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            const response = await getAllProducts();
            let computerData = response.data.filter((element) => element.product_type.toLowerCase() === 'laptop');
            setComputer(computerData);
            let accessoriesData = response.data.filter((element) => element.product_type.toLowerCase() === 'accessory');
            setAccessories(accessoriesData);
            let saleData = response.data.filter((element) => element.product_sale_price > 0);
            setSale(saleData);
        };
        getProducts();
    }, []);

    return (
        <div>
            <div className={style.container}>
                <CompListMenu setItem={props.setItem} />
                <CompBanner />
            </div>
            <br />

            <CompTitle title="Sản phẩm khuyến mãi" subkey="sale" />
            <ProductsHome listProducts={sale} subkey="sale" />

            <CompTitle title="Máy tính xách tay" subkey="laptop" />
            <ProductsHome listProducts={computer} subkey="laptop" />

            <CompTitle title="Phụ kiện máy tính" subkey="accessories" />
            <ProductsHome listProducts={accessories} subkey="accessories" />
        </div>
    );
}

export default Home;

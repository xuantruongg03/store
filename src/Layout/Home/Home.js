import CompListMenu from '../../components/CompListMenu/CompListMenu';
import CompBanner from './CompBanner/CompBanner';
import CompTitle from '../../components/CompProducts/CompTitle';
import ProductsHome from './ProductsHome';
import { useEffect, useState } from 'react';

function Home(props) {
    const [sale, setSale] = useState([]);
    const [computer, setComputer] = useState([]);
    useEffect(() => {
        document.title = 'Computer Store';
        fetch('http://localhost:3000/sale')
            .then((response) => response.json())
            .then((data) => {
                setSale(data);
            })
            .catch((error) => {
                console.error(error);
            });

        fetch('http://localhost:3000/computer')
            .then((response) => response.json())
            .then((data) => {
                setComputer(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <div>
            <div className="container">
                <CompListMenu setItem={props.setItem} />
                <CompBanner />
            </div>
            <br />
            <CompTitle title="Sản phẩm khuyến mãi" />
            <ProductsHome listProducts={sale} subkey="sale"/>

            <CompTitle title="Máy tính xách tay" />
            <ProductsHome listProducts={computer} subkey="computer" />

            <CompTitle title="Phụ kiện máy tính" />
            <ProductsHome listProducts={computer} subkey="computer" />
        </div>
    );
}

export default Home;

import { useEffect, useState } from 'react';
import CompProductItem from 'src/components/CompProducts/CompProductItem';
import {sales, computers} from "src/data"

const styles = {
    borderTop: '1px solid gray',
    margin: '0 142px 0 130px',
    position: 'relative',
};

const subTitle = {
    margin: '0 142px 0 130px',
    textTransform: 'uppercase',
    color: 'red',
};

function Products(props) {
    const [sale, setSale] = useState([]);
    useEffect(() => {
        document.title = props.subTitle;
        window.scrollTo(0, 0);
        setSale(sales);
    }, []);
    return (
        <div>
            <h2 style={subTitle}>{props.subTitle}</h2>
            <div style={styles}>
                {sale.map((product, index) => (
                    <CompProductItem
                        subkey = {props.subkey}
                        key={product.id}
                        title={product.title}
                        img={product.img}
                        price={product.price}
                        cost={product.cost}
                        des={product.description}
                        inf={product.infomation}
                    />
                ))}
            </div>
        </div>
    );
}

export default Products;

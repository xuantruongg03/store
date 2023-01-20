import { useEffect, useState } from 'react';
import CompProductItem from 'src/components/CompProducts/CompProductItem';

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
        // fetch('http://localhost:8080/api/v1/get-product' + props.subkey)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setSale(data);
        //         console.log(data);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
        // userAction();
    }, []);
    return (
        <div>
            <h2 style={subTitle}>{props.subTitle}</h2>
            <div style={styles}>
                {sale.map((product, index) => (
                    <CompProductItem
                        subkey={props.subkey}
                        key={index}
                        title={product.tensanpham}
                        item={product.hinhanh}
                        price={product.giaban}
                        cost={product.giaban}
                        des={product.mota}
                        inf={product.mota}
                        id_product={product.id_sanpham}
                    />
                ))}
            </div>
        </div>
    );
}

export default Products;

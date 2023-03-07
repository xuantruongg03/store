import { useEffect, useState } from 'react';
import CompProductItem from 'src/components/CompProducts/CompProductItem';
import { getProductsByType } from 'src/api/products';

const styles = {
    borderTop: '1px solid gray',
    margin: '0 5% 2% 5%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',


};

const subTitle = {
    margin: '1% 5% 0 5%',
    textTransform: 'uppercase',
    color: 'red',
};

function Products(props) {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
        const getProducts = async () => {
            const { data } = await getProductsByType(props.subkey);
            setProduct(data);
        };
        getProducts();
    }, [props.subkey]);

    if (product.length <= 0) {
        return (
            <div>
                <h2 style={subTitle}>{props.subTitle}</h2>
                <div style={styles}>
                    <h3>Không có sản phẩm nào</h3>
                </div>
            </div>
        );
    }
    return (
        <div>
            <h2 style={subTitle}>{props.subTitle}</h2>
            <div style={styles}>
                {product.map((product, index) => (
                    <CompProductItem
                        subkey={props.subkey}
                        key={index}
                        title={product.product_name}
                        item={product.product_images[0].file_path}
                        price={product.product_price - (product.product_price * product.product_sale_price) / 100}
                        cost={product.product_price}
                        sale={product.product_sale_price}
                        product_id={product.product_id}
                    />
                ))}
            </div>
        </div>
    );
}

export default Products;

import { useEffect } from 'react';
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
    useEffect(() => {
        document.title = props.subTitle
        window.scrollTo(0, 0);
    })
    return (
        <div>
            <h2 style={subTitle}>{props.subTitle}</h2>
            <div style={styles}>
                {props.listProducts.map((product, index) => (
                    <CompProductItem
                        key={product.id}
                        title={product.title}
                        item={product.img}
                        price={product.price}
                        cost={product.cost}
                        des={product.description}
                        inf={product.infomation}
                        addQuantity={props.addQuantity}
                        setTitle={props.setTitle}
                        setImg={props.setImg}
                        setPrice={props.setPrice}
                        setCost={props.setCost}
                        setRate={props.setRate}
                        setDes={props.setDes}
                        setInf={props.setInf}
                    />
                ))}
            </div>
        </div>
    );
}

export default Products;

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
        fetch('http://localhost:3000/' + props.subkey)
            .then((response) => response.json())
            .then((data) => {
                setSale(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <div>
            <h2 style={subTitle}>{props.subTitle}</h2>
            <div style={styles}>
                {sale.map((product, index) => (
                    <CompProductItem
                        key={product.id}
                        title={product.title}
                        item={product.img}
                        price={product.price}
                        cost={product.cost}
                        des={product.description}
                        inf={product.infomation}
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

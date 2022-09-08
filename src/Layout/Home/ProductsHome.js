import { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CompProductItem from '../../components/CompProducts/CompProductItem';
import './slickBtn.css';
const styles = {
    borderTop: '1px solid gray',
    margin: '0 142px 0 130px',
    position: 'relative',
};

const property = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
};
function ProductsHome(props) {
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    
    return (
        <div style={styles} id="product">
            <Slider {...property}>
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
            </Slider>
        </div>
    );
}

export default ProductsHome;

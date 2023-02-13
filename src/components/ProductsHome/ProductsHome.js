import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import CompProductItem from '../CompProducts/CompProductItem';
import style from './ProductsHome.module.scss';

const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: 'block',
                background: 'blue',
                borderRadius: '50%',
                marginRight: '10px',
                width: '50px !important',
            }}
            onClick={onClick}
        />
    );
};

const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: 'block',
                background: 'blue',
                borderRadius: '50%',
                marginLeft: '10px',
                width: '50px !important',
            }}
            onClick={onClick}
        />
    );
};

function ProductsHome(props) {
    const [width, setWidth] = useState();
    const property = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };
    const handleWindowResize = () => {
        setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);

    return (
        <div className={style.container} id="product">
            {width > 1300 ? (
                <Slider {...property} className={style.slider}>
                    {props.listProducts.map((product, index) => (
                        <CompProductItem
                            product_id={product.product_id}
                            subkey={props.subkey}
                            key={index}
                            title={product.product_name}
                            item={product.product_images[0].file_path}
                            price={product.product_price - (product.product_sale_price * product.product_price) / 100}
                            cost={product.product_price}
                            sale={product.product_sale_price}
                        />
                    ))}
                </Slider>
            ) : (
                <div className={style.showProduct}>
                    {props.listProducts.map((product, index) => (
                        <CompProductItem
                            product_id={product.product_id}
                            subkey={props.subkey}
                            key={index}
                            title={product.product_name}
                            item={product.product_images[0].file_path}
                            price={product.product_price - (product.product_sale_price * product.product_price) / 100}
                            cost={product.product_price}
                            sale={product.product_sale_price}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductsHome;

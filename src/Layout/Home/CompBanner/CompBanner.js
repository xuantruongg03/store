import { useEffect, useState } from 'react';

function CompBanner(props) {
    const banners = props.data;

    const banner = [
        {
          id: 1,
          value: "https://traffic-edge06.cdn.vncdn.io/nvn/ncdn/store3/96878/bn/01_Marc6ef5979b85c2db3ba8c211780c60c9f.jpg",
        },
        {
            value: "https://traffic-edge29.cdn.vncdn.io/nvn/ncdn/store3/96878/bn/07_Mar960229b53f63d4d2d2ec1043c278cd1f.png",
            id: 2,
        },
      ];
    
    const [active, setActive] = useState(0);
    const [bannerActive, setBannerActive] = useState("");

    useEffect(() => {
        setTimeout(() => {
            if (active > 1) {
                setActive(0);
            } else {
                setActive(active + 1);
            }
            setBannerActive(banners[active] ? banners[active].hinhanh : banner[active].value)
        }, 5000);
    });

      const styleBanners = {
        borderRadius: "10px",
        borderTop: "none",
        marginLeft: "50px",
        width: "77%",
        backgroundImage: `url(${bannerActive})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        marginTop: "10px",
        backgroundPosition: "center",
      };

    return <div style={styleBanners}></div>;
}

export default CompBanner;

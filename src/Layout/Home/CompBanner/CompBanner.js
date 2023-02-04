import { useEffect, useMemo, useState } from 'react';
import bannerAPI from 'src/api/banners';

function CompBanner() {
    const [active, setActive] = useState(0);
    const [bannerActive, setBannerActive] = useState('');
    const [banners, setBanners] = useState();

    useMemo(() => {
        const getBanners = async () => {
            const response = await bannerAPI.getBanners();
            setBanners(response.data.banner);
        }
        getBanners();
    }, []);

    useEffect(() => {
        try {
            setTimeout(() => {
                if (active >= banners.length - 1) {
                    setActive(0);
                } else {
                    setActive(active + 1);
                }
                setBannerActive(banners[active].banner_image);
            }, 5000);
        } catch (error) {
            console.log(error);
        }
    });

    const styleBanners = {
        borderRadius: '10px',
        borderTop: 'none',
        marginLeft: '50px',
        width: '77%',
        backgroundImage: `url(${
            bannerActive ||
            `https://traffic-edge06.cdn.vncdn.io/nvn/ncdn/store3/96878/bn/01_Marc6ef5979b85c2db3ba8c211780c60c9f.jpg`
        })`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        marginTop: '10px',
        backgroundPosition: 'center',
    };

    return <div style={styleBanners}></div>;
}

export default CompBanner;

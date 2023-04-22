import { useEffect, useState } from "react";
import { getBannersAPI } from "../api/banners";
import style from "./Sass/Banner.module.scss";
import clsx from "clsx";

function Banner() {
  const initBanner = {
    banner_id: 1,
    banner_name: "Sắm Acer chất phất cả năm",
    banner_image:
      "https://res.cloudinary.com/dcweof28t/image/upload/…675406874/image_products/kwwkptowmyxz8lv4qtel.png",
  };
  const [banners, setBanners] = useState([initBanner]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBanners = async () => {
      const response = await getBannersAPI();
      setBanners(response.data.banner.filter((item) => item.banner_type === 'width'));
        if (response.message === "ok") {
            setLoading(false);
        }
    };
    getBanners();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBannerIndex((currentIndex) =>
        currentIndex === banners.length - 1 ? 0 : currentIndex + 1
      );
    }, 5000);
    return () => clearInterval(intervalId);
  }, [banners]);

  const currentBanner = banners[currentBannerIndex];

  if (loading) {
    return <div className='box-loader'><span className="loader"></span></div>;
}

  return (
    <div className="mt-2">
      <img
        src={currentBanner.banner_image}
        alt={currentBanner.banner_name}
        className={clsx("rounded-xl h-96 w-full", style.banner)}
      />
    </div>
  );
}

export default Banner;

import React, { useEffect, useState } from "react";
import Apis, { endpoints } from "../configs/Apis";
import { Carousel } from "react-bootstrap";

export default function CarouselMain() {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    const loadBanners = async () => {
      let res = await Apis.get(endpoints["banners"]);
      setBanners(res.data);
    };
    loadBanners();
  }, []);
  return (
      <Carousel className="mt-5 container h-full !px-0">
        {banners.map((banner, index) => (
          <Carousel.Item key={index}>
            <img className="w-full" src={banner.imageUrl} />
          </Carousel.Item>
        ))}
      </Carousel>
  );
}

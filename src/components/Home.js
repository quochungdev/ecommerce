import CarouselMain from "./CarouselMain";
import Category from "./Category";
import ProductHome from "./ProductHome";
import { Carousel } from "flowbite-react";
import Footer from "../pages/Footer";

const Home = () => {
  return (
    <>
      <div className="container-background h-full">
        <CarouselMain />
        <Category />
        <ProductHome />
        <div className="h-36"></div>
      </div>

    </>
  );
};

export default Home;

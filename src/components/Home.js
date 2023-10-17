import { ToastContainer } from "react-toastify";
import CarouselMain from "./CarouselMain";
import Category from "./Category";
import ProductHome from "./ProductHome";
import { Carousel } from "flowbite-react";

const Home = () => {
  return (
    <>
      <ToastContainer />
      <div className="container-background h-full">
        <CarouselMain />
        <Category />
        <ProductHome />
      </div>
    </>
  );
};

export default Home;

import CarouselMain from "./CarouselMain";
import Category from "./Category";
import ProductHome from "./ProductHome";
import { Carousel } from "flowbite-react";
import Footer from "../pages/Footer";
import { ToastContainer } from "react-toastify";

const Home = () => {
  return (
    <>
      <ToastContainer />
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

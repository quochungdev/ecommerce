import React, { useEffect, useState } from "react";
import Apis, { endpoints } from "../configs/Apis";
import { Link } from "react-router-dom";
import { Card, Carousel, CarouselItem, Col, Row } from "react-bootstrap";

export default function ProductHome() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const loadProducts = async () => {
      let res = await Apis.get(endpoints["products"]);
      console.log(res.data);
      setProducts(res.data);
    };
    loadProducts();
  }, []);

  // Chia danh sách thành các phần con chứa tối đa 12 mục
  const chunkedProducts = products.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 12);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // Bắt đầu một phần con mới nếu cần
    }

    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
  return (
    <div className="mt-5 container !w-auto h-full !px-0">
      <div className="bg-white text-orange-500 border w-full h-1/5 p-3">
        <h2>SẢN PHẨM BÁN CHẠY NHẤT</h2>
      </div>
      <div className="w-full h-full bg-white">
        <Carousel data-bs-theme="dark">
          {chunkedProducts.map((chunkProd, index) => (
            <CarouselItem key={index}>
              <ul className="w-full h-full px-0 flex flex-row flex-wrap">
                {chunkProd.map((product) => (
                  <Link
                    key={product.id}
                    onClick={() => window.scrollTo(0, 0)}
                    to={`/chi-tiet-san-pham/${product.id}`} // Sử dụng /san-pham/:id
                    className="w-2/12 !h-2/4 decoration-transparent mb-2 "
                  >
                    <Card className="items-center bg-white transition-all duration-200 hover:!bg-orange-500 ">
                      <Card.Img
                        className="!w-2/3"
                        variant="top"
                        src={product.thumbnail}
                      />
                      <Card.Title className="text-black mt-3 hover:!text-white w-full">
                        <div className="flex justify-around text-xs">
                          <div>{product.name}</div>
                          <div className="">Đã bán {product.sold}</div>
                        </div>
                        {/* {product.sold} */}
                      </Card.Title>
                    </Card>
                  </Link>
                ))}
              </ul>
            </CarouselItem>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
{
  /* <Carousel slide={false}>
          {chunkedProducts.map((chunkProd) => (
            <CarouselItem className="border shadow-md flex h-auto items-center justify-center ">
              <div className=" w-full h-full flex flex-wrap justify-between ">
                {chunkProd.map((product) => (
                  <div className="w-1/6 h-1/2 border shadow-md text-center transition-all duration-200 hover:!bg-gray-200 ">
                    <Link
                      key={product.id}
                      to={`/chi-tiet-san-pham/${product.id}`} // Sử dụng /san-pham/:id
                      className="!text-black decoration-transparent hover:!text-orange-400"
                    >
                      <img className="w-full h-4/5" src={product.thumbnail} />
                      <div className="w-full h-1/5 font-semibold px-2 pt-2">
                        {product.name}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </Carousel> */
}

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
  const products_noDelete = products.filter((p) => p.isDeleted === 0 && p.status === 1);
  
  // Chia danh sách thành các phần con chứa tối đa 12 mục
  const chunkedProducts = products_noDelete.reduce((resultArray, item, index) => {
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
                        className="p-3 h-52"
                        variant="top"
                        src={product.thumbnail}
                      />
                      <Card.Title className="text-black mt-3 hover:!text-white w-full">
                        <div className="flex justify-around text-xs">
                          {product.name && product.name.length >= 12
                            ? `${product.name.substring(0, 12)}...`
                            : `${product.name}`}
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

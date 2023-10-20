import React, { useEffect, useState } from "react";
import Apis, { endpoints } from "../configs/Apis";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Carousel } from "flowbite-react";

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

  // Chia danh sách thành các phần con chứa tối đa 5 mục
  const chunkedProducts = products.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 12);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // Bắt đầu một phần con mới nếu cần
    }

    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
  return (
    <div style={{ height: "480px" }} className="mt-5 container !w-2/3 h-full !px-0">
      <div className="bg-white text-orange-500 border w-full h-1/5 p-3">
        <h2>SẢN PHẨM BÁN CHẠY NHẤT</h2>
      </div>
      <div className="w-auto h-full bg-white">
        <Carousel slide={false}>
          {chunkedProducts.map((chunkProd) => (
            <div className="border shadow-md flex h-auto items-center justify-center ">
              <div className=" w-full h-full flex flex-wrap justify-between ">
                {chunkProd.map((product) => (
                  <div className="w-1/6 h-1/2 border shadow-md">
                    <Link
                      key={product.id}
                      to={`/chi-tiet-san-pham/${product.id}`} // Sử dụng /san-pham/:id
                      className="!text-black decoration-transparent"
                    >
                      <img className="w-full h-4/5" src={product.thumbnail} />
                      <div className="w-full h-1/5 font-semibold px-2 pt-2">
                        {product.name}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

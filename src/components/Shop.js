import React, { useEffect, useState } from "react";
import { Button, Card, Image } from "react-bootstrap";
import Apis, { endpoints } from "../configs/Apis";
import { Link, useParams } from "react-router-dom";

export default function Shop() {
  let { shopId } = useParams();
  const [products, setProducts] = useState([]);
  const loadShopProducts = async () => {
    try {
      let res = await Apis.get(endpoints["products"]);
      setProducts(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    loadShopProducts();
  }, []);
  const prodShop = products.filter((s) => s.shop.id == shopId);
  const shopOfProducts = prodShop?.find((s) => s.shop);
  const shopCustom = {
    name: "Shop name",
  };
  return (
    <div>
      <div className="m-2 shadow-md h-auto ">
        <div className="p-2 ">
          <h2 className="mx-5 p-3 bg-gray-100 font-semibold">
            Thông tin cửa hàng
          </h2>
        </div>
        <div className="container flex items-center bg-white pb-5">
          <div className="w-1/12">
            <Image
              className=""
              alt="Chưa có hình ảnh"
              roundedCircle
              src={shopOfProducts && shopOfProducts.shop.imageUrl}
            />
          </div>
          <div className="w-11/12 text-xl font-bold text-red-500">
            {shopOfProducts && shopOfProducts.shop.name}
            <div className="mt-2">
              <Button
                className="mr-2 border px-3 !font-semibold"
                variant="dark"
              >
                Chat ngay
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white mt-5 container">
          <ul className="w-auto h-auto !px-0 flex flex-row flex-wrap">
            {prodShop?.map((product) => (
              <Link
                to={`/chi-tiet-san-pham/${product.id}`} // Điều hướng đến trang chi tiết sản phẩm
                key={product.id}
                className="w-1/5 !h-1/4 p-2 decoration-transparent"
              >
                <Card className="items-start transition-all duration-200 hover:!bg-gray-300 hover:border hover:border-solid hover:!border-red-500 hover:shadow-lg">
                  <Card.Img
                    className="w-full3"
                    variant="top"
                    src={product.thumbnail}
                  />
                  <Card.Body className="">
                    <Card.Title>
                      {product.name && product.name.length >= 12
                        ? `${product.name.substring(0, 12)}...`
                        : `${product.name}`}
                    </Card.Title>
                    <Card.Text>{product.category.name}</Card.Text>
                    <Card.Text className="text-red-500 font-semibold">
                      ${product.price}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

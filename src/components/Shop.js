import React, { useEffect, useState } from "react";
import { Button, Card, Form, FormLabel, Image } from "react-bootstrap";
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
  const products_noDelete = products.filter((p) => p.isDeleted === 0);

  const prodShop = products_noDelete.filter((s) => s.shop.id == shopId);
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

        <div className="container  flex items-center bg-white pb-5">
          <div className="w-1/12 mt-3">
            <Image
              className=""
              alt="Chưa có hình ảnh"
              roundedCircle
              src={shopOfProducts && shopOfProducts.shop.imageUrl}
            />
          </div>
          <div className="w-11/12 mx-3 mt-3 text-xl font-bold text-red-500">
            <div className="">
              <div>{shopOfProducts && shopOfProducts.shop.name}</div>
              <div>
                <span className="!text-black">Tổng sản phẩm: </span>
                <span>{prodShop.length}</span>
              </div>
            </div>
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

        <div className="mt-5 mb-50 container !px-0 h-auto flex">
          <div className="bg-white w-1/6 h-auto p-3">
            <h4 className="my-3">Bộ lộc tìm kiếm</h4>
            <div>
              <Form>
                <FormLabel className="font-semibold text-gray-500">
                  Nơi bán
                </FormLabel>
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`} className="mb-3 py-2">
                    <Form.Check
                      type={type}
                      className="py-1"
                      id={`default-${type}`}
                      label="TPHCM"
                    />
                    <Form.Check
                      type={type}
                      className="py-1"
                      id={`default-${type}`}
                      label="Hà Nội"
                    />
                    <Form.Check
                      type={type}
                      className="py-1"
                      id={`default-${type}`}
                      label="Quận 1"
                    />
                    <Form.Check
                      type={type}
                      className="py-1"
                      id={`default-${type}`}
                      label="Quận 2"
                    />
                    <Form.Check
                      type={type}
                      className="py-1"
                      id={`default-${type}`}
                      label="Quận 3"
                    />
                    <Form.Check
                      type={type}
                      className="py-1"
                      id={`default-${type}`}
                      label="Quận 4"
                    />
                    <Form.Check
                      type={type}
                      className="py-1"
                      id={`default-${type}`}
                      label="Quận 5"
                    />
                    <Form.Check
                      type={type}
                      className="py-1"
                      id={`default-${type}`}
                      label="Quận 6"
                    />
                  </div>
                ))}
              </Form>
              <hr className="mx-2" />
            </div>

            <div>
              <Form>
                <FormLabel className="font-semibold text-gray-500">
                  Đơn vị vận chuyển
                </FormLabel>
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`} className="mb-3">
                    <Form.Check
                      type={type}
                      className="py-1"
                      id={`default-${type}`}
                      label="Hỏa tốc"
                    />
                    <Form.Check
                      type={type}
                      className="py-1"
                      id={`default-${type}`}
                      label="Nhanh"
                    />
                    <Form.Check
                      type={type}
                      className="py-1"
                      id={`default-${type}`}
                      label="Tiết Kiệm"
                    />
                  </div>
                ))}
              </Form>
              <hr className="mx-2" />
            </div>

            <div>
              <Form>
                <FormLabel className="font-semibold text-gray-500">
                  Thương Hiệu
                </FormLabel>
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`} className="mb-3">
                    <Form.Check
                      type={type}
                      className="py-1"
                      id={`default-${type}`}
                      label="Adidas"
                    />
                    <Form.Check
                      type={type}
                      className="py-1"
                      id={`default-${type}`}
                      label="Guci"
                    />
                    <Form.Check
                      type={type}
                      className="py-1"
                      id={`default-${type}`}
                      label="Padas"
                    />
                  </div>
                ))}
              </Form>
              <hr className="mx-2" />
            </div>
          </div>

          <ul className="bg-white mx-3 w-5/6 h-auto !px-0 flex flex-row flex-wrap">
            {prodShop?.map((product) => (
              <Link
                to={`/chi-tiet-san-pham/${product.id}`} // Điều hướng đến trang chi tiết sản phẩm
                key={product.id}
                className="w-1/5 !h-1/4 p-2 decoration-transparent"
              >
                <Card className="items-start transition-all duration-200 hover:!bg-gray-300 hover:border hover:border-solid hover:!border-red-500 hover:shadow-lg">
                  <Card.Img
                    className="!w-full h-52"
                    variant="top"
                    src={product.thumbnail}
                  />
                  <Card.Body className="h-36">
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

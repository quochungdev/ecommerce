import React, { useEffect, useState } from "react";
import { Card, Col, Form, FormLabel, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";

export default function Products() {
  let { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    try {
      let res = await Apis.get(endpoints.categories);
      setCategories(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  const loadProducts = async () => {
    try {
      let res = await Apis.get(endpoints.products);
      setProducts(res.data);
      console.log(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  const products_noDelete = products.filter(
    (p) => p.isDeleted === 0 && p.status === 1
  );

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const productsByCategory = products_noDelete.filter(
    (product) => product.category.category_id == id
  );

  const subCategory = categories.filter((cate) => cate.categoryId?.id == id);
  return (
    <div className="mt-5 container !px-0 h-auto flex ">
      {/* Danh mục và Bộ lọc tìm kiếm */}
      <div className="bg-white w-1/6 h-auto p-3">
        <div className="bg-white h-auto">
          <h4>Danh mục phụ</h4>
          <div className="w-full my-4">
            {subCategory.map((subCate) => (
              <Link className="w-full block decoration-transparent">
                {subCate.name}
              </Link>
            ))}
          </div>
        </div>
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
      {/* Danh sách sản phẩm theo category */}
      <div className="shadow-md w-5/6 h-auto ml-5">
        <ul className="w-full h-full !px-0 flex flex-row flex-wrap">
          {productsByCategory.map((product) => (
            <Link
              to={`/chi-tiet-san-pham/${product.id}`} // Điều hướng đến trang chi tiết sản phẩm
              key={product.id}
              className="w-1/5 !h-2/4 p-2 decoration-transparent"
            >
              <Card className="items-start">
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
  );
}

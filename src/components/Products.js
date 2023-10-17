import React, { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";

export default function Products() {
  let { id } = useParams();
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    try {
      let res = await Apis.get(endpoints.categories);
      setCategories(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  const loadProducts= async () => {
    try {
      let res = await Apis.get(endpoints.products);
      setProducts(res.data);
      console.log(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    loadProducts()
    loadCategories()
  },[])
  
  const productsByCategory = products.filter((product) => product.category.id == id);
  console.log(products.filter((product) => product.category.id == id));
  return (
    <div className="mt-5 container !px-0 h-auto flex ">
     {/* Danh mục và Bộ lọc tìm kiếm */}
      <div className="bg-white w-1/6 h-auto p-3">
        <div className="bg-white h-auto">
            <h3>Danh mục con</h3>
            <div className="w-full my-4">
                <Link className="w-full block decoration-transparent">Áo khoác</Link>
                <Link className="w-full block decoration-transparent">Áo khoác</Link>
                <Link className="w-full block decoration-transparent">Áo khoác</Link>
                <Link className="w-full block decoration-transparent">Áo khoác</Link>
            </div>
            
        </div>
         <h4 className="my-3">Bộ lộc tìm kiếm</h4>
         <div>
            <Form>
                {['checkbox'].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                    <Form.Check // prettier-ignore
                        type={type}
                        id={`default-${type}`}
                        label="Nhãn hàng 1"
                    />
                    <Form.Check // prettier-ignore
                        type={type}
                        id={`default-${type}`}
                        label="Nhãn hàng 1"
                    />
                    <Form.Check // prettier-ignore
                        type={type}
                        id={`default-${type}`}
                        label="Nhãn hàng 1"
                    />
                    </div>
                ))}
            </Form>
            <hr className="mx-2"/>
        </div>
        <div>
            <Form>
                {['checkbox'].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                    <Form.Check // prettier-ignore
                        type={type}
                        id={`default-${type}`}
                        label="Nhãn hàng 1"
                    />
                    <Form.Check // prettier-ignore
                        type={type}
                        id={`default-${type}`}
                        label="Nhãn hàng 1"
                    />
                    <Form.Check // prettier-ignore
                        type={type}
                        id={`default-${type}`}
                        label="Nhãn hàng 1"
                    />
                    </div>
                ))}
            </Form>
            <hr className="mx-2"/>
        </div>
    </div>
      {/* Danh sách sản phẩm theo category */}
      <div className=" shadow-md w-5/6 h-auto ml-5">
        <ul className="w-full h-full !px-0 flex flex-row flex-wrap">
        {productsByCategory.map((product) => (
            <Link
              to={`/chi-tiet-san-pham/${product.id}`} // Điều hướng đến trang chi tiết sản phẩm
              key={product.id}
              className="w-1/5 !h-2/4 p-2 decoration-transparent"
            >
              <Card className="items-start">
                <Card.Img
                  className="w-full3"
                  variant="top"
                  src={product.thumbnail}
                />
                <Card.Body className="">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.category.name}</Card.Text>
                  <Card.Text>{product.price}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

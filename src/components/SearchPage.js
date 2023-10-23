import React, { useState } from "react";
import { Button, Card, Form, Image } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import PaginationItems from "./PaginationItems";

export default function SearchPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchData = location.state?.searchData;
  const keyword = searchParams.get("keyword");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const startIndex = (currentPage - 1) * itemsPerPage; // Chỉ mục bắt đầu
  const endIndex = startIndex + itemsPerPage; // Chỉ mục kết thúc
  const paginationItem = searchData.products?.slice(startIndex, endIndex);
  console.log(searchData);
  return (
    <div className="">
      {searchData === "" ? (
        <div className="text-center">
          <h2>Không tìm thấy sản phẩm</h2>
        </div>
      ) : (
        <>
          <div className="container mt-3">
            <h2>Kết quả tìm kiếm cho "{keyword}"</h2>
          </div>

          <div className="mt-5 mb-50 container !px-0 h-auto flex ">
            {/* Danh mục và Bộ lọc tìm kiếm */}
            <div className="bg-white w-1/6 h-auto p-3">
              <div className="bg-white h-auto">
                <h3>Danh mục con</h3>
                <div className="w-full my-4">
                  <Link className="w-full block decoration-transparent">
                    Áo khoác
                  </Link>
                  <Link className="w-full block decoration-transparent">
                    Áo khoác
                  </Link>
                  <Link className="w-full block decoration-transparent">
                    Áo khoác
                  </Link>
                  <Link className="w-full block decoration-transparent">
                    Áo khoác
                  </Link>
                </div>
              </div>
              <h4 className="my-3">Bộ lộc tìm kiếm</h4>
              <div>
                <Form>
                  {["checkbox"].map((type) => (
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
                <hr className="mx-2" />
              </div>
              <div>
                <Form>
                  {["checkbox"].map((type) => (
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
                <hr className="mx-2" />
              </div>
            </div>
            {/* Danh sách sản phẩm theo product */}
            <div className=" shadow-md w-5/6 h-auto ml-5">
              {/* Cửa hàng theo product */}
              <div className="m-2 bg-white shadow-md h-auto ">
                <div className="p-2 ">
                  <h2 className="m-3 p-3 bg-gray-100 font-semibold">
                    Thông tin cửa hàng
                  </h2>
                </div>
                <div className="flex items-center pb-5">
                  <div className="w-1/12">
                    <Image
                      className=""
                      src={searchData.shop && searchData.shop.imageUrl}
                      alt="Chưa có hình ảnh"
                      roundedCircle
                    />
                  </div>
                  <div className="w-11/12 text-xl font-bold text-red-500">
                    {searchData.shop && searchData.shop.name}
                    <div className="mt-2">
                      <Button
                        className="mr-2 border px-3 !font-semibold"
                        variant="dark"
                      >
                        Chat ngay
                      </Button>
                      <Button
                        className="border px-3 !font-semibold"
                        variant="light"
                      >
                        <Link
                          to={`/shop/${searchData.shop.id}`}
                          className="decoration-transparent !text-black"
                        >
                          Xem shop
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="w-auto h-auto !px-0 flex flex-row flex-wrap">
                {paginationItem?.map((product) => (
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
              <div className="flex justify-center ">
                <PaginationItems
                  array={searchData.products}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

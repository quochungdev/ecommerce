import React, { createContext, useEffect, useReducer, useState } from "react";
import { Button, Pagination, Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "../../../assets/CSS/Table.css";
import searchIcon from "../../../assets/image/search.png";
import Apis, { authApi, endpoints } from "../../../configs/Apis";
import { ToastContainer } from "react-toastify";
import ModalChangeStatusProd from "./ModalChangeStatusProd";
import PaginationItems from "../../PaginationItems";
import { Link, useNavigate } from "react-router-dom";

// export const CategoryReducers = createContext();

export default function ManageProduct({ searchKeyword, handleSearch }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage; // Chỉ mục bắt đầu
  const endIndex = startIndex + itemsPerPage; // Chỉ mục kết thúc
  const [showMore, setShowMore] = useState({});

  const [status, setStatus] = useState(0);
  const [products, setProducts] = useState([]);
  const loadProducts = async () => {
    try {
      let res = await authApi().get(endpoints.products_admin(status));
      console.log(res.data);
      setProducts(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    loadProducts();
  }, [status]);

  const toggleShowMore = (prodId) => {
    setShowMore((prev) => ({
      ...prev,
      [prodId]: !prev[prodId],
    }));
  };

  const paginationItem = products.slice(startIndex, endIndex);
  const filteredItems = paginationItem.filter((item) =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );
  return (
    <>
      <ToastContainer />
      <div className=" h-full !mx-0">
        <div className="flex justify-between">
          <h2 className="">Sản phẩm</h2>
        </div>
        <div className="p-2 mt-2 shadow-md rounded-md">
          <div className="relative m-1 w-2/4 ">
            <Form>
              <Form.Control
                type="text"
                value={searchKeyword}
                onChange={handleSearch}
                placeholder="Tìm kiếm sản phẩm..."
                className=" mr-sm-2 "
              />
              <button className="absolute right-0 top-1" type="submit">
                <img src={searchIcon} />
              </button>
            </Form>
          </div>
        </div>
        <div className=" bg-white shadow-md h-auto mt-5 ">
          <div className="border flex items-center p-2">
            <Button
              variant="light"
              className={`w-2/12 mx-3  p-3 border shadow-md !font-semibold ${
                status === 0 ? "!bg-yellow-500 !text-white" : ""
              }`}
              onClick={() => setStatus(0)}
            >
              Chưa duyệt
            </Button>
            <Button
              variant="light"
              className={`w-2/12 mx-3  p-3 border shadow-md !font-semibold  ${
                status === 1 ? "!bg-green-500 !text-white" : ""
              }`}
              onClick={() => setStatus(1)}
            >
              Đã duyệt
            </Button>
            <Button
              variant="light"
              className={`w-2/12 mx-3  p-3 border shadow-md !font-semibold  ${
                status === 2 ? "!bg-red-500 !text-white" : ""
              }`}
              onClick={() => setStatus(2)}
            >
              Vi phạm
            </Button>
          </div>
        </div>
        <div className=" mt-3">
          <Table className="table-custom shadow-md" striped hover size="sm">
            <thead className="">
              <tr className=" items-center ">
                <th className="!p-3">ID</th>
                <th className="!p-3">TÊN SẢN PHẨM</th>
                <th className="!p-3">MÔ TẢ</th>
                <th className="!p-3">GIÁ CẢ</th>
                <th className="!p-3">SỐ LƯỢNG</th>
                <th className="!p-3">TÊN SHOP</th>
                <th className="!p-3">TRẠNG THÁI</th>
                <th className="!p-3">CHỨC NĂNG</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((prod) => (
                <tr key={prod.id}>
                  <td className="py-2 !pl-4">{prod.id}</td>
                  <td className="py-2 !pl-4">
                    {prod.name && prod.name.length >= 12
                      ? `${prod.name.substring(0, 12)}...`
                      : `${prod.name}`}
                  </td>
                  <td>
                    {showMore[prod.id] ? (
                      <div
                        className="rendered-content"
                        dangerouslySetInnerHTML={{ __html: prod.description }}
                      />
                    ) : (
                      <div
                        className="rendered-content"
                        dangerouslySetInnerHTML={{
                          __html: prod.description.substring(0, 18),
                        }}
                      />
                    )}
                    {prod.description.length > 18 && (
                      <a
                        className="decoration-emerald-500"
                        onClick={() => toggleShowMore(prod.id)}
                      >
                        {showMore[prod.id] ? "Thu gọn" : "Xem thêm"}
                      </a>
                    )}
                  </td>
                  <td className="py-2 !pl-4">{prod.price}</td>
                  <td className="py-2 !pl-4">{prod.qty}</td>
                  <td className="py-2 !pl-4">{prod.shop.name}</td>
                  <td className="py-2 !pl-4">
                    <div
                      className={`${
                        prod.status === 0
                          ? `text-white text-center font-semibold rounded p-2 bg-yellow-500  w-3/4 `
                          : prod.status === 1
                          ? `text-white text-center font-semibold rounded p-2 bg-green-500  w-3/4`
                          : `text-white text-center font-semibold rounded p-2 bg-red-500 w-3/4 whitespace-nowrap`
                      }`}
                    >
                      {prod.status === 0
                        ? "Chờ duyệt"
                        : prod.status === 1
                        ? "Đã duyệt"
                        : "Vi phạm"}
                    </div>
                  </td>
                  <td className="py-2 !pl-4">
                    <Button
                      className="w-32 h-12 ml-5 mr-5"
                      variant="dark"
                      onClick={() =>
                        prod.status === 1
                          ? navigate(`/chi-tiet-san-pham/${prod.id}`)
                          : ""
                      }
                    >
                      <div className="flex items-center">
                        <span className="pl-2 w-full font-semibold">Xem</span>
                      </div>
                    </Button>
                    <ModalChangeStatusProd
                      productId={prod.id}
                      loadProducts={loadProducts}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="flex justify-center bg-white shadow-md border rounded-lg">
          <PaginationItems
            array={products}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}

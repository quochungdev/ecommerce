import React, { useContext, useEffect, useState } from "react";
import Apis, { authApi, endpoints } from "../../../configs/Apis";
import searchIcon from "../../../assets/image/search.png";
import { ProductContext } from "./ProductContext";
import { ToastContainer } from "react-toastify";
import { Button, Form, Table } from "react-bootstrap";
import UpdateProductComp from "./UpdateProductComp";
import PaginationItems from "../../PaginationItems";
import DeleteProductComp from "./DeleteProductComp";

export default function ProductByShop({ searchKeyword, handleSearch }) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState(0);
  const [showMore, setShowMore] = useState({});

  const loadProducts = async () => {
    try {
      let res = await authApi().get(endpoints.products_shop(status));
      setProducts(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  const products_noDelete = products.filter((p) => p.isDeleted === 0);

  useEffect(() => {
    loadProducts();
  }, [status]);

  const toggleShowMore = (prodId) => {
    setShowMore((prev) => ({
      ...prev,
      [prodId]: !prev[prodId],
    }));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage; // Chỉ mục bắt đầu
  const endIndex = startIndex + itemsPerPage; // Chỉ mục kết thúc
  const paginationItem = products_noDelete.slice(startIndex, endIndex);
  const filteredItems = paginationItem.filter((item) =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <ProductContext.Provider value={[products, setProducts]}>
      <div className="bg-white shadow-md h-auto m-10">
        <ToastContainer />
        <div className="h-full">
          <div className="flex justify-between">
            <h2 className="!m-5">Quản lý sản phẩm</h2>
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
                className={`w-2/12 mx-3 p-3 border shadow-md !font-semibold ${
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
                className={`w-2/12 mx-3 p-3 border shadow-md !font-semibold  ${
                  status === 2 ? "!bg-red-500 !text-white" : ""
                }`}
                onClick={() => setStatus(2)}
              >
                Vi phạm
              </Button>
            </div>
          </div>

          <div className=" mt-5">
            <Table className="table-custom shadow-md" striped hover size="sm">
              <thead className="">
                <tr className="items-center ">
                  <th className="!p-3">ID</th>
                  <th className="!p-3">TÊN SẢN PHẨM</th>
                  <th className="!p-3">GIÁ CẢ</th>
                  <th className="!p-3">SỐ LƯỢNG</th>
                  <th className="!p-3">Danh mục</th>
                  <th className="!p-3">HÌNH ẢNH</th>
                  <th className="!p-3">TRẠNG THÁI</th>
                  <th className="!p-3">CHỨC NĂNG</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((prod) => (
                  <tr key={prod.id}>
                    <td className="py-2 !pl-4">{prod.id}</td>
                    <td className="py-2 !pl-4">
                      {showMore[prod.id]
                        ? `${prod.name}`
                        : `${prod.name.substring(0, 18)}...`}
                      {prod.name?.length > 18 && (
                        <a
                          className="decoration-emerald-500 pl-5"
                          onClick={() => toggleShowMore(prod.id)}
                        >
                          {showMore[prod.id] ? "Thu gọn" : "Xem thêm"}
                        </a>
                      )}
                    </td>
                    <td className="py-2 !pl-4">${prod.price}</td>
                    <td className="py-2 !pl-4">{prod.qty}</td>
                    <td className="py-2 !pl-4">{prod.category.name}</td>
                    <td className="py-2 !pl-4">
                      <img
                        className=" w-12 zoomable-image"
                        src={prod.thumbnail}
                      />
                    </td>
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
                      <UpdateProductComp
                        productId={prod.id}
                        prod={prod}
                        loadProducts={loadProducts}
                      />

                      <DeleteProductComp
                        productId={prod.id}
                        loadProducts={loadProducts}
                        setProducts={setProducts}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <PaginationItems
                array={products}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </Table>
          </div>
        </div>
      </div>
    </ProductContext.Provider>
  );
}

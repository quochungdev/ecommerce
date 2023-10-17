import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import searchIcon from "../../../assets/image/search.png";
import { authApi, endpoints } from "../../../configs/Apis";
import { UserShopContext } from "../../../layouts/MainLayout";
import ModalChangeStatus from "./ModalChangeStatus";
import PaginationShop from "../../dashboard/Shop/PaginationShop";
import PaginationOrders from "./PaginationOrders";

export default function ManageOrder({ searchKeyword, handleSearch }) {
  const [shop] = useContext(UserShopContext);
  const [status, setStatus] = useState(0);
  const [orders, setOrders] = useState([]);
  const loadOrders = async () => {
    try {
      let res = await authApi().get(endpoints.order_shop(status));
      setOrders(res.data);
      console.log(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage; // Chỉ mục bắt đầu
  const endIndex = startIndex + itemsPerPage; // Chỉ mục kết thúc
  const paginationItem = orders.slice(startIndex, endIndex);

  useEffect(() => {
    loadOrders();
  }, [status]);
  return (
    <>
      <div className=" bg-white shadow-md h-auto m-10 ">
        <ToastContainer />
        <div className="border flex justify-between items-center">
          <div className="text-center text-xl font-semibold p-4">Tất cả</div>
        </div>
      </div>

      <div className="bg-white shadow-md h-auto m-10 p-2">
        <div className="relative m-1 w-2/4 ">
          <Form>
            <Form.Control
              type="text"
              value={searchKeyword}
              onChange={handleSearch}
              placeholder="Search Shop..."
              className=" mr-sm-2 "
            />
            <button className="absolute right-0 top-1" type="submit">
              <img src={searchIcon} />
            </button>
          </Form>
        </div>
      </div>

      <div className=" bg-white shadow-md h-auto m-10 p-2 ">
        <div className="border flex items-center p-2">
          <Button
            variant="light"
            className={`w-2/12 mx-3 text-black p-3 border shadow-md !font-semibold  ${
              status === 0 ? "!bg-red-500" : ""
            }`}
            onClick={() => setStatus(0)}
          >
            Chưa giao
          </Button>
          <Button
            variant="light"
            className={`w-2/12 mx-3 text-black p-3 border shadow-md !font-semibold ${
              status === 1 ? "!bg-yellow-500" : ""
            }`}
            onClick={() => setStatus(1)}
          >
            Đang giao
          </Button>
          <Button
            variant="light"
            className={`w-2/12 mx-3 text-black p-3 border shadow-md !font-semibold  ${
              status === 2 ? "!bg-green-500" : ""
            }`}
            onClick={() => setStatus(2)}
          >
            Hoàn thành
          </Button>
        </div>
      </div>

      <div className="bg-white mt-5 shadow-md h-auto m-10 p-2">
        <Table className="table-custom shadow-md" striped hover size="sm">
          <thead className="">
            <tr className=" items-center ">
              <th className="!p-3">ID</th>
              <th className="!p-3">TÊN SẢN PHẨM</th>
              <th className="!p-3">SỐ LƯỢNG</th>
              <th className="!p-3">TỔNG TIỀN</th>
              <th className="!p-3">NGÀY ĐẶT</th>
              <th className="!p-3">KHÁCH HÀNG</th>
              <th className="!p-3">TRẠNG THÁI</th>
              <th className="!p-3">CHỨC NĂNG</th>
            </tr>
          </thead>
          <tbody>
            {paginationItem.map((order) => (
              <tr key={order.id}>
                <td className="py-2 !pl-4">{order.id}</td>
                <td className="py-2 !pl-4">{order.product.name}</td>
                <td className="py-2 !pl-4">{order.qty}</td>
                <td className="py-2 !pl-4">{order.order.total_amount}</td>
                <td className="py-2 !pl-4">{order.createTime}</td>
                <td className="py-2 !pl-4">{order.user.fullName}</td>
                <td className="py-2 !pl-4 ">
                  <div
                    className={`${
                      order.status === 0
                        ? `text-white text-center font-semibold rounded p-2 bg-red-500 w-3/4 `
                        : order.status === 1
                        ? `text-white text-center font-semibold rounded p-2 bg-yellow-500 w-3/4`
                        : `text-white text-center font-semibold rounded p-2 bg-green-500 w-3/4 whitespace-nowrap`
                    }`}
                  >
                    {order.status === 0
                      ? "Chưa giao"
                      : order.status === 1
                      ? "Đang giao"
                      : "Hoàn thành"}
                  </div>
                </td>
                {/* <td className="py-2 !pl-4">
                  <img className=" w-12 zoomable-image" src={order.imageUrl} />
                </td> */}
                <td className="py-2 !pl-4 flex">
                  <ModalChangeStatus
                    orderId={order.id}
                    loadOrders={loadOrders}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <PaginationOrders
            orders={orders}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Table>
      </div>
    </>
  );
}

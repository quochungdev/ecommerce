import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Apis, { authApi, endpoints } from "../../configs/Apis";
import shopIcon from "../../assets/image/shop.png";
import searchIcon from "../../assets/image/search.png";
import { Button, Form } from "react-bootstrap";
import { toastError } from "../Toast";
import { Link, useParams } from "react-router-dom";
export default function MyPurchase() {
  let { id } = useParams();
  const [keyword, setKeyword] = useState("");
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState(0);
  const search = async (e) => {
    e.preventDefault(); //
    try {
      if (keyword.trim() === "") {
        loadOrders();
      } else {
        let res = await Apis.get(endpoints.search_product(keyword));
        const productIds = res.data.products.map((product) => product.id);
        const filteredOrders = orders.filter((order) =>
          productIds.includes(order.product.id)
        );
        setOrders(filteredOrders);
      }
    } catch (error) {
      console.log(error);
      toastError("Không tìm thấy sản phẩm nào");
    }
  };

  const loadOrders = async () => {
    try {
      let res = await authApi().get(endpoints.user_purchase(status));
      setOrders(res.data);
      console.log(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    loadOrders();
  }, [status]);

  return (
    <>
      <ToastContainer />
      <div className=" bg-white shadow-md h-auto m-10 ">
        <div className="border flex justify-between items-center">
          <div className="text-center text-2xl font-semibold p-4">
            Đơn hàng của tôi
          </div>
        </div>
      </div>

      <div className=" bg-white border shadow-md h-auto m-10 p-2 ">
        <div className=" flex items-center p-2">
          <Button
            variant="light"
            className={`w-2/12 mx-3 p-3 border shadow-md !font-semibold  ${
              status === 0 ? "!bg-red-500 text-white" : ""
            }`}
            onClick={() => setStatus(0)}
          >
            Chưa giao
          </Button>
          <Button
            variant="light"
            className={`w-2/12 mx-3 p-3 border shadow-md !font-semibold ${
              status === 1 ? "!bg-yellow-500 text-white " : ""
            }`}
            onClick={() => setStatus(1)}
          >
            Đang giao
          </Button>
          <Button
            variant="light"
            className={`w-2/12 mx-3 p-3 border shadow-md !font-semibold  ${
              status === 2 ? "!bg-green-500 text-white" : ""
            }`}
            onClick={() => setStatus(2)}
          >
            Hoàn thành
          </Button>
        </div>
      </div>

      <div className=" bg-white shadow-md h-auto m-10 ">
        <div className="p-2 mt-2 shadow-md rounded-md border flex justify-between items-center">
          <div className="relative m-1 w-2/4 ">
            <Form>
              <Form.Control
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className=" mr-sm-2 "
              />
              <button
                onClick={search}
                className="absolute right-0 top-1"
                type="submit"
              >
                <img src={searchIcon} />
              </button>
            </Form>
          </div>
        </div>
      </div>
      {orders.map((order) => (
        <div key={order.id} className=" bg-white shadow-md h-auto m-10 ">
          <div className="border p-3">
            <div className="flex justify-between font-semibold text-xl items-center">
              <div className="flex items-center">
                <div className="">Trạng thái:</div>
                <div
                  className={`${
                    order.status === 0
                      ? `text-white text-center font-semibold rounded p-2 bg-red-500 mx-2 `
                      : order.status === 1
                      ? `text-white text-center font-semibold rounded p-2 bg-yellow-500 mx-2`
                      : `text-white text-xlz text-center font-semibold rounded p-2 bg-green-500 mx-2`
                  }`}
                >
                  {order.status === 0
                    ? "Chưa giao"
                    : order.status === 1
                    ? "Đang giao"
                    : "Hoàn thành"}
                </div>
              </div>
              <div className="flex">
                <div>
                  <img src={shopIcon} />
                </div>
                <div className="px-2">{order.shop.name}</div>
              </div>
            </div>
          </div>
          <div>
            <Link
              className="decoration-transparent"
              to={`/chi-tiet-san-pham/${order.product.id}`}
            >
              <div className="border flex justify-between items-center transition-all duration-200 hover:shadow-2xl">
                <div className="w-3/4 text-xl p-4  flex">
                  <img className="w-28" src={order.product.thumbnail} />
                  <div className="w-full flex flex-col mx-2">
                    <div className="font-semibold text-gray-500 hover:text-orange-500">
                      {order.product.name}
                    </div>
                    <div className="hover:!text-red-500">
                      <Link className="decoration-transparent text-gray-500 " to={`/san-pham/${order.product.category.id}`}>Danh mục: {order.product.category.name}</Link>
                    </div>
                    <div className="flex">
                      <div className="font-semibold text-gray-500">
                        Số lượng:
                      </div>
                      <div className="font-semibold px-2 text-red-500">
                        {order.qty}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/4 text-red-500 text-right text-2xl font-semibold p-4">
                  ${order.product.price}
                </div>
              </div>
            </Link>
            <div className="border p-4">
              <div className="flex font-semibold text-xl items-center">
                <div className="">Thành tiền:</div>
                <div className="text-red-500 px-2 text-3xl">
                  ${order.qty * order.product.price}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

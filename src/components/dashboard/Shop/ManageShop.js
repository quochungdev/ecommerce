import React, { createContext, useEffect, useReducer, useState } from "react";
import { Button, Pagination, Table, ToastContainer } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "../../../assets/CSS/Table.css";
import searchIcon from "../../../assets/image/search.png";
import { ShopContext } from "./ShopContext";
import Apis, { endpoints } from "../../../configs/Apis";
import ModalDeleteShop from "./ModalDeleteShop";
import ModalActiveShop from "./ModalActiveShop";
import PaginationItems from "../../PaginationItems";

export default function ManageShop({ searchKeyword, handleSearch }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage; // Chỉ mục bắt đầu
  const endIndex = startIndex + itemsPerPage; // Chỉ mục kết thúc

  const [shops, setShops] = useState([]);
  const loadShops = async () => {
    try {
      let res = await Apis.get(endpoints["shops"]);
      setShops(res.data);
      console.log(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  const [showMore, setShowMore] = useState({});
  const toggleShowMore = (prodId) => {
    setShowMore((prev) => ({
      ...prev,
      [prodId]: !prev[prodId],
    }));
  };

  useEffect(() => {
    loadShops();
  }, []);

  const paginationItem = shops.slice(startIndex, endIndex);
  const filteredItems = paginationItem.filter((item) =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <ShopContext.Provider value={[shops, setShops]}>
      <ToastContainer />
      <div className=" h-full !mx-0">
        <div className=" flex justify-between">
          <h2>Cửa hàng </h2>
        </div>
        <div className="p-2 mt-2 shadow-md rounded-md">
          <div className="relative m-1 w-2/4 ">
            <Form>
              <Form.Control
                type="text"
                value={searchKeyword}
                onChange={handleSearch}
                placeholder="Tìm kiếm cửa hàng..."
                className=" mr-sm-2 "
              />
              <button className="absolute right-0 top-1" type="submit">
                <img src={searchIcon} />
              </button>
            </Form>
          </div>
        </div>
        <div className=" mt-5">
          <Table className="table-custom shadow-md" striped hover size="sm">
            <thead className="">
              <tr className=" items-center ">
                <th className="!p-3">ID</th>
                <th className="!p-3">TÊN SHOP</th>
                <th className="!p-3">ĐỊA CHỈ</th>
                <th className="!p-3">ẢNH ĐẠI DIỆN</th>
                <th className="!p-3">TRẠNG THÁI</th>
                <th className="!p-3">CHỦ SỞ HỮU</th>
                <th className="!p-3">CHỨC NĂNG</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((shop) => (
                <tr key={shop.id}>
                  <td className="py-2 !pl-4">{shop.id}</td>
                  <td className="py-2 !pl-4">{shop.name}</td>
                  <td className="py-2 !pl-4">{shop.address}</td>
                  <td className="py-2 !pl-4">
                    <img className=" w-12 zoomable-image" src={shop.imageUrl} />
                  </td>
                  <td className="py-2 !pl-4">
                    {shop.status == 0 ? "Chưa kích hoạt" : "Đã kích hoạt"}
                  </td>
                  <td className="py-2 !pl-4">
                    {shop.userDTO && shop.userDTO.fullName
                      ? shop.userDTO.fullName
                      : ""}
                  </td>
                  <td className="py-3 !pl-4 flex h-full w-full">
                    <ModalActiveShop shopId={shop.id} loadShops={loadShops} />
                    <ModalDeleteShop shopId={shop.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="flex justify-center bg-white shadow-md border rounded-lg">
            <PaginationItems
              array={shops}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </ShopContext.Provider>
  );
}

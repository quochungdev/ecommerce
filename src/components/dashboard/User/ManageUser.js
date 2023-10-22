import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { authApi, endpoints } from "../../../configs/Apis";
import searchIcon from "../../../assets/image/search.png";
import "../../../assets/CSS/Table.css";
import PaginationItems from "../../PaginationItems";

export default function ManageUser({ searchKeyword, handleSearch }) {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage; // Chỉ mục bắt đầu
  const endIndex = startIndex + itemsPerPage; // Chỉ mục kết thúc
  const loadUsers = async () => {
    try {
      let res = await authApi().get(endpoints.user);
      setUsers(res.data);
      console.log(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    loadUsers();
  }, []);
  const paginationItem = users.slice(startIndex, endIndex);
  const filteredItems = paginationItem.filter((item) =>
    item.username.toLowerCase().includes(searchKeyword.toLowerCase())
  );
  return (
    <>
      <ToastContainer />
      <div className=" h-full !mx-0">
        <div className="flex justify-between">
          <h2 className="">Người dùng</h2>
        </div>
        <div className="p-2 mt-2 shadow-md rounded-md">
          <div className="relative m-1 w-2/4 ">
            <Form>
              <Form.Control
                type="text"
                value={searchKeyword}
                onChange={handleSearch}
                placeholder="Tìm kiếm người dùng..."
                className=" mr-sm-2 "
              />
              <button className="absolute right-0 top-1" type="submit">
                <img src={searchIcon} />
              </button>
            </Form>
          </div>
        </div>
        <div className=" mt-3">
          <Table className="table-custom shadow-md" striped hover size="sm">
            <thead className="">
              <tr className=" items-center ">
                <th className="!p-3">ID</th>
                <th className="!p-3">TÀI KHOẢN</th>
                <th className="!p-3">EMAIL</th>
                <th className="!p-3">SỐ ĐIỆN THOẠI</th>
                <th className="!p-3">HỌ TÊN</th>
                <th className="!p-3">TRẠNG THÁI</th>
                <th className="!p-3">CHỨC NĂNG</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((u) => (
                <tr key={u.id}>
                  <td className="py-2 !pl-4">{u.id}</td>
                  <td className="py-2 !pl-4">{u.username}</td>
                  <td className="py-2 !pl-4">{u.email}</td>
                  <td className="py-2 !pl-4">{u.phone}</td>
                  <td className="py-2 !pl-4">{u.fullName}</td>
                  <td className="py-2 !pl-4">
                    {/* <div
                      className={`${
                        u.status === 0
                          ? `text-white text-center font-semibold rounded p-2 bg-yellow-500  w-3/4 `
                          : u.status === 1
                          ? `text-white text-center font-semibold rounded p-2 bg-green-500  w-3/4`
                          : `text-white text-center font-semibold rounded p-2 bg-red-500 w-3/4 whitespace-nowrap`
                      }`}
                    >
                      {u.status === 0
                        ? "Chờ duyệt"
                        : u.status === 1
                        ? "Đã duyệt"
                        : "Vi phạm"}
                    </div> */}
                  </td>
                  <td className="py-2 !pl-4"></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="flex justify-center bg-white shadow-md border rounded-lg">
          <PaginationItems
            array={users}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}

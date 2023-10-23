import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { authApi, endpoints } from "../../../configs/Apis";
import searchIcon from "../../../assets/image/search.png";
import "../../../assets/CSS/Table.css";
import PaginationItems from "../../PaginationItems";
import ModalCreatePayment from "./ModalCreatePayment";
import ModalUpdatePayment from "./ModalUpdatePayment";
import ModalDeletePayment from "./ModalDeletePayment";

export default function ManagePayment({ searchKeyword, handleSearch }) {
  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage; // Chỉ mục bắt đầu
  const endIndex = startIndex + itemsPerPage; // Chỉ mục kết thúc
  const loadPayments = async () => {
    try {
      let res = await authApi().get(endpoints.payments);
      setPayments(res.data);
      console.log(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    loadPayments();
  }, []);
  const paginationItem = payments.slice(startIndex, endIndex);
  const filteredItems = paginationItem.filter((item) =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );
  return (
    <>
      <ToastContainer />
      <div className=" h-full !mx-0">
        <div className="flex justify-between">
          <h2 className="">Phương thức thanh toán</h2>
          <ModalCreatePayment loadPayments={loadPayments} />
        </div>
       
        <div className=" mt-3">
          <Table className="table-custom shadow-md" striped hover size="sm">
            <thead className="">
              <tr className=" items-center ">
                <th className="!p-3">ID</th>
                <th className="!p-3">PHƯƠNG THỨC THANH TOÁN</th>
                <th className="!p-3">CHỨC NĂNG</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((u) => (
                <tr key={u.id}>
                  <td className="py-2 !pl-4">{u.id}</td>
                  <td className="py-2 !pl-4">{u.name}</td>
                  <td className="py-2 !pl-4">
                    <ModalUpdatePayment
                      paymentId={u.id}
                      loadPayments={loadPayments}
                      payment={u}
                    />
                    <ModalDeletePayment
                      paymentId={u.id}
                      loadPayments={loadPayments}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="flex justify-center bg-white shadow-md border rounded-lg">
          <PaginationItems
            array={payments}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import ModalCreateAddress from "./ModalCreateAddress";
import { authApi, endpoints } from "../../configs/Apis";
import ModalUpdateAddress from "./ModalUpdateAddress";

export default function ManageAddress() {
  const [address, setAddress] = useState([]);
  const loadAddress = async () => {
    try {
      let res = await authApi().get(endpoints["user_address"]);
      setAddress(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    loadAddress();
  });
  return (
    <div className=" bg-white shadow-md h-auto m-10 ">
      <ToastContainer />
      <div className="border flex justify-between items-center">
        <div className="text-center text-xl font-semibold p-4">
          Địa chỉ của tôi
        </div>
        <ModalCreateAddress />
      </div>
      <div className="border ">
        <div className="text-xl font-semibold p-4 pb-1">Địa chỉ</div>
        {address.map((a) => (
          <div key={a.id} className="border-b flex justify-between items-center">
            <div className="flex flex-col p-4">
              <div className=" text-gray-500">{a.address}</div>
              <div className=" text-gray-500 ">{`${a.ward}, ${a.city}`}</div>
            </div>
            <ModalUpdateAddress addressId={a.id} a={a} />
          </div>
        ))}
      </div>
    </div>
  );
}

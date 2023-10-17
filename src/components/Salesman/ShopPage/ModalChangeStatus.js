import React, { useContext, useReducer, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import Apis, { authApi, endpoints } from "../../../configs/Apis";
import updateIcon from "../../../assets/image/add.png";
import { toastError, toastSuccess } from "../../Toast";
import { ToastContainer } from "react-toastify";
export default function ModalChangeStatus({ orderId, loadOrders }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [status, setStatus] = useState(null);
  const handleChange = async (orderId) => {
    const formData = new FormData();
    formData.append("status", status);
    try {
      console.log(orderId);
      let res = await authApi().post(
        endpoints.change_status_order(orderId),
        formData
      );
      loadOrders();
      toastSuccess("Chuyển đổi trạng thái thành công");
      handleClose();
    } catch (ex) {
      toastError("Chuyển đổi trạng thái thất bại");
      console.error(ex);
    }
  };
  return (
    <>
      <Button className="w-36 h-12 ml-5 mr-5" variant="dark" onClick={handleShow}>
        <div className="flex items-center">
          <img className="h-auto" src={updateIcon} />
          <span className="pl-2 w-2/3 font-semibold">Cập nhật</span>
        </div>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thay đổi trạng thái đơn hàng này ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc muốn thay đổi trạng thái đơn hàng không?
          <div className="">
            <Button
              onClick={() => setStatus(0)}
              value="1"
              className="m-2 !bg-red-500 !border-none"
              disabled={status === 0}
            >
              Chưa giao
            </Button>
            <Button
              onClick={() => {
                setStatus(1);
              }}
              variant="warning"
              className="m-2"
              disabled={status === 1}
            >
              Đang giao
            </Button>
            <Button
              onClick={() => setStatus(2)}
              variant="success"
              className="m-2"
              disabled={status === 2}
            >
              Đã giao
            </Button>
            <div className="flex p-1">
              <div>Trạng thái đã chọn: </div>
              <div className="px-2 text-red-500 font-semibold">
                {status === 0
                  ? "Chưa giao"
                  : status === 1
                  ? "Đang giao"
                  : status === 2
                  ? "Đã giao"
                  : "Chưa chọn"}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              handleChange(orderId);
            }}
          >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

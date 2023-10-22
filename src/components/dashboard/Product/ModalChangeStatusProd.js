import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import updateIcon from "../../../assets/image/refresh.png";
import { authApi, endpoints } from "../../../configs/Apis";
import { toastError, toastSuccess } from "../../Toast";
export default function ModalChangeStatusProd({ productId, loadProducts }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [status, setStatus] = useState(null);
  const handleChange = async () => {
    const formData = new FormData();
    formData.append("id", productId);
    formData.append("status", status);
    try {
      let res = await authApi().put(endpoints.change_status_product, formData);
      loadProducts();
      toastSuccess("Chuyển đổi trạng thái thành công");
      handleClose();
    } catch (ex) {
      toastError("Chuyển đổi trạng thái thất bại");
      console.error(ex);
    }
  };
  return (
    <>
      <Button
        className="w-36 h-12 ml-5 mr-5"
        variant="dark"
        onClick={handleShow}
      >
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
              variant="warning !font-semibold"
              className="m-2 "
              disabled={status === 0}
            >
              Chờ duyệt
            </Button>
            <Button
              onClick={() => {
                setStatus(1);
              }}
              variant="success"
              className="m-2 font-semibold"
              disabled={status === 1}
            >
              Duyệt
            </Button>
            <Button
              onClick={() => setStatus(2)}
              className="m-2 !bg-red-500 !border-none !font-semibold"
              disabled={status === 2}
            >
              Vi phạm
            </Button>
            <div className="flex p-1">
              <div>Trạng thái đã chọn: </div>
              <div 
              className="px-2 text-red-500 font-semibold">
                {status === 0
                  ? "Chờ duyệt"
                  : status === 1
                  ? "Đã duyệt"
                  : status === 2
                  ? "Vi phạm"
                  : "Chưa chọn"}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="dark" onClick={handleChange}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

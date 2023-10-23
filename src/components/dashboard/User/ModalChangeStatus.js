import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import updateIcon from "../../../assets/image/refresh.png";
import { toastError, toastSuccess } from "../../Toast";
import { authApi, endpoints } from "../../../configs/Apis";

export default function ModalChangeStatus({ userId, loadUsers }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [status, setStatus] = useState("");
  const handleChange = async () => {
    const formData = new FormData();
    formData.append("status", status);
    formData.append("user_id", userId);
    try {
      let res = await authApi().post(endpoints.user_change_status, formData);
      loadUsers();
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
          <Modal.Title>Thay đổi trạng thái người dùng này ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc muốn thay đổi trạng thái người dùng không?
          <div className="">
            <Button
              onClick={() => setStatus("0")}
              value="1"
              variant="success"
              className="m-2 "
              disabled={status === "0"}
            >
              Hoạt động
            </Button>
            <Button
              onClick={() => {
                setStatus("1");
              }}
              variant=""
              className="m-2 font-semibold !bg-red-500 !text-white"
              disabled={status === "1"}
            >
              Vi phạm
            </Button>
            <div className="flex p-1">
              <div>Trạng thái đã chọn: </div>
              <div className="px-2 text-red-500 font-semibold">
                {status === "0"
                  ? "Hoạt động"
                  : status === "1"
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

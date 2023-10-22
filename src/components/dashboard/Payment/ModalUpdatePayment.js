import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { authApi, endpoints } from "../../../configs/Apis";
import updateIcon from "../../../assets/image/refresh.png";
import { toastError, toastSuccess } from "../../Toast";

export default function ModalUpdatePayment({
  paymentId,
  payment,
  loadPayments,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState(payment.name);
  const updatePayment = async (paymentId) => {
    const formData = new FormData();
    formData.append("name", name);
    if (!name) {
      toastError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    try {
      let res = await authApi().post(
        endpoints.update_payment(paymentId),
        formData
      );
      loadPayments();
      toastSuccess("Cập nhật thành công");
      handleClose();
    } catch (error) {
      toastError("Cập nhật thất bại");
      console.log(error);
    }
  };

  return (
    <>
      <Button className="w-24 ml-5 mr-5 !bg-button_color" onClick={handleShow}>
        <div className="flex">
          <img className="w-1/3" src={updateIcon} />
          <span className="pl-2 w-2/3 font-semibold">Sửa</span>
        </div>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật phương thức thanh toán</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên phương thức thanh toán</Form.Label>
              <Form.Control
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => updatePayment(paymentId)}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

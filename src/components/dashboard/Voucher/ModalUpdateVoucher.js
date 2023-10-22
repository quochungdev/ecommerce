import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { authApi, endpoints } from "../../../configs/Apis";
import updateIcon from "../../../assets/image/refresh.png";
import { toastError, toastSuccess } from "../../Toast";

export default function ModalUpdateVoucher({
  voucherId,
  voucher,
  loadVouchers,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState(voucher.name);
  const [code, setCode] = useState(voucher.code);
  const [value, setValue] = useState(voucher.value.toString());
  const [quantity, setQuantity] = useState(voucher.quantity.toString());
  const updatevoucher = async (voucherId) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("code", code);
    formData.append("quantity", quantity);
    formData.append("value", value);
    formData.append("isDeleted", "0");
    console.log(typeof quantity);
    if (!name || !quantity || !value || !code) {
      toastError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    try {
      let res = await authApi().post(
        endpoints.update_voucher(voucherId),
        formData
      );
      loadVouchers();
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
          <Modal.Title>Cập nhật voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên voucher</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số lượng</Form.Label>
              <Form.Control
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giá trị</Form.Label>
              <Form.Control
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => updatevoucher(voucherId)}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

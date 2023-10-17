import React, { useContext, useReducer, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import Apis, { authApi, endpoints } from "../../../configs/Apis";
import addIcon from "../../../assets/image/add.png";
import { toastError, toastSuccess } from "../../Toast";
import { ShopContext } from "./ShopContext";
export default function ModalActiveShop({shopId, loadShops}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [shops, setShops] = useContext(ShopContext);

  const handleActive = async (shopId) => {
    try {
      let res = await authApi().post(endpoints.active_shop(shopId));
      loadShops();
      // setShops((prev) =>
      //   prev.map((shop) => (shop.id == shopId ? (shop = res.data) : shop))
      // );
      toastSuccess("Kích hoạt thành công");
      handleClose();
    } catch (ex) {
      toastError("Kích hoạt thất bại");
      console.error(ex);
    }
  };
  return (
    <>
      <Button className="w-24 ml-5 mr-5 !bg-button_color" onClick={handleShow}>
        <div className="flex">
          <img className="w-1/3" src={addIcon} />
          <span className="pl-2 w-2/3 font-semibold">Active</span>
        </div>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kích hoạt shop này ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn kích hoạt shop này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleActive(shopId);
            }}
          >
            Kích hoạt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

import React, { useContext, useEffect, useReducer, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import addIcon from "../assets/image/add.png";
import { authApi, endpoints } from "../configs/Apis";
export default function ModalSelectAddress({ onAddressSelected }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userAddress, setUserAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const loadAddressUser = async () => {
    try {
      let res = await authApi().get(endpoints["user_address"]);
      setUserAddress(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  const handleAddressChange = (event) => {
    const selectedId = event.target.id;
    setSelectedAddress(selectedId);
  };
  const handleAddAddress = () => {
    if (selectedAddress) {
      const selectedAddressObject = userAddress.find(
        (address) => address.id.toString() === selectedAddress
      );
      if (selectedAddressObject) onAddressSelected(selectedAddressObject);
    }
    handleClose();
  };
  useEffect(() => {
    loadAddressUser();
  }, []);

  return (
    <>
      <Button
        className="w-56 h-12 mt-2"
        variant="dark"
        onClick={handleShow}
      >
        <div className="flex justify-around items-center">
          <img className="h-auto" src={addIcon} />
          <span className="font-semibold text-white">Chọn địa chỉ</span>
        </div>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chọn địa chỉ nhận hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {userAddress?.map((address) => (
              <div key={address.id} className="mb-3">
                <Form.Check
                  name="userAddressRadio"
                  type="radio"
                  id={address.id}
                  onChange={handleAddressChange}
                  label={`${address.address}, ${address.ward}, ${address.city}`}
                />
              </div>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button onClick={handleAddAddress} variant="dark">
            Chọn địa chỉ này
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

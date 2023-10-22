import { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export default function ConfirmModal({ show, onClose, onConfirm }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thông báo</Modal.Title>
      </Modal.Header>
      <Modal.Body>Bạn có chắc muốn tiếp tục?</Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={onClose}>
          Trở lại
        </Button>
        <Button variant="dark" onClick={onConfirm}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

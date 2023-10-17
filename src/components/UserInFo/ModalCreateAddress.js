import React, { useContext, useEffect, useReducer, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import addIcon from "../../assets/image/add.png";
import { authApi, endpoints } from "../../configs/Apis";
import { CategoryContext } from "../dashboard/Category/CategoryContext";
import { toastError, toastSuccess } from "../Toast";
import { getProvinces } from "../../configs/provinceAPI";
import { getDistrictsByProvince } from "../../configs/districtAPI";
import { MyUserContext } from "../../App";
export default function ModalCreateAddress() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [user] = useContext(MyUserContext);
  
  const [homeAddress, setHomeAddress] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState({});
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  useEffect(() => {
    getProvinces()
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
      });
  }, [selectedProvince]);
  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setSelectedProvince(selectedProvince);

    // Fetch district data based on the selected province
    getDistrictsByProvince(selectedProvince)
      .then((response) => {
        setDistricts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching districts:", error);
      });
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setSelectedDistrict(selectedDistrict);
  };

  const createAddress = async () => {
    const provinceName = provinces.find(
      (province) => province.code == selectedProvince
    )?.name;
    const districtName = districts.districts.find(
      (district) => district.code == selectedDistrict
    )?.name;
    
    const formData = new FormData();
    formData.append("address", homeAddress);
    formData.append("ward", districtName);
    formData.append("city", provinceName);
    formData.append("userId", user.id);
    if (!homeAddress || !districtName || !provinceName) {
      toastError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    try {
      let res = await authApi().post(endpoints["create_address"], formData);
      toastSuccess("Thêm thành công");
      handleClose();
    } catch (error) {
      toastError("Thêm thất bại");
      console.log(error);
    }
  };

  return (
    <>
      <Button className="w-56 h-12 ml-5 mr-5" variant="dark" onClick={handleShow}>
        <div className="flex justify-around items-center">
          <img className="h-auto" src={addIcon} />
          <span className="font-semibold text-white">Thêm địa chỉ mới</span>
        </div>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Địa chỉ mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ cụ thể</Form.Label>
              <Form.Control
                value={homeAddress}
                onChange={(e) => setHomeAddress(e.target.value)}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tỉnh/Thành phố</Form.Label>
              <Form.Control
                as="select"
                value={selectedProvince}
                onChange={handleProvinceChange}
              >
                <option value="">Chọn tỉnh/thành phố</option>
                {provinces.map((province) => (
                  <option key={province.code} value={province.code}>
                    {province.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quận/Huyện</Form.Label>
              <Form.Control
                as="select"
                value={selectedDistrict}
                onChange={handleDistrictChange}
              >
                <option value="">Chọn quận/huyện</option>
                {districts.districts !== undefined &&
                  districts.districts.map((district) => (
                    <option key={district.code} value={district.code}>
                      {district.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={createAddress}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

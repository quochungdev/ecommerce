import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { MyUserContext } from "../../../App";
import Apis, { authApi, endpoints } from "../../../configs/Apis";
import { toastError, toastSuccess } from "../../Toast";
import { getProvinces } from "../../../configs/provinceAPI";
import { getDistrictsByProvince } from "../../../configs/districtAPI";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../ConfirmModal";

export default function Step1({ currentStep, labelArray, updateStep }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

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
  }, []);

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

    const provinceName = provinces.find(
      (province) => province.code == selectedProvince
    )?.name;
    const districtName = districts.districts.find(
      (district) => district.code == selectedDistrict
    )?.name;
    setAddress(`${homeAddress}, ${districtName}, ${provinceName}`);
  };

  const [user] = useContext(MyUserContext);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [codeEmail, setCodeEmail] = useState("");
  const [image, setImage] = useState(null);

  const [showCode, setShowCode] = useState(false);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const verifyEmail = async () => {
    const formData = new FormData();
    formData.append("email", email);
    try {
      let res = await authApi().post(endpoints["verify_mail"], formData);
      res.data ? setShowCode(true) : setShowCode(false);
      toastSuccess("Chúng tôi sẽ gửi mã code xác thực qua email của bạn");
    } catch (error) {
      toastError("Kết nối máy chủ thất bại");
      console.log(error);
    }
  };

  const createShop = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", desc);
    formData.append("address", address);
    formData.append("email", email);
    formData.append("code_email", codeEmail);
    formData.append("imageUrl", image);
    formData.append("status", 0);
    formData.append("userId", user.id);
    if (!name || !image || !desc || !address) {
      toastError("Thêm thất bại");

      // Kiểm tra nếu name hoặc image không có giá trị, không gửi request
      return;
    }
    try {
      let res = await authApi().post(endpoints["create_shop"], formData);
      toastSuccess("Tạo thành công! Vui lòng chờ Admin duyệt");
      updateStep(currentStep + 1);
    } catch (error) {
      toastError("Tạo thất bại");
      console.log(error);
    }
  };
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Tên shop</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
      </Form.Group>
      <div className="flex w-full items-center">
        <Form.Group className="mb-3 w-full">
          <Form.Label>Địa chỉ email</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
        </Form.Group>
        <Button
          onClick={verifyEmail}
          variant="dark"
          className="w-1/5 h-3/4 mx-3"
        >
          Xác nhận
        </Button>
      </div>
      {showCode && (
        <div className="flex items-center">
          <Form.Label>Mã xác thực</Form.Label>

          <Form.Group className="mb-3 px-3">
            <Form.Control
              value={codeEmail}
              onChange={(e) => setCodeEmail(e.target.value)}
              type="text"
              autoFocus
            />
          </Form.Group>
        </div>
      )}
      <Form.Group className="mb-3">
        <Form.Label>Địa chỉ lấy hàng</Form.Label>
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
      <Form.Group className="mb-3">
        <Form.Label>Mô tả về shop</Form.Label>
        <Form.Control
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          type="text"
          autoFocus
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Hình ảnh</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageChange} // Gọi hàm khi chọn tệp
          placeholder="Chọn file"
        />
        {image && <img className="w-20" src={URL.createObjectURL(image)} />}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Người tạo</Form.Label>
        <Form.Control value={user.fullName} disabled type="text" autoFocus />
      </Form.Group>
      <Button
        variant="dark"
        className="primaryButton"
        onClick={() => navigate("/dang-ky-ban-hang")}
      >
        Trở lại
      </Button>
      <Button
        className="!bg-orange-500 !border-none !font-semibold"
        disabled={currentStep === labelArray.length}
        onClick={openModal}
      >
        Tiếp tục
      </Button>
      <ConfirmModal
        show={showModal}
        onClose={closeModal}
        onConfirm={() => {
          createShop();
          closeModal(); // Close the modal after confirmation
        }}
      />
    </Form>
  );
}

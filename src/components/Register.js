import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { authApi, endpoints } from "../configs/Apis";
import { toastError, toastSuccess } from "./Toast";
import { ToastContainer } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [codeEmail, setCodeEmail] = useState();
  const [fullName, setFullName] = useState();
  const [phone, setPhone] = useState();
  const [avatar, setAvatar] = useState(null); // Khởi tạo là null
  const [showCode, setShowCode] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingEmail, setIsAddingEmail] = useState(false);

  const handleAvatarChange = (e) => {
    const selectedFile = e.target.files[0]; // Lấy tệp được chọn
    setAvatar(selectedFile); // Lưu File object vào state
  };

  const verifyEmail = async () => {
    if (isAddingEmail) {
      return;
    }
    setIsAddingEmail(true); 
    const formData = new FormData();
    formData.append("email", email);
    try {
      let res = await authApi().post(endpoints["verify_mail"], formData);
      res.data ? setShowCode(true) : setShowCode(false);
      toastSuccess("Chúng tôi sẽ gửi mã code xác thực qua email của bạn");
      setIsAddingEmail(false); 
    } catch (error) {
      toastError("Kết nối máy chủ thất bại");
      setIsAddingEmail(false)
      console.log(error);
    }
  };

  const register = (evt) => {
    evt.preventDefault();

    if (!username || !password || !email || !codeEmail || !phone || !avatar) {
      toastError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (isAddingEmail) {
      return;
    }
    setIsAddingEmail(true); 

    const formData = new FormData();
    formData.append("full_Name", fullName);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("code_email", codeEmail);
    formData.append("phone", phone);
    formData.append("avatar", avatar);

    const process = async () => {
      try {
        let res = await authApi().post(endpoints["register"], formData);
        toastSuccess("Đăng ký thành công");
        setIsAdding(false)
        navigate("/dang-nhap");
      } catch (ex) {
        toastError("Đăng ký thất bại");
        setIsAdding(false)
        console.error(ex);
      }
    };
    process();
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-orange-600">
        <MDBContainer className="gradient-form ">
          <MDBRow>
            <MDBCol col="6" className="mb-5">
              <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                  <Image src="https://static.vecteezy.com/system/resources/previews/012/223/540/large_2x/shopee-element-symbol-shopee-food-shopee-icon-free-vector.jpg" />
                  <h4 class="mb-4">We are more than just a company</h4>
                  <p class="small mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </MDBCol>

            <MDBCol col="6" className="mb-5">
              <div className="d-flex flex-column ms-5 bg-white mt-20 p-10">
                <h4 className="mt-1 mb-5 pb-1 font-bold ">ĐĂNG KÝ</h4>
                <Form onSubmit={register} className="">
                  <Form.Group className="mb-4 ">
                    <Form.Control
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="!p-3"
                      placeholder="Họ và tên"
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng điền tên
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4 ">
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="!p-3"
                      placeholder="Tên đăng nhập"
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng điền tài khoản
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="!p-3"
                      placeholder="Mật khẩu"
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng điền mật khẩu
                    </Form.Control.Feedback>
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
                      className="w-1/2 h-auto mx-3"
                      disabled={isAddingEmail === true}
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
                  <Form.Group className="mb-4 ">
                    <Form.Control
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="!p-3"
                      placeholder="Số điện thoại"
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng điền tài khoản
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="file"
                      required
                      accept="image/*"
                      onChange={handleAvatarChange} // Gọi hàm khi chọn tệp
                      placeholder="Chọn file"
                    />
                    {avatar && (
                      <img
                        className="w-20"
                        src={URL.createObjectURL(avatar)}
                        alt="Avatar Preview"
                      />
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Button
                      className="w-full pt-2 pb-2 !text-2xl !font-semibold mt-3"
                      type="submit"
                      variant="danger"
                      disabled={isAdding === true}
                    >
                      ĐĂNG KÝ
                    </Button>
                  </Form.Group>
                </Form>
                <Row className="mb-5 mt-4">
                  <Col>
                    <Button
                      variant="white"
                      className="!flex justify-center align-middle border-2 border-black"
                    >
                      <img
                        className="w-1/6 mr-2"
                        src="https://cdn-icons-png.flaticon.com/512/4902/4902301.png?ga=GA1.1.483303112.1686631307"
                      />
                      <div className="font-bold">Facebook</div>
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="white"
                      className="!flex justify-center align-middle border-2 border-black"
                    >
                      <img
                        className="w-1/6 mr-2"
                        src="https://static-00.iconduck.com/assets.00/google-icon-512x512-tqc9el3r.png"
                      />
                      <div className="font-bold mt-1">Google</div>
                    </Button>
                  </Col>
                </Row>
                <div className="d-flex flex-row align-items-center justify-content-center">
                  <p className="mb-0 text-gray-400">Bạn đã có tài khoản?</p>
                  <Link
                    to="/dang-nhap"
                    className="text-orange-500 font-bold decoration-transparent ml-2"
                  >
                    Đăng nhập
                  </Link>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
};

export default Register;

import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useContext, useReducer, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MyUserContext } from "../App";
import Apis, { authApi, endpoints } from "../configs/Apis";
import cookie from "react-cookies";
import { toastError, toastSuccess } from "./Toast";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [user, dispatch] = useContext(MyUserContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const login = (evt) => {
    evt.preventDefault();
    const process = async () => {
      try {
        let res = await Apis.post(endpoints["signin"], {
          username: username,
          password: password,
        });
        cookie.save("token", res.data);
        console.info(res.data);

        let { data } = await authApi().get(endpoints["current-user"]);
        cookie.save("user", data);
        console.info(data);
        toastSuccess("Đăng nhập thành công");
        dispatch({
          type: "login",
          payload: data,
        });
        navigate("/home");
      } catch (ex) {
        toastError("Tài khoản hoặc mật khẩu không chính xác");
        console.error(ex);
      }
    };
    process();
  };

  // if(user != null){
  //   return <Navigate to="/" />
  // }

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
                <h4 className="mt-1 mb-5 pb-1 font-bold ">ĐĂNG NHẬP</h4>
                <Form onSubmit={login}>
                  <Form.Group className="mb-4 ">
                    <Form.Control
                      type="text"
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
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="!p-3"
                      placeholder="Mật khẩu"
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng điền mật khẩu
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Button
                      className="w-full pt-2 pb-2 !text-2xl !font-semibold mt-3"
                      type="submit"
                      variant="danger"
                    >
                      ĐĂNG NHẬP
                    </Button>
                  </Form.Group>
                  {/* <div className="">
                  <Link className="float-left decoration-transparent">Quên mật khẩu</Link>
                  <Link className="float-right decoration-transparent">Đăng nhập vào SMS</Link>
              </div> */}
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
                      <div className="font-bold mt-1">Facebook</div>
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
                  <p className="mb-0 text-gray-400">Bạn mới đến Magento?</p>
                  <Link
                    to="/dang-ky"
                    className="text-orange-500 font-bold decoration-transparent ml-2"
                  >
                    Đăng ký
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

export default Login;

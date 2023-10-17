import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit"
import { Button, Col, Form, Image, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

const Register = () => {
    return <>
    <div className="bg-orange-600">
    <MDBContainer className="gradient-form ">
    <MDBRow>

    <MDBCol col='6' className="mb-5">
        <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

          <div className="text-white px-3 py-4 p-md-5 mx-md-4">
            <Image src="https://static.vecteezy.com/system/resources/previews/012/223/540/large_2x/shopee-element-symbol-shopee-food-shopee-icon-free-vector.jpg" />
            <h4 class="mb-4">We are more than just a company</h4>
            <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

        </div>

      </MDBCol>

      <MDBCol col='6' className="mb-5">
        <div className="d-flex flex-column ms-5 bg-white mt-20 p-10">
            <h4 className="mt-1 mb-5 pb-1 font-bold ">ĐĂNG KÝ</h4>
          <Form className="">
          <Form.Group className="mb-4 ">
                <Form.Control type="text" 
                              required
                              className="!p-3"
                              placeholder="Họ và tên" />
              <Form.Control.Feedback type="invalid">
                Vui lòng điền tên
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4 ">
                <Form.Control type="text" 
                              required
                              className="!p-3"
                              placeholder="Tên đăng nhập" />
              <Form.Control.Feedback type="invalid">
                Vui lòng điền tài khoản
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Control type="password"  
                              required
                              className="!p-3"
                              placeholder="Mật khẩu" />
               <Form.Control.Feedback type="invalid">
                Vui lòng điền mật khẩu
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4 ">
                <Form.Control type="email" 
                              required
                              className="!p-3"
                              placeholder="Email" />
              <Form.Control.Feedback type="invalid">
                Vui lòng điền đúng định dạng email
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4 ">
                <Form.Control type="text" 
                              required
                              className="!p-3"
                              placeholder="Số điện thoại" />
              <Form.Control.Feedback type="invalid">
                Vui lòng điền tài khoản
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                    <Form.Control type="file" 
                                required
                                 accept="image/*"
                                 placeholder="Chọn ảnh đại diện" />
                </Form.Group>
            
            <Form.Group className="mb-3">
                <Button className="w-full pt-2 pb-2 !text-2xl !font-semibold mt-3" type="submit" variant="danger">ĐĂNG NHẬP</Button>
            </Form.Group>
            <div className="">
                <Link className="float-left decoration-transparent">Quên mật khẩu</Link>
                <Link className="float-right decoration-transparent">Đăng nhập vào SMS</Link>
            </div>
        </Form>
            <Row className="mb-5 mt-4">
                <Col>
                    <Button variant="white" className="!flex justify-center align-middle border-2 border-black">
                        <img className="w-1/6 mr-2" src="https://cdn-icons-png.flaticon.com/512/4902/4902301.png?ga=GA1.1.483303112.1686631307" />
                        <div className="font-bold">Facebook</div>
                    </Button>
                </Col>
                <Col>
                    <Button variant="white" className="!flex justify-center align-middle border-2 border-black">
                        <img className="w-1/6 mr-2" src="https://png2.cleanpng.com/sh/35f40191638118dc80daa688e738537e/L0KzQoG4UMA5N6NokZH9cnHxg8HokvVvfF5sh9HwbHWwg8bwlPUucZR0hp9wb3BqfLa0ifNwdl46fqlvOUi4c7TrVsBmO186TqoCNEm3RIK9UMIyQWg6UagDNEG1PsH1h5==/transparent-google-suite-icon-google-icon-5f7f985ccd60e3.5687494416021975968412.png" />
                        <div className="font-bold mt-1">Google</div>
                    </Button>
                </Col>
            </Row>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="mb-0 text-gray-400">Bạn mới đến shopee?</p>
            <Link className="text-orange-500 font-bold decoration-transparent ml-2">Đăng ký</Link>
          </div>

        </div>

      </MDBCol>

    </MDBRow>

  </MDBContainer>
    </div>
    </>
}

export default Register
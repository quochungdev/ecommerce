import React, { useContext, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ".././assets/CSS/Notification.css";
import notifiIcon from ".././assets/image/notification.png";
import cartIcon from ".././assets/image/shopping-cart.png";
import { Button, ButtonGroup, Image } from "react-bootstrap";
import { useCart } from "../reducers/CartContext";
import { Link } from "react-router-dom";
import { MyUserContext } from "../App";
import { MDBIcon } from "mdb-react-ui-kit";

function CartDropdown() {
  const { cart } = useCart();
  const [user] = useContext(MyUserContext);
  return (
    <Dropdown className="w-full h-full">
      <Dropdown.Toggle
        className="w-full h-full d-flex align-items-center "
        variant="none"
        id="dropdown-basic"
      >
        <MDBIcon size="2x" className="transition-all duration-200 hover:!bg-gray-300 rounded-md " fas icon="shopping-cart relative">
          <span
            className="text-notifi notification text-xs absolute top-0 
                        -right-3 z-20 text-white font-semibold border-1
                      border-red-600 rounded-full bg-red-600 w-4 "
          >
            {user ? cart.length : 0}
          </span>
        </MDBIcon>
      </Dropdown.Toggle>

      <Dropdown.Menu show={false}>
        {cart.length > 0 ? (
          cart.map((c) => (
            <Dropdown.Item key={c.id}>
              <div className=" flex w-96 justify-between items-center">
                <div className="">
                  <Image className="w-20" src={c.thumbnail} />
                </div>
                <div className=" font-semibold">
                {c.name && c.name.length >= 12
                            ? `${c.name.substring(0, 12)}...`
                            : `${c.name}`}
                </div>
                <div className="text-xl text-red-600 font-semibold mr-3">
                  ${c.price}
                </div>
              </div>
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item>
            <div>Không có sản phẩm nào</div>
          </Dropdown.Item>
        )}
        <Button variant="dark" className="ml-4 mt-3 ">
          <Link
            to={user ? "/cart" : "/dang-nhap"}
            className="decoration-transparent text-white font-semibold"
          >
            Xem Giỏ Hàng
          </Link>
        </Button>
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default CartDropdown;

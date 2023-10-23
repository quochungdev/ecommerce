import React, { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import NotificationDropdown from "./NotificationDropdown";
import searchIcon from "../../assets/image/search.png";
import { MyUserContext } from "../../App";
import { Link } from "react-router-dom";

export default function HeaderAdmin() {
  const [user] = useContext(MyUserContext);
  return (
    <div className="items-center w-full h-13 flex justify-between pl-5 pr-5">
      <div className=" relative m-2 text-button_color ">
        <h3>Quản trị viên</h3>
      </div>

      <div className="flex item-center">
        <div className="mx-5">
          <Link to="/home">
            <Button className="!bg-button_color hover:shadow-lg !font-semibold">
              Quay về trang chủ
            </Button>
          </Link>
        </div>
        {/* <div className="pr-4">
          <NotificationDropdown />
        </div> */}
        <div className="text-xl font-bold">{user.fullName}</div>
      </div>
    </div>
  );
}

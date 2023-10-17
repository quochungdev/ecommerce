import React from "react";
import { Button, Image } from "react-bootstrap";
import securityIcon from "../../assets/image/verified.png";
import keyIcon from "../../assets/image/padlock.png";
import { Link } from "react-router-dom";
export default function PasswordComp() {
  return (
    <div className="bg-white shadow-md h-auto max-w-2xl mx-auto mt-48">
      <div className="border flex justify-between items-center">
        <div className=" text-2xl p-5 flex flex-col justify-center items-center">
          <Image src={securityIcon} />
          <div>
            Để tăng cường bảo mật cho tài khoản của bạn, hãy xác minh thông tin
            bằng một trong những cách sau.
          </div>
          <Link to="/thong-tin-ca-nhan/verify">
            <Button className="border mt-5" variant="none">
              <div className="flex items-center justify-center p-2">
                <Image src={keyIcon} />
                <div className="px-4">Xác minh bằng Mật khẩu</div>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

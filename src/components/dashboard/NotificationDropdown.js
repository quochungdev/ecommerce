import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../../assets/CSS/Notification.css";
import notifiIcon from "../../assets/image/notification.png";
import { ButtonGroup } from "react-bootstrap";

function NotificationDropdown() {
  const [notifications, setNotifications] = useState([
    "Notification 1",
    "Notification 2",
    "Notification 3",
    "Notification 4",
    "Another notification",
  ]);

  return (
    <Dropdown>
      <Dropdown.Toggle
        className="d-flex align-items-center relative"
        variant="default"
        id="dropdown-basic"
      >
        <img className="w-2/4" src={notifiIcon} />
        <span
          className="text-notifi notification text-xs absolute top-1 
                        right-8 z-20 text-white font-semibold border-1
                      border-red-600 rounded-full bg-red-600 w-4 "
        >
          {notifications.length}
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu show={true}>
        {notifications.map((notification, index) => (
          <Dropdown.Item key={index}>{notification}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default NotificationDropdown;

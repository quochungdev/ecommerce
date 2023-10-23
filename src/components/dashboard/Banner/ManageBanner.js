import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { authApi, endpoints } from "../../../configs/Apis";
import searchIcon from "../../../assets/image/search.png";
import "../../../assets/CSS/Table.css";
import PaginationItems from "../../PaginationItems";
import ModalCreateBanner from "./ModalCreateBanner";
import ModalUpdateBanner from "./ModalUpdateBanner";
import ModalDeleteBanner from "./ModalDeleteBanner";

export default function ManageBanner({ searchKeyword, handleSearch }) {
  const [banners, setBanners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage; // Chỉ mục bắt đầu
  const endIndex = startIndex + itemsPerPage; // Chỉ mục kết thúc
  const loadBanners = async () => {
    try {
      let res = await authApi().get(endpoints.banners);
      setBanners(res.data);
      console.log(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    loadBanners();
  }, []);
  return (
    <>
      <ToastContainer />
      <div className=" h-full !mx-0">
        <div className="flex justify-between">
          <h2 className="">Banners</h2>
          <ModalCreateBanner loadBanners={loadBanners} />
        </div>
        <div className="p-2 mt-2 shadow-md rounded-md">
          <div className="relative m-1 w-2/4 ">
            <Form>
              <Form.Control
                type="text"
                value={searchKeyword}
                onChange={handleSearch}
                placeholder="Tìm kiếm người dùng..."
                className=" mr-sm-2 "
              />
              <button className="absolute right-0 top-1" type="submit">
                <img src={searchIcon} />
              </button>
            </Form>
          </div>
        </div>
        <div className=" mt-3">
          <Table className="table-custom shadow-md" striped hover size="sm">
            <thead className="">
              <tr className=" items-center ">
                <th className="!p-3">ID</th>
                <th className="!p-3">HÌNH ẢNH</th>
                <th className="!p-3">CHỨC NĂNG</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((u) => (
                <tr key={u.id}>
                  <td className="py-2 !pl-4">{u.id}</td>
                  <td className="py-2 !pl-4">
                    <img className=" w-20 zoomable-image" src={u.imageUrl} />
                  </td>
                  <td className="py-2 !pl-4">
                    <ModalUpdateBanner
                      bannerId={u.id}
                      loadBanners={loadBanners}
                      banner={u}
                    />
                    <ModalDeleteBanner
                      bannerId={u.id}
                      loadBanners={loadBanners}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="flex justify-center bg-white shadow-md border rounded-lg">
          <PaginationItems
            array={banners}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}

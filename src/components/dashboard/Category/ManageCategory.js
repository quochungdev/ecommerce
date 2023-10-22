import React, { createContext, useEffect, useReducer, useState } from "react";
import { Button, Pagination, Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "../../../assets/CSS/Table.css";
import searchIcon from "../../../assets/image/search.png";
import CategoryReducer, {
  ACTION_TYPE,
  CategoryContext,
} from "./CategoryContext";
import Apis, { endpoints } from "../../../configs/Apis";
import ModalCreateCategory from "./ModalCreateCategory";
import ModalDeleteCategory from "./ModalDeleteCategory";
import ModalUpdateCategory from "./ModalUpdateCategory";
import { ToastContainer } from "react-toastify";
import { toastSuccess } from "../../Toast";
import PaginationItems from "../../PaginationItems";

// export const CategoryReducers = createContext();

export default function ManageCategory({ searchKeyword, handleSearch }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage; // Chỉ mục bắt đầu
  const endIndex = startIndex + itemsPerPage; // Chỉ mục kết thúc

  const [categories, setCategories] = useState([]);
  const loadCategories = async () => {
    try {
      let res = await Apis.get(endpoints["categories"]);
      setCategories(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    loadCategories();
  }, []);

  const paginationItem = categories.slice(startIndex, endIndex);
  const filteredItems = paginationItem.filter((item) =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <CategoryContext.Provider value={[categories, setCategories]}>
      <ToastContainer />
      <div className=" h-full !mx-0">
        <div className="flex justify-between">
          <h2>Danh mục</h2>
          <ModalCreateCategory />
        </div>
        <div className="p-2 mt-2 shadow-md rounded-md">
          <div className="relative m-1 w-2/4 ">
            <Form>
              <Form.Control
                type="text"
                value={searchKeyword}
                onChange={handleSearch}
                placeholder="Tìm kiếm danh mục..."
                className=" mr-sm-2 "
              />
              <button className="absolute right-0 top-1" type="submit">
                <img src={searchIcon} />
              </button>
            </Form>
          </div>
        </div>
        <div className=" mt-5">
          <Table className="table-custom shadow-md" striped hover size="sm">
            <thead className="">
              <tr className=" items-center ">
                <th className="!p-3">ID</th>
                <th className="!p-3">TÊN DANH MỤC</th>
                <th className="!p-3">HÌNH ẢNH</th>
                <th className="!p-3">DANH MỤC GỐC</th>
                <th className="!p-3">CHỨC NĂNG</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((cate) => (
                <tr key={cate.id}>
                  <td className="py-2 !pl-4">{cate.id}</td>
                  <td className="py-2 !pl-4">{cate.name}</td>
                  <td className="py-2 !pl-4">
                    <img className=" w-12 zoomable-image" src={cate.imageUrl} />
                  </td>
                  <td className="py-2 !pl-4">
                    {cate.categoryId !== null
                      ? cate.categoryId.name
                      : "Không"}
                  </td>
                  <td className="py-2 !pl-4">
                    <ModalUpdateCategory categoryId={cate.id} category={cate} />
                    <ModalDeleteCategory categoryId={cate.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="flex justify-center bg-white shadow-md border rounded-lg">
            <PaginationItems
              array={categories}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </CategoryContext.Provider>
  );
}

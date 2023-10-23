import { Chart } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import React, { useEffect, useRef, useState } from "react";
import { BarChartMonth } from "./BarCharMonth";
import { authApi, endpoints } from "../../../configs/Apis";
import { Table } from "react-bootstrap";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { formatTime } from "../../../configs/formatTime";
import PaginationItems from "../../PaginationItems";
import { BarChartQuarter } from "./BarChartQuarter";
import '../../../assets/CSS/index.css'

export default function Overview() {
  const [stats, setStats] = useState([]);
  const [time, setTime] = useState("");
  const loadStats = async (m, y) => {
    try {
      let res = await authApi().post(endpoints.stats, {
        month: m + 1,
        year: y,
      });
      setStats(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    loadStats(time.$M, time.$y);
  }, [time.$y, time.$M]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage; // Chỉ mục bắt đầu
  const endIndex = startIndex + itemsPerPage; // Chỉ mục kết thúc
  const paginationItem = stats.slice(startIndex, endIndex);

  return (
    <>
      <div className="flex w-full">
        <BarChartMonth />
        <BarChartQuarter />
      </div>
      <div className="m-3 w-full rounded-xl p-3 bg-white shadow-md chart-container">
        <h4 className="text-center text-gray-400 font-bold">
          {`TỔNG DOANH THU SẢN PHẨM THEO THÁNG ${
            time ? `${time.$M + 1}/${time.$y}` : ""
          } `}
        </h4>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="my-3"
            value={time}
            onChange={(e) => setTime(e)}
            label={"Chọn tháng/năm"}
            views={["month", "year"]}
          />
        </LocalizationProvider>
        <Table className="table-custom shadow-md" striped hover size="sm">
          <thead className="">
            <tr className=" items-center ">
              <th className="!p-3">TÊN SẢN PHẨM</th>
              <th className="!p-3">DOANH THU</th>
              <th className="!p-3">THỜI GIAN</th>
            </tr>
          </thead>
          <tbody>
            {paginationItem.map((s, index) => (
              <tr key={index}>
                <td className="py-2 !pl-4">{s.name}</td>
                <td className="py-2 !pl-4">{`$${s.total}`}</td>
                <td className="py-2 !pl-4">{formatTime(s.date)}</td>
              </tr>
            ))}
          </tbody>
          <PaginationItems
            array={stats}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Table>
      </div>
    </>
  );
}

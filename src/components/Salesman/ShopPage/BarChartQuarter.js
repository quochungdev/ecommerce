import { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { Scatter } from "react-chartjs-2";
import { authApi, endpoints } from "../../../configs/Apis";
import { CategoryScale } from "chart.js";
import { Button } from "react-bootstrap";

Chart.register(CategoryScale);

export const BarChartQuarter = () => {
  const [stats, setStats] = useState([]);

  const loadStatsQuater = async () => {
    try {
      let res = await authApi().get(endpoints.stats_revenue_chart_quarter);
      setStats(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    loadStatsQuater();
  }, []);

  return (
    <div className="m-3 rounded-xl p-3 bg-white shadow-md chart-container w-1/2">
      <div className="">
        <div className="ml-3 font-semibold text-gray-500">
          Lọc doanh thu theo tháng gần nhất
        </div>

      </div>
      <h2 style={{ textAlign: "center" }}>Thống kê</h2>
      <Scatter
        data={{
          labels: stats.map((data) => `Quý ${data.odQuarter}`),
          datasets: [
            {
              type: "bar",
              label: "Doanh thu",
              data: stats.map((data) => data.total),
              yAxisID: "y-axis-right", // Trục y bên phải
              fill: false,
              borderColor: "#2a71d0",
              backgroundColor: "rgb(147,205,221)",
            },
          ],
        }}
        options={{
          responsive: true, // Bật tùy chọn responsive
          plugins: {
            title: {
              display: true,
              text: "Số lượng sản phẩm và Doanh thu",
            },
            legend: {
              display: true,
            },
          },
          scales: {
            y: [
              {
                id: "y-axis-left",
                type: "linear",
                position: "left", // Trục y bên trái
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Số lượng sản phẩm",
                },
              },
              {
                id: "y-axis-right",
                type: "linear",
                position: "right", // Trục y bên phải
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Doanh thu",
                },
              },
            ],
            x: {
              type: "category",
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
};

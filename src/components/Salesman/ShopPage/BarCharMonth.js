import { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { Scatter } from "react-chartjs-2";
import { authApi, endpoints } from "../../../configs/Apis";
import { CategoryScale } from "chart.js";
import { Button } from "react-bootstrap";

Chart.register(CategoryScale);

export const BarChartMonth = () => {
  const [stats, setStats] = useState([]);
  const [month, setMonth] = useState(3);

  const loadStatsMonths = async () => {
    const formData = new FormData();
    formData.append("limit", month);
    try {
      let res = await authApi().post(
        endpoints.stats_revenue_chart_month,
        formData
      );
      setStats(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    loadStatsMonths();
  }, [month]);
  const formattedStats = stats.map((data) => {
    const dateObject = new Date(data.date);
    const month = dateObject.getUTCMonth() + 1;
    const year = dateObject.getUTCFullYear();
    return `${month}/${year}`;
  });

  return (
    <div className="m-3 rounded-xl p-3 bg-white shadow-md chart-container w-1/2">
      <div className="">
        <div className="ml-3 font-semibold text-gray-500">
          Lọc doanh thu theo tháng gần nhất
        </div>
        <div className="mt-3">
          <Button
            className={`mx-2  !bg-button_color  ${
              month === 3 ? " !font-bold border-2 !border-black" : ""
            }`}
            onClick={() => setMonth(3)}
          >
            3 tháng
          </Button>
          <Button
            className={`mx-2  !bg-button_color  ${
              month === 6 ? " !font-bold border-2 !border-black" : ""
            }`}
            onClick={() => setMonth(6)}
          >
            6 tháng
          </Button>
          <Button
            className={`mx-2  !bg-button_color  ${
              month === 12 ? " !font-bold border-2 !border-black" : ""
            }`}
            onClick={() => setMonth(12)}
          >
            12 tháng
          </Button>
        </div>
      </div>
      <h3 className="mt-4" style={{ textAlign: "center" }}>Biểu đồ tổng doanh thu sản phẩm theo tháng</h3>
      <Scatter
        data={{
          labels: stats.map((data) => `Tháng ${data.odMonth}`),
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

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from "chart.js";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

interface TradeMessage {
  type: "trade";
  data: { t: number; p: number }[];
}

const StockChart: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Stock Price",
        data: [] as number[],
        borderColor: "#42A5F5",
        backgroundColor: "#90CAF9",
      },
    ],
  });

  const [selectedSymbol, setSelectedSymbol] = useState("META");

  const FINNHUB_API_KEY = "cvdtp6hr01qm9khn8ut0cvdtp6hr01qm9khn8utg";

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<TradeMessage>(
    `wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`,
    {
      onOpen: () => sendJsonMessage({ type: "subscribe", symbol: selectedSymbol }),
      onClose: () => sendJsonMessage({ type: "unsubscribe", symbol: selectedSymbol }),
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    if (lastJsonMessage?.type === "trade" && lastJsonMessage.data?.length > 0) {
      const trade = lastJsonMessage.data[0];
      setChartData((prevState) => {
        const newLabels = [...prevState.labels, new Date(trade.t).toLocaleTimeString()];
        const newData = [...prevState.datasets[0].data, trade.p];

        if (newLabels.length > 100) {
          newLabels.shift();
          newData.shift();
        }

        return {
          labels: newLabels,
          datasets: [
            {
              ...prevState.datasets[0],
              data: newData,
            },
          ],
        };
      });
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    sendJsonMessage({ type: "unsubscribe", symbol: selectedSymbol });
    sendJsonMessage({ type: "subscribe", symbol: selectedSymbol });

    setChartData({
      labels: [],
      datasets: [
        {
          label: "Stock Price",
          data: [],
          borderColor: "#42A5F5",
          backgroundColor: "#90CAF9",
        },
      ],
    });
  }, [selectedSymbol]);

  const handleSymbolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSymbol(event.target.value);
  };

  return (
    <div style={{ marginRight: "20px", width: "50%" }}>
      <h1>Dashboard</h1>
      <div>
        <label htmlFor="stock-select">Select Stock: </label>
        <select id="stock-select" value={selectedSymbol} onChange={handleSymbolChange}>
          <option value="GOOG">GOOG</option>
          <option value="AAPL">AAPL</option>
          <option value="MSFT">MSFT</option>
          <option value="AMZN">AMZN</option>
          <option value="TSLA">TSLA</option>
          <option value="META">META</option>
        </select>
      </div>
      <div style={{ width: "1000px", height: "400px" }}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                enabled: true,
                mode: 'nearest',
                intersect: true, 
                callbacks: {
                  label: (context) => {
                    const label = context.dataset.label || '';
                    const value = context.raw as number;
                    return `${label}: $${value.toFixed(2)}`;
                  }
                }
              }
            }
          }}
        />
      </div>
      <p>Connection Status: {ReadyState[readyState]}</p>
    </div>
  );
};

export default StockChart;
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import useWebSocket, { ReadyState } from "react-use-websocket";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

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

  const FINNHUB_API_KEY = "cvdtp6hr01qm9khn8ut0cvdtp6hr01qm9khn8utg";
  const SYMBOL = "GOOG";

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<TradeMessage>(
    `wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`,
    {
      onOpen: () => sendJsonMessage({ type: "subscribe", symbol: SYMBOL }),
      onClose: () => sendJsonMessage({ type: "unsubscribe", symbol: SYMBOL }),
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    if (lastJsonMessage?.type === "trade" && lastJsonMessage.data?.length > 0) {
      const trade = lastJsonMessage.data[0];
      setChartData((prevState) => {
        const newLabels = [...prevState.labels, new Date(trade.t).toLocaleTimeString()];
        const newData = [...prevState.datasets[0].data, trade.p];

        // Keep only the last 30 points
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

  return (
    <div>
      <h1>Stock Dashboard</h1>
      <div style={{ width: "800px", height: "400px" }}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
      <p>Connection Status: {ReadyState[readyState]}</p>
    </div>
  );
};

export default StockChart;

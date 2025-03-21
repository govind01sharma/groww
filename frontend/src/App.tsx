import React from "react";
import StockChart from "./components/StockChart";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-md-9 col-lg-10 p-4">
          <StockChart />
        </div>
      </div>
    </div>
  );
};

export default App;

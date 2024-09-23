import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import UserList from "./components/UserList";
import Login from "./components/login/Login";
import GridExample from "./components/grid/GridExample";
import NewGrid from "./components/new-grid/NewGrid";
import SparkLine from "./components/spark-line/SparkLine";
import ChartSample from "./components/chart/ChartSample";
import ImportExport from "./components/import-export/ImportExport";

function App() {
  const [activeTab, setActiveTab] = useState("tab1");

  const renderTabContent = () => {
    switch (activeTab) {
      case "tab1":
        return <Home />;
      case "tab2":
        return <UserList />;
      case "tab3":
        return <Login />;
      case "tab4":
        return <GridExample />;
      case "tab5":
        return <NewGrid />;
      case "tab6":
        return <SparkLine />;
      case "tab7":
        return <ChartSample />;
      case "tab8":
        return <ImportExport />;
      default:
        return <Home />;
    }
  };
  const tabs = ["tab1", "tab2", "tab3", "tab4", "tab5", "tab6", "tab7", "tab8"];

  return (
    <div className="app">
      <div className="tabs">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace("tab", "Tab ")}
          </div>
        ))}
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import UserList from "./components/UserList";
import Login from "./components/login/Login";
import GridExample from "./components/grid/GridExample";
import NewGrid from "./components/new-grid/NewGrid";

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
      default:
        return <Home />;
    }
  };
  return (
    <div className="app">
      <div className="tabs">
        <div
          className={`tab ${activeTab === "tab1" ? "active" : ""}`}
          onClick={() => setActiveTab("tab1")}
        >
          Tab 1
        </div>
        <div
          className={`tab ${activeTab === "tab2" ? "active" : ""}`}
          onClick={() => setActiveTab("tab2")}
        >
          Tab 2
        </div>
        <div
          className={`tab ${activeTab === "tab3" ? "active" : ""}`}
          onClick={() => setActiveTab("tab3")}
        >
          Tab 3
        </div>
        <div
          className={`tab ${activeTab === "tab4" ? "active" : ""}`}
          onClick={() => setActiveTab("tab4")}
        >
          Tab 4
        </div>
        <div
          className={`tab ${activeTab === "tab5" ? "active" : ""}`}
          onClick={() => setActiveTab("tab5")}
        >
          Tab 5
        </div>
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
}

export default App;

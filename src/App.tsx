import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import UserList from "./components/UserList";

function App() {
  const [activeTab, setActiveTab] = useState("tab1");

  const renderTabContent = () => {
    switch (activeTab) {
      case "tab1":
        return <Home />;
      case "tab2":
        return <UserList />;
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
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
}

export default App;
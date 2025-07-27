import React from "react";
import FormRenderer from "./components/FormRenderer";
import "./index.css";

const App = () => {
  return (
    <div className="form-container">
      <h2>Dynamic User Form</h2>
      <FormRenderer />
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";

import "./Tab.css";

const Tab = (props) => {
  const handleClick = () => {
    props.setActiveTab(props.id);
  };

  if (props.color === "purple") {
    return (
      <li onClick={handleClick} className={props.activeTab === props.id ? "active" : ""}>
        {props.id}
      </li>
    );
  } else {
    return (
      <li onClick={handleClick} className={props.activeTab === props.id ? "active" : ""}>
        {props.id}
      </li>
    );
  }
};

export default Tab;

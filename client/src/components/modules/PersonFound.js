import React, { useState } from "react";
import "./PersonFound.css";

const PersonFound = (props) => {
  /**
   * @property {String} name
   * @property {Number} friendId

   */

  return <div className="PersonFound-container">{props.name}</div>;
};

export default PersonFound;

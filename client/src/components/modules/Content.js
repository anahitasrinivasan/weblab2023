import React, { useState, useEffect } from "react";

import Graph from "./Graph";

const Content = (props) => {
  if (props.activeTab === props.id && props.visible === "true" && props.id !== "entries") {
    return (
      <div>
        <div>
          <Graph
            entries={props.graphItems}
            type={props.type}
            graphBgColor={props.graphBgColor}
            graphLineColor={props.graphLineColor}
            max={props.max}
          />
        </div>
        <div>{props.items}</div>
      </div>
    );
  }
  else if (props.activeTab === props.id && props.visible === "true" && props.id === "entries") {
    return (
      <div>
        <div>{props.items}</div>
      </div>
    );
  }
  else if (props.activeTab === props.id && props.visible === "false") {
    return (
      <div className="Profile-container">this user has chosen to make this section private!</div>
    )
  }
  else {
    return (
      <></>
    )
  }
};

export default Content;

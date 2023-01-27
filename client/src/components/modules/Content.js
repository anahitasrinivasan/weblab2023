import React, { useState, useEffect } from "react";

import Graph from "./Graph";

const Content = (props) => {
  return props.activeTab === props.id ? (
    <div>
      <div>
        <Graph
          entries={props.graphItems}
          type={props.type}
          graphBgColor={props.graphBgColor}
          graphLineColor={props.graphLineColor}
        />
      </div>
      <div>{props.items}</div>
    </div>
  ) : (
    <></>
  );
};

export default Content;

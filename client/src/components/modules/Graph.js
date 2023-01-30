import React, { useState, useEffect } from "react";

import { get } from "../../utilities";

import Chart from "chart.js/auto";
import { Scatter } from "react-chartjs-2";

// two props: entries, which is all the journal entries with all the content
// also has type, which signals if this is a mood, sleep, or hydration graph
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const Graph = (props) => {
  const hasEntries = props.entries.length !== 0;

  let entriesList = null;

  if (hasEntries) {
    if (props.type === "mood") {
      entriesList = props.entries.map((entry) => {
        const date = new Date(entry.datePosted);
        // console.log(date.getTime());
        return { x: date.getTime(), y: entry.mood };
      });
    } else if (props.type === "sleep") {
      entriesList = props.entries.map((entry) => {
        const date = new Date(entry.datePosted);
        // console.log(date.getTime());
        return { x: date.getTime(), y: entry.sleep };
      });
    } else if (props.type === "hydration") {
      entriesList = props.entries.map((entry) => {
        const date = new Date(entry.datePosted);
        // console.log(date.getTime());
        return { x: date.getTime(), y: entry.water };
      });
    } else {
      return <div></div>;
    }
  }

  const data = {
    datasets: [
      {
        label: props.type,
        // data: entriesList,
        data: entriesList,
        fill: true,
        backgroundColor: props.graphBgColor,

        borderColor: props.graphLineColor,
        showLine: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "journal entry number",
        },
      },
      y: {
        min: 0,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: props.type,
        },
      },
    },
  };

  return (
    <div>
      <Scatter data={data} options={options} />
    </div>
  );
};

export default Graph;

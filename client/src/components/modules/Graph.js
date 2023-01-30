import React, { useState, useEffect } from "react";

import { get } from "../../utilities";

import { Scatter, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// two props: entries, which is all the journal entries with all the content
// also has type, which signals if this is a mood, sleep, or hydration graph

const Graph = (props) => {
  const hasEntries = props.entries.length !== 0;

  let entriesList = null;

  if (hasEntries) {
    if (props.type === "mood") {
      entriesList = props.entries.map((entry) => {
        const date = new Date(entry.datePosted);
        // console.log(date.getTime());
        return { x: date, y: entry.mood };
      });
    } else if (props.type === "sleep") {
      entriesList = props.entries.map((entry) => {
        const date = new Date(entry.datePosted);
        // console.log(date.getTime());
        return { x: date, y: entry.sleep };
      });
    } else if (props.type === "hydration") {
      entriesList = props.entries.map((entry) => {
        const date = new Date(entry.datePosted);
        // console.log(date.getTime());
        return { x: date, y: entry.water };
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
        // showLine: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        // time: {
        //   unit: "day",
        // },
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
      <Line data={data} options={options} />
    </div>
  );
};

export default Graph;

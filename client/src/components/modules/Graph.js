import React, { useState, useEffect } from "react";

import { get } from "../../utilities";

import Chart from "chart.js/auto";
import {Line} from "react-chartjs-2";

// two props: entries, which is all the journal entries with all the content
// also has type, which signals if this is a mood, sleep, or hydration graph
const Graph = (props) => {  
    const hasEntries = props.entries.length !== 0;

    let entriesList = null;
    if(hasEntries) {
        if(props.type === "mood") {
            entriesList = props.entries.map((entry) => (
                entry.mood
            ));
            entriesList = entriesList.reverse();
        }
        else if(props.type === "sleep") {
            entriesList = props.entries.map((entry) => (
                entry.sleep
            ));
            entriesList = entriesList.reverse();
        }
        else if(props.type === "hydration") {
            entriesList = props.entries.map((entry) => (
                entry.water
            ));
            entriesList = entriesList.reverse();
        }
        else {
            return (
                <div></div>
            );
        }
    }

    const data = {
        labels: Array.from({length: props.entries.length}, (_, i) => i + 1),
        datasets: [
          {
            label: props.type,
            data: entriesList,
            fill: true,
            backgroundColor: "rgba(136, 96, 208, 0.2)",
            borderColor: "rgba(136, 96, 208, 1)"
          }
        ],
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: "journal entry number"
                }
            },
            y: {
                min: 0,
                ticks: {
                    stepSize: 1
                },
                title: {
                    display: true,
                    text: props.type
                }
            }
        }
    };

    return (
        <div>
            <Line data={data} options={options}/>
        </div>
    );
}

export default Graph;
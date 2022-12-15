import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import palette from "google-palette";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default function PieChart() {

    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});

    const [dates, setDates] = useState({
        start: 0,
        end: 0
    })

    var crimeType = [];
    var crimeCount = [];

    
    /*
    var colors = [];
    for(let i = 0 ;i < 84; i++){
        colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
    }
    */

    var paletteColors = palette('tol-sq', 84);
    for(let color in paletteColors){
        paletteColors[color] = "#" + paletteColors[color]
    }

    useEffect(() => {

        var reqUrl = 'http://localhost:80/api/chart/crime'
        if (dates.start !== 0 && dates.end !== 0) {
            reqUrl = 'http://localhost:80//api/chart/crime/' + dates.start + '/' + dates.end
        }
        axios.get(reqUrl)
            .then((res) => {
                console.log(res);
                for (const dataObj of res.data) {
                    crimeType.push((dataObj.type_code));
                    crimeCount.push((dataObj.count));
                }

                setChartData({
                    label: "Crime Type Code",
                    labels: crimeType,
                    datasets: [
                        {
                            label: "Crime counts for Crime type Codes",
                            data: crimeCount,
                            borderColor: "rgb(53, 162, 235)",
                            backgroundColor: paletteColors,
                        },
                    ],
                });
                setChartOptions({
                    aspectRatio: 1,
                    responsive: false,
                    plugins: {
                        legend: {
                            position: "top",
                        },
                        title: {
                            display: true
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                text: 'Crime Count',
                                display: true
                            }
                        }
                    },
                });
            })
            .catch(err => {
                console.log(err);
            });

    }, [dates]);

    return (
        <div>
            <button onClick={() => setDates({
                start: document.getElementById("start").value,
                end: document.getElementById("end").value
            })}>Update</button>
            <Pie data={chartData} options={chartOptions} width={50} height={20} />
        </div>
    );
}
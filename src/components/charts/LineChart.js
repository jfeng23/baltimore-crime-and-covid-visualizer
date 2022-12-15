import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

export default function LineChart() {
    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});

    const [dates, setDates] = useState({
        start: 0,
        end: 0
    })

    var covidDates = []
    var covidCases = [];

    useEffect(() => {
        var reqUrl = 'http://localhost:80/api/chart/covid_cases'
        if (dates.start !== 0 && dates.end !== 0) {
            reqUrl = 'http://localhost:80//api/chart/covid_cases/' + dates.start + '/' + dates.end
        }
        axios.get(reqUrl)
            .then((res) => {
                console.log(res);

                covidDates = Object.keys(res.data)
                covidCases = Object.values(res.data)

                setChartData({
                    labels: covidDates,
                    datasets: [
                        {
                            label: "Average Covid Cases per Month",
                            data: covidCases,
                            borderColor: "#000000",
                            backgroundColor: "#00b4d8",
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
                                text: 'Covid Cases',
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

    console.log(dates)

    return (
        <div>
            <button onClick={() => setDates({
                start: document.getElementById("start").value,
                end: document.getElementById("end").value
            })}>Update</button>
            <Line data={chartData} options={chartOptions} width={100} height={30} />
        </div>
    );
};
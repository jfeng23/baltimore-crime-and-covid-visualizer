import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";


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

export default function CrimeSpecific() {

    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});

    const [dates, setDates] = useState({
        start: 0,
        end: 0
    })

    var crimeDates = [];
    var crimeCount = [];

    /*
    var colors = [];
    for(let i = 0 ;i < 84; i++){
        colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
    }
    */

    useEffect(() => {

        var reqUrl = 'http://localhost:80/api/chart/crime/5A'
        if (dates.start !== 0 && dates.end !== 0) {
            reqUrl = 'http://localhost:80//api/chart/crime/5A' + dates.start + '/' + dates.end
        }
        axios.get(reqUrl)
            .then((res) => {
                console.log(res);

                crimeDates = Object.keys(res.data)
                crimeCount = Object.values(res.data)

                setChartData({
                    label: "Crime Type Code",
                    labels: crimeDates,
                    datasets: [
                        {
                            label: "Crime counts for Crime type Codes",
                            data: crimeCount,
                            borderColor: "rgb(53, 162, 235)",
                            backgroundColor: "rgb(164, 90, 82)",
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
            <Bar data={chartData} options={chartOptions} width={100} height={40} />
        </div>
    );
}
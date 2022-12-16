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

export default function CrimeCodeAll() {

    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});

    const [dates, setDates] = useState({
        start: '',
        end: ''
    })

    var crimeType = [];
    var crimeCount = [];

    useEffect(() => {

        var reqUrl = 'http://localhost:80/api/chart/crime'
        if (dates.start !== '' && dates.end !== '') {
            reqUrl = 'http://localhost:80/api/chart/crime/' + dates.start + '/' + dates.end
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
                            backgroundColor: "rgb(126, 0, 0)",
                        },
                    ],
                });
                setChartOptions({
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Crime Code',
                                font: {
                                    size: 20
                                }
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Crime Count',
                                font: {
                                    size: 20
                                }
                            },
                            beginAtZero: true,

                        }
                    },
                    aspectRatio: 1,
                    responsive: false,
                    plugins: {
                        legend: {
                            position: "top",
                        },
                        title: {
                            display: true
                        },

                    },
                });
            })
            .catch(err => {
                console.log(err);
            });

    }, [dates]);

    return (
        <div>
            {dates.start === '' && <h2>Sum of Crime Counts by Crime Code</h2>}
            {dates.start !== '' && <h2>Sum of Crime Counts by Crime Code ({dates.start} to {dates.end})</h2>}
            <button onClick={() => setDates({
                start: document.getElementById("start").value,
                end: document.getElementById("end").value
            })}>Update</button>
            <Bar data={chartData} options={chartOptions} width={100} height={40} />
        </div>
    );
}
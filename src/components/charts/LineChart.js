import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

// imports chart modules
// !important cant run without it
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

    // react usestate variables to keep date
    // react will re-render if date(state) of these variables changes
    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});
    const [dates, setDates] = useState({
        start: '',
        end: ''
    })

    // variables to keep covid dates and covid case count from api call
    var covidDates = []
    var covidCases = [];

    // useeffect will re-render if dates use state variable changes
    useEffect(() => {
        // request url for axios(changes depending on if date filter is specified)
        var reqUrl = 'http://localhost:80/api/chart/covid_cases'
        if (dates.start !== '' && dates.end !== '') {
            reqUrl = 'http://localhost:80/api/chart/covid_cases/' + dates.start + '/' + dates.end
        }
        // axios gets the data from backend
        axios.get(reqUrl)
            .then((res) => {

                // populate lists for use with charts
                covidDates = Object.keys(res.data)
                covidCases = Object.values(res.data)

                // set chart data to data pulled from DB
                // specify labels/options/colors for chart
                setChartData({
                    labels: covidDates,
                    datasets: [
                        {
                            label: "Average New Covid Cases per Month",
                            data: covidCases,
                            borderColor: "#000000",
                            backgroundColor: "#00b4d8",
                        },
                    ],
                });

                // extra options for charts(legend, scales, and plugins)
                setChartOptions({
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Dates (Monthly)',
                                font: {
                                    family: "verdana",
                                    size: 20
                                }
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Avg Covid Cases',
                                font: {
                                    family: "verdana",
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
                            labels: {
                                font: {
                                    family: "verdana",
                                    size: 20
                                }
                            }
                        },
                        title: {
                            display: true
                        },

                    }
                });
            })
            // catch any error from axios
            .catch(err => {
                console.log(err);
            });
    }, [dates]);

    return (
        // takes care of dynamic titles / update button / rendering chart
        <div>
            {(dates.start === '' || dates.end === '') && <h2 style={{ fontFamily: "verdana" }}>
                Average New Covid Cases by Month</h2>}
            {(dates.start !== '' && dates.end !== '') && <h2 style={{ fontFamily: "verdana" }}>
                Average New Covid Cases by Month from ({dates.start} to {dates.end})</h2>}

            <button style={{ fontFamily: "verdana"}} onClick={() => setDates({
                start: document.getElementById("start").value,
                end: document.getElementById("end").value
            })}>Update</button>

            <Line data={chartData} options={chartOptions} width={100} height={30} />
        </div>
    );
};
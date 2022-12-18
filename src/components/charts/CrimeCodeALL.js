import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

// imports chart modules
// !important cant run without it
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

    // variables to keep crime type and count from api call
    var crimeType = [];
    var crimeCount = [];

    // useeffect will re-render if dates use state variable changes
    useEffect(() => {
        // request url for axios(changes depending on if date filter is specified)
        var reqUrl = 'http://localhost:80/api/chart/crime'
        if (dates.start !== '' && dates.end !== '') {
            reqUrl = 'http://localhost:80/api/chart/crime/' + dates.start + '/' + dates.end
        }
        // axios gets the data from backend
        axios.get(reqUrl)
            .then((res) => {

                // populate lists for use with charts
                for (const dataObj of res.data) {
                    crimeType.push((dataObj.type_code));
                    crimeCount.push((dataObj.count));
                }
                
                // set chart data to data pulled from DB
                // specify labels/options/colors for chart
                setChartData({
                    label: "Crime Type Code",
                    labels: crimeType,
                    datasets: [
                        {
                            label: "Crime Counts for Crime Type Codes",
                            data: crimeCount,
                            borderColor: "rgb(53, 162, 235)",
                            backgroundColor: "rgb(126, 0, 0)",
                        },
                    ],
                });

                // extra options for charts(legend, scales, and plugins)
                setChartOptions({
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Crime Codes',
                                font: {
                                    family: "verdana",
                                    size: 20
                                }
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Crime Count',
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

                    },
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
                Sum of Crime Counts by Crime Code</h2>}
            {(dates.start !== '' && dates.end !== '') && <h2 style={{ fontFamily: "verdana" }}>
                Sum of Crime Counts by Crime Code ({dates.start} to {dates.end})</h2>}

            <button style={{ fontFamily: "verdana"}} onClick={() => setDates({
                start: document.getElementById("start").value,
                end: document.getElementById("end").value
            })}>Update</button>
            
            <Bar data={chartData} options={chartOptions} width={100} height={40} />
        </div>
    );
}
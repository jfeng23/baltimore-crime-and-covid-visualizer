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

export default function CrimeSpecific() {

    // react usestate variables to keep date
    // react will re-render if date(state) of these variables changes
    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});

    const [dates, setDates] = useState({
        start: '',
        end: '',
        crime_code: '4E'
    })

    // dictionary for crime codes for easy lookup
    var crimeCodes = {
        "4E": "Common Assault",
        "6C": "Larceny",
        "1A": "Homicide",
        "5D": "Burglary",
        "2A": "Rape",
        "7A": "Auto Theft",
        "9S": "Shooting",
        "4C": "Aggrevated Assault",
        "6D": "Auto Larceny",
        "3AJF": "Car Jacking"
    }

    // variables to store date of crime and count
    var crimeDates = [];
    var crimeCount = [];
    
    // useeffect will re-render if dates use state variable changes
    useEffect(() => {

        // request url for axios(changes depending on if date filter is specified)
        var reqUrl = 'http://localhost:80/api/chart/crime/' + dates.crime_code
        if (dates.start !== '' && dates.end !== '') {
            reqUrl = 'http://localhost:80/api/chart/crime/' + dates.crime_code + '/' + dates.start + '/' + dates.end
        }
        // axios gets the data from backend
        axios.get(reqUrl)
            .then((res) => {

                // populate lists for use with charts
                crimeDates = Object.keys(res.data)
                crimeCount = Object.values(res.data)

                // set chart data to data pulled from DB
                // specify labels/options/colors for chart
                setChartData({
                    label: "Crime Type Code",
                    labels: crimeDates,
                    datasets: [
                        {
                            label: "Crime Counts for [" + crimeCodes[dates.crime_code] + "] Per month",
                            data: crimeCount,
                            borderColor: "rgb(53, 162, 235)",
                            backgroundColor: "rgb(164, 90, 82)",
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
        // select button for crime type filter
        <div>
            {(dates.start === '' || dates.end === '') && <h2 style={{ fontFamily: "verdana" }}>
                Crime Code: {dates.crime_code} - {crimeCodes[dates.crime_code]} Count by Month</h2>}
            {(dates.start !== '' && dates.end !== '') && <h2 style={{ fontFamily: "verdana" }}>
                Crime Code: {dates.crime_code} - {crimeCodes[dates.crime_code]}  Count by Month ({dates.start} to {dates.end})</h2>}

            <label style={{ fontFamily: "verdana"}} for="crime_code_selection">Choose a Crime Type: </label>
            <select style={{ fontFamily: "verdana"}} name="crime_code_selection" id="crime_code_selection">
                <option value="4E">Common Assault</option>
                <option value="6C">Larceny</option>
                <option value="1A">Homicide</option>
                <option value="5D">Burglary</option>
                <option value="2A">Rape</option>
                <option value="7A">Auto Theft</option>
                <option value="9S">Shooting</option>
                <option value="4C">Aggrevated Assault</option>
                <option value="6D">Auto Larceny</option>
                <option value="3AJF">Car Jacking</option>
            </select>

            <button style={{ fontFamily: "verdana"}} onClick={() => setDates({
                start: document.getElementById("start").value,
                end: document.getElementById("end").value,
                crime_code: document.getElementById("crime_code_selection").value
            })}>Update</button>

            <Bar data={chartData} options={chartOptions} width={100} height={40} />
        </div>
    );
}
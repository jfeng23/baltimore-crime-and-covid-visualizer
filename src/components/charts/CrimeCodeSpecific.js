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
        start: '',
        end: '',
        crime_code: '5A'
    })

    var crimeCodes = {
        "5A": "Common Assault",
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

    var crimeDates = [];
    var crimeCount = [];

    useEffect(() => {
        var reqUrl = 'http://localhost:80/api/chart/crime/' + dates.crime_code
        console.log(reqUrl)
        if (dates.start !== '' && dates.end !== '') {
            reqUrl = 'http://localhost:80/api/chart/crime/' + dates.crime_code + '/' + dates.start + '/' + dates.end
        }
        axios.get(reqUrl)
            .then((res) => {
                console.log(res);

                crimeDates = Object.keys(res.data)
                crimeCount = Object.values(res.data)

                console.log(crimeCodes[dates.crime_code])

                setChartData({
                    label: "Crime Type Code",
                    labels: crimeDates,
                    datasets: [
                        {
                            label: "Crime counts for " + crimeCodes[dates.crime_code] + " Per month",
                            data: crimeCount,
                            borderColor: "rgb(53, 162, 235)",
                            backgroundColor: "rgb(164, 90, 82)",
                        },
                    ],
                });
                setChartOptions({
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Dates',
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
            {dates.start === '' && <h2>Crime Code: {dates.crime_code} - {crimeCodes[dates.crime_code]} Count by Month</h2>}
            {dates.start !== '' && <h2>crime: {crimeCodes[dates.crime_code]} Count by Month ({dates.start} to {dates.end})</h2>}

            <label for="crime_code_selection">Choose a Crime Type: </label>
            <select name="crime_code_selection" id="crime_code_selection">
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
            <button onClick={() => setDates({
                start: document.getElementById("start").value,
                end: document.getElementById("end").value,
                crime_code: document.getElementById("crime_code_selection").value
            })}>Update</button>
            <Bar data={chartData} options={chartOptions} width={100} height={40} />
        </div>
    );
}
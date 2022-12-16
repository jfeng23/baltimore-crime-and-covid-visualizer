import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import palette from "google-palette";

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

export default function PieChart() {

    // react usestate variables to keep date
    // react will re-render if date(state) of these variables changes
    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});

    const [dates, setDates] = useState({
        start: 0,
        end: 0
    })

    // variables to keep crime type and crime count from api call
    var crimeType = [];
    var crimeCount = [];

    // randomly generating colors(not used at the moment)
    /*
    var colors = [];
    for(let i = 0 ;i < 84; i++){
        colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
    }
    */

    // for color palette
    var paletteColors = palette('tol-sq', 84);
    for(let color in paletteColors){
        paletteColors[color] = "#" + paletteColors[color]
    }

    // useeffect will re-render if dates use state variable changes
    useEffect(() => {

        // request url for axios(changes depending on if date filter is specified)
        var reqUrl = 'http://localhost:80/api/chart/crime'
        if (dates.start !== '' && dates.end !== '') {
            reqUrl = 'http://localhost:80//api/chart/crime/' + dates.start + '/' + dates.end
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
                            label: "Crime counts for Crime type Codes",
                            data: crimeCount,
                            borderColor: "rgb(53, 162, 235)",
                            backgroundColor: paletteColors,
                        },
                    ],
                });
                // extra options for charts(legend, scales, and plugins)
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
        // takes care of dynamic titles / update button / rendering chart
        <div>
            {dates.start === '' && <h2 style={{ fontFamily: "verdana" }}>
                Pie Chart of All Crime Codes</h2>}
            {dates.start !== '' && <h2 style={{ fontFamily: "verdana" }}>
                Pie Chart of All Crime Codes from ({dates.start} to {dates.end})</h2>}

            <button onClick={() => setDates({
                start: document.getElementById("start").value,
                end: document.getElementById("end").value
            })}>Update</button>
            
            <Pie data={chartData} options={chartOptions} width={50} height={20} />
        </div>
    );
}
import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

const Charts = () => {

	const CrimePieChartData = {
		labels: ["6D-Larceny", "7A-Autotheft", "3AJF-Robbery Car Jacking", "4E-Common Assult", "2A-Rape", "4C-AGG. Assult"],
		datasets: [{
			label: "# of Crimes According to Crime Code",
			data: [35, 25, 22, 20, 18, 15],
			backgroundColor: [
			  "#007D9C",
			  "#244D70",
			  "#D123B3",
			  "#F7E018",
			  "#fff",
			  "#FE452A",
			],
			borderColor: [
			  "rgba(255,99,132,1)",
			  "rgba(54, 162, 235, 1)",
			  "rgba(255, 206, 86, 1)",
			  "rgba(75, 192, 192, 1)",
			  "rgba(153, 102, 255, 1)",
			  "rgba(255, 159, 64, 1)",
			],
			borderWidth: 1,
		  },
		],
	}

	const LineChartData = {
		labels: ["Jan/21", "Feb/21", "Mar/21", "Apr/21", "May/21", "Jun/21"],
		datasets: [{
		  label: '# of Covid Cases',
		  data: [650, 590, 800, 810, 560, 550, 400],
		  fill: false,
		  borderColor: 'rgb(75, 192, 192)',
		  tension: 0.1
		}]
	  };

	  const BarChartData = {
		labels: ["0 ALBEMARLE ST", "0 CHERRY HILL RD", "0 COMMERCE ST", "100 KANE ST", "100 LIGHT ST", "100 MARKET PL", "100 MCMECHEN ST"],
		datasets: [{
			label: 'Crimes by Location',
			data: [650, 590, 800, 810, 560, 550, 400],
			// can have individual brackground colors
			// can have individual border colors
			backgroundColor: ['gray'],
			borderWidth: 1
		}]
	};

	return (
	<div style={{ width: 650, textAlign: "center" }}>
		<h2 style={{ fontFamily: "verdana" }}>
			Crime Code Pie Chart
      	</h2>
		<Pie data={CrimePieChartData} width={50} height={50} />

		<h2 style={{ fontFamily: "verdana" }}>
			Covid Cases Over Time
      	</h2>
		<Line data={LineChartData} width={50} height={50} />

		<h2 style={{ fontFamily: "verdana" }}>
			Crimes By Location
      	</h2>
		<Bar data={BarChartData} width={50} height={50} />
	</div>

	
	);
};

export default Charts;

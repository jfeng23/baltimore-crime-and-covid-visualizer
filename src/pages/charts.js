import React from "react";
import LineChart from "../components/charts/LineChart";
import CrimeCodeAll from "../components/charts/CrimeCodeALL";
import Selector from "../components/ChartSelector";
import CrimeSpecific from "../components/charts/CrimeCodeSpecific";

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

// main charts function that calls other charts
export default function Charts() {

	// styling choices
	const currentViewStyle = {
		fontSize: "1.8em",
		fontFamily: "Verdana",
		display: "block",
		padding: "10px",
		textAlign: "center",
		color: "white",
		background: "#a3a3c2"
	}

	const row = {
		display: 'flex',
		flexWrap: 'wrap'
	};

	const selectorFlex = {
		flex: '25%',
	};

	const bodyFlex = {
		flex: '75%'
	};

	return (
		// takes care of calling the different chart functions
		// in seperate files
		<div>
			<div style={row}>
				<div style={selectorFlex}>
					<Selector></Selector>
				</div>
				<div style={bodyFlex}>
					<div id="currentView" style={currentViewStyle}></div>
					<div>
						<LineChart />
						<CrimeCodeAll />
						<CrimeSpecific />
					</div>
				</div>

			</div>
		</div>

	);
};



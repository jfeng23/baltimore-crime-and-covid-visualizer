import React from "react";
import LineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";
import CrimeCodeAll from "../components/charts/CrimeCodeALL";
import Selector from "../components/ChartSelector";
import CrimeSpecific from "../components/charts/CrimeCodeSpecific";

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

export default function Charts() {
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
		<div>
			<div style={row}>

				<div style={selectorFlex}>
					<Selector>
						
					</Selector>
					
				</div>

				<div style={bodyFlex}>
					<div id="currentView" style={currentViewStyle}></div>
					<div>
						<h2>
							Average Covid Cases by Month
						</h2>
						<LineChart />

						<h2>
							Crime Code ALL
						</h2>
						<CrimeCodeAll />

						<h2>
							Crime Code Specific
						</h2>
						<CrimeSpecific />


					</div>
				</div>

			</div>
		</div>

	);
};



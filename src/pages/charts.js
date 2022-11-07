import React, { useEffect } from "react";
import Selector from "../components/Selector";

const Charts = () => {

    const mapStyles = {
    	overflow: "hidden",
    	height: "100vh"
	};

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
					<Selector></Selector>
				</div>


				<div style={bodyFlex}>
					<div id="map" style={mapStyles}></div>
				</div>

			</div>
		</div>
	);
};

export default Charts;

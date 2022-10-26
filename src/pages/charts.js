import React, { useEffect } from "react";
import Selector from "../components/Selector";

const Charts = () => {

    const mapStyles = {
    	overflow: "hidden",
    	height: "100vh",
		margin: 10,
		border: "3px solid #0909FF",
		borderRadius: 10
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
					<div style={mapStyles}></div>
				</div>


			</div>
		</div>
	);
};

export default Charts;

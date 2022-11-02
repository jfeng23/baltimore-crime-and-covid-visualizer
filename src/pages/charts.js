import React, { useEffect } from "react";
import Selector from "../components/Selector";

const Charts = () => {

    const mapStyles = {
    	overflow: "hidden",
<<<<<<< Updated upstream
    	height: "100vh",
		margin: 10,
		border: "3px solid #8989FF",
		borderRadius: 10
=======
    	height: "100vh"
>>>>>>> Stashed changes
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

				<div style={bodyFlex}>
					<div style={mapStyles}></div>
				</div>


			</div>
		</div>
	);
};

export default Charts;

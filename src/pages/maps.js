import React, { useEffect } from "react";
import Selector from "../components/Selector";
import L from "leaflet"

const Maps = () => {

	const MAP_TILE = L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});

  	const mapStyles = {
    	overflow: "hidden",
    	height: "100vh",
<<<<<<< Updated upstream
		margin: 15,
=======
		margin: 10,
		border: "3px solid #0909FF",
		borderRadius: 10
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

	const mapParams = {
		center: [39.268236, -76.609383],
		zoom: 12.4,
		zoomControl: false,
		maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
		layers: [MAP_TILE]
	};

	useEffect(() => {
		const map = L.map("map", mapParams);
	}, []);

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

export default Maps;
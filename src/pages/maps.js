import React, { useEffect } from "react";
import L from "leaflet"

const Maps = () => {

	const MAP_TILE = L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});

  	const mapStyles = {
    	overflow: "hidden",
    	width: "100%",
    	height: "100vh"
	};

	const mapParams = {
		center: [37.0902, -95.7129],
		zoom: 3,
		zoomControl: false,
		maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
		layers: [MAP_TILE]
	};

	useEffect(() => {
		const map = L.map("map", mapParams);
	}, []);

	return (
		<>

			<div id="map" style={mapStyles}></div>

		</>
	);
};

export default Maps;
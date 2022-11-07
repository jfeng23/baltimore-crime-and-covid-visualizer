import React, { useEffect } from "react";
import axios from "axios";
import Selector from "../components/Selector";
import L from "leaflet";
import HeatmapOverlay from 'leaflet-heatmap';

const Maps = () => {

	const MAP_TILE = L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});

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

	// -------------------------------------------------------------------//

	// here, we can choose to grab all of the data, or only what we want to show
	// right now, it is going to grab all the data on the /maps branch
	// so in the 'mapData' would (hopefully) be a dictionary of lats, lngs, and counts

	// After that, you could then change the 'data' variable in 'testData' (below this)
	// to mapData

	const [mapData, setData] = React.useState(null);

	React.useEffect(() => {
		axios.get("http://localhost:3000/maps")
		.then((response) => {
			setData(response.data);
		});
	}, []);
	// -------------------------------------------------------------------//

	// don't forget to include leaflet-heatmap.js
	var testData = {
		max: 8,
		data: [{lat: 39.284242, lng:-76.691404, count: 30}, {lat: 39.239970, lng:-76.679450, count: 22}, {lat: 39.32, lng: -76.7, count: 50}]
	};
	
	var cfg = {
		// radius should be small ONLY if scaleRadius is true (or small radius is intended)
		// if scaleRadius is false it will be the constant radius used in pixels
		"radius": .03,
		"maxOpacity": 0.5,
		// scales the radius based on map zoom
		"scaleRadius": true,
		// if set to false the heatmap uses the global maximum for colorization
		// if activated: uses the data maximum within the current map boundaries
		//   (there will always be a red spot with useLocalExtremas true)
		"useLocalExtrema": true,
		// which field name in your data represents the latitude - default "lat"
		latField: 'lat',
		// which field name in your data represents the longitude - default "lng"
		lngField: 'lng',
		// which field name in your data represents the data value - default "value"
		valueField: 'count'
	};
	
  	var heatmapLayer = new HeatmapOverlay(cfg);
	
	const mapParams = {
		center: [39.268236, -76.609383],
		zoom: 12.4,
		zoomControl: false,
		maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
		layers: [MAP_TILE, heatmapLayer]
	};

	useEffect(() => {
		const map = L.map("map", mapParams);
		heatmapLayer.setData(testData);
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
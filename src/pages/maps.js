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

	const defParams = {
		center: [39.268236, -76.609383],
		zoom: 12.4,
		zoomControl: false,
		maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
		layers: [MAP_TILE]
	};
	var map;

	function makeReq(reqURL)
	{
		var defData;
		axios.get(reqURL)
		.then((response) => {
			defData = response.data;
			
			var testData = {
				max: 10000,
				data: defData
			};
			
			var cfg = {
				// radius should be small ONLY if scaleRadius is true (or small radius is intended)
				// if scaleRadius is false it will be the constant radius used in pixels
				"radius": .04,
				"maxOpacity": 0.5,
				// scales the radius based on map zoom
				"scaleRadius": true,
				// if set to false the heatmap uses the global maximum for colorization
				// if activated: uses the data maximum within the current map boundaries
				//   (there will always be a red spot with useLocalExtremas true)
				"useLocalExtrema": true,
				latField: 'lat',
				lngField: 'lng',
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
	
			if (map !== undefined) { map.remove(); }

			map = L.map("map", mapParams);
			heatmapLayer.setData(testData);

			console.log(testData);

		});
	}

	window.onload = function defaultDataFunc() 
	{
		map = L.map("map", defParams)
		makeReq("http://localhost:80/api/map/covid_cases");
	}

	function dataWithDate()
	{
		var startDate = document.getElementById("start").value;
		var endDate = document.getElementById("end").value;
		
		makeReq("http://localhost:80/api/map/covid_cases/" + startDate + "/" + endDate);
	}

	return (
		<div>
			<div style={row}>
				
				<div style={selectorFlex}>
					<Selector></Selector>
				</div>

				<div style={bodyFlex}>
					<div id="map" style={mapStyles}></div>
				</div>

				<button onClick={dataWithDate}>Tempo Button</button>

			</div>
		</div>
	);
};

export default Maps;